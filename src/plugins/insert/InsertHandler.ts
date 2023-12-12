import { markRaw } from "vue"

import InsertConfiguration from "./InsertConfiguration.vue"
import _ from "lodash"

import RenameHandlerBase from "@/lib/handler/RenameHandlerBase"

interface IInsertHandlerOptions {
  position: "begin" | "end" | "afterIndexN" | "beforeIndexN" | "afterStr" | "beforeStr"
  n: number
  from: string
  toType: "text" | "index"
  toStr: string
  toPreStr: string
  toAfterStr: string
  toBaseNumber: number
  toNumberType: "digit" | "lowerChinese" | "upperChinese" | "lowerChar" | "upperChar"
  toDigitPadding: number
}

class Handler extends RenameHandlerBase<IInsertHandlerOptions> implements IRenameHandler {
  public title: string = "新增/插入字符"
  public component: Component = markRaw(InsertConfiguration)
  public sortHint = 2

  doRename(ctx: IRenameContext, options: IInsertHandlerOptions) {
    let filename = this.getFileName(ctx)

    options.n = options.n ?? 0
    options.toBaseNumber = options.toBaseNumber ?? 1
    options.toDigitPadding = options.toDigitPadding ?? 1

    switch (options.position) {
      case "begin":
        filename = insertBegin(filename, options)
        break
      case "end":
        filename = insertEnd(filename, options)
        break
      case "afterIndexN":
        filename = insertAfterIndexN(filename, options)
        break
      case "beforeIndexN":
        filename = insertBeforeIndexN(filename, options)
        break
      case "afterStr":
        filename = insertAfterStr(filename, options)
        break
      case "beforeStr":
        filename = insertBeforeStr(filename, options)
        break
    }

    this.setFileName(ctx, filename)
  }
}

export default new Handler()

function insertBegin(filename: string, options: IInsertHandlerOptions) {
  return buildInsertContent(options) + filename
}

function insertEnd(filename: string, options: IInsertHandlerOptions) {
  return filename + buildInsertContent(options)
}

function insertAfterIndexN(filename: string, options: IInsertHandlerOptions) {
  const left = filename.slice(0, options.n)
  const right = filename.slice(options.n)
  return left + buildInsertContent(options) + right
}

function insertBeforeIndexN(filename: string, options: IInsertHandlerOptions) {
  if (options.n < 1) {
    return filename + buildInsertContent(options)
  }
  const left = filename.slice(0, -options.n)
  const right = filename.slice(-options.n)
  return left + buildInsertContent(options) + right
}

function insertAfterStr(filename: string, options: IInsertHandlerOptions) {
  if (!options.from) {
    return filename
  }

  const index = filename.indexOf(options.from)
  if (index < 0) {
    return filename
  }

  const left = filename.slice(0, index + options.from.length)
  const right = filename.slice(index + options.from.length)
  return left + buildInsertContent(options) + right
}

function insertBeforeStr(filename: string, options: IInsertHandlerOptions) {
  if (!options.from) {
    return filename
  }

  const index = filename.indexOf(options.from)
  if (index < 0) {
    return filename
  }

  const left = filename.slice(0, index)
  const right = filename.slice(index)
  return left + buildInsertContent(options) + right
}

function buildInsertContent(options: IInsertHandlerOptions) {
  let content = ""
  switch (options.toType) {
    case "text":
      content = options.toStr
      break
    case "index":
      content = options.toPreStr + buildNumberIndex(options) + options.toAfterStr
      break
  }
  return content
}

function buildNumberIndex(options: IInsertHandlerOptions) {
  return "0"

  // let numberIndex = ""
  // switch (options.toNumberType) {
  //   case "digit":
  //     numberIndex = _.padStart(options.toBaseNumber.toString(), options.toDigitPadding, "0")
  //     break
  //   case "lowerChinese":
  //     numberIndex = options.toBaseNumber
  //     break
  //   case "upperChinese":
  //     numberIndex = options.toBaseNumber
  //     break
  //   case "lowerChar":
  //     numberIndex = options.toBaseNumber
  //     break
  //   case "upperChar":
  //     numberIndex = options.toBaseNumber
  //     break
  // }
  // return numberIndex
}
