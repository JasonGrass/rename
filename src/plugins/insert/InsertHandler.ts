import _ from "lodash"

import RenameHandlerBase from "@/lib/handler/RenameHandlerBase"
import { importPluginComponent } from "../component"

import xNumber from "./xNumber.js"

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
  index: number
}

class Handler extends RenameHandlerBase<IInsertHandlerOptions> implements IRenameHandler {
  public title: string = "新增/插入字符"
  public component: Component = importPluginComponent("./insert/InsertConfiguration.vue")
  public sortHint = 2

  doRename(ctx: IRenameContext, options: IInsertHandlerOptions) {
    let filename = this.getFileName(ctx)

    options.n = options.n ?? 0
    options.toBaseNumber = options.toBaseNumber ?? 1
    options.toDigitPadding = options.toDigitPadding ?? 1
    options.toPreStr = options.toPreStr ?? ""
    options.toAfterStr = options.toAfterStr ?? ""
    options.index = ctx.file.index

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
  const index = options.index + options.toBaseNumber
  let indexStr = ""
  switch (options.toNumberType) {
    case "digit":
      indexStr = _.padStart(index.toString(), options.toDigitPadding, "0")
      break
    case "lowerChinese":
      indexStr = number2chinese1(index)
      break
    case "upperChinese":
      indexStr = number2chinese2(index)
      break
    case "lowerChar":
      indexStr = number2EnglishChar1(index)
      break
    case "upperChar":
      indexStr = number2EnglishChar2(index)
      break
  }
  return indexStr
}

function number2chinese1(index: number) {
  const n = xNumber.numberAri2Chn(Math.abs(index))
  if (index >= 0) {
    return n
  }
  return "负" + n
}

function number2chinese2(index: number) {
  const n = xNumber.numberChnToBig(xNumber.numberAri2Chn(Math.abs(index)))
  if (index >= 0) {
    return n
  }
  return "負" + n
}

function number2EnglishChar1(num: number) {
  let str = number2EnglishChar2(num)
  return str.toLowerCase()
}

function number2EnglishChar2(num: number) {
  if (num < 0) {
    return ""
  }

  let str = ""
  while (num > 0) {
    let remainder = (num - 1) % 26
    str = String.fromCharCode(65 + remainder) + str
    num = Math.floor((num - 1) / 26)
  }

  return str
}
