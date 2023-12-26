import _ from "lodash"

import RenameHandlerBase from "@/lib/handler/RenameHandlerBase"
import { importPluginComponent } from "../component"

interface IReplaceHandlerOptions {
  position:
    | "string"
    | "frontN"
    | "behindN"
    | "nCharAfterIndexM"
    | "nCharBeforeIndexM"
    | "allAfterStr"
    | "allBeforeStr"
    | "nAfterStr"
    | "nBeforeStr"
  m: number
  n: number
  from: string
  to: string
}

class Handler extends RenameHandlerBase<IReplaceHandlerOptions> implements IRenameHandler {
  public title: string = "删除/替换字符"
  public component: Component = importPluginComponent("./replace/ReplaceConfiguration.vue")
  public sortHint = 1

  doRename(ctx: IRenameContext, options: IReplaceHandlerOptions) {
    let filename = this.getFileName(ctx)

    options.n = options.n ?? 0
    options.m = options.m ?? 0

    switch (options.position) {
      case "string":
        filename = replace(filename, options)
        break
      case "frontN":
        filename = replaceFrontN(filename, options)
        break
      case "behindN":
        filename = replaceBehindN(filename, options)
        break
      case "nCharAfterIndexM":
        filename = replaceNCharAfterIndexM(filename, options)
        break
      case "nCharBeforeIndexM":
        filename = replaceNCharBeforeIndexM(filename, options)
        break
      case "allAfterStr":
        filename = replaceAllAfterStr(filename, options)
        break
      case "allBeforeStr":
        filename = replaceAllBeforeStr(filename, options)
        break
      case "nAfterStr":
        filename = replaceNAfterStr(filename, options)
        break
      case "nBeforeStr":
        filename = replaceNBeforeStr(filename, options)
        break
    }

    this.setFileName(ctx, filename)
  }
}

export default new Handler()

function replace(filename: string, options: IReplaceHandlerOptions) {
  const newName = filename.replaceAll(options.from, options.to)
  return newName
}

function replaceFrontN(filename: string, options: IReplaceHandlerOptions) {
  const left = filename.slice(options.n)
  return options.to + left
}

function replaceBehindN(filename: string, options: IReplaceHandlerOptions) {
  if (options.n < 1) {
    return filename + options.to
  }

  const left = filename.slice(0, -options.n)
  return left + options.to
}

function replaceNCharAfterIndexM(filename: string, options: IReplaceHandlerOptions) {
  const left = filename.slice(0, options.m)
  const right = filename.slice(options.m + options.n)
  return left + options.to + right
}

function replaceNCharBeforeIndexM(filename: string, options: IReplaceHandlerOptions) {
  if (options.m < 1 && options.n < 1) {
    return filename + options.to
  }

  if (options.m < 1) {
    const left = filename.slice(0, -options.n)
    return left + options.to
  }

  const left = filename.slice(0, -options.m - options.n)
  const right = filename.slice(-options.m)
  return left + options.to + right
}

function replaceAllAfterStr(filename: string, options: IReplaceHandlerOptions) {
  const index = filename.indexOf(options.from)
  if (index < 0) {
    return filename
  }

  const left = filename.slice(0, index + options.from.length)
  return left + options.to
}

function replaceAllBeforeStr(filename: string, options: IReplaceHandlerOptions) {
  const index = filename.lastIndexOf(options.from)
  if (index < 0) {
    return filename
  }

  const right = filename.slice(index)
  return options.to + right
}

function replaceNAfterStr(filename: string, options: IReplaceHandlerOptions) {
  const index = filename.indexOf(options.from)
  if (index < 0) {
    return filename
  }

  const left = filename.slice(0, index + options.from.length)
  const right = filename.slice(index + options.from.length + options.n)
  return left + options.to + right
}

function replaceNBeforeStr(filename: string, options: IReplaceHandlerOptions) {
  const index = filename.lastIndexOf(options.from)
  if (index < 0) {
    return filename
  }

  let left = filename.slice(0, index - options.n)
  if (index < options.n) {
    left = ""
  }

  const right = filename.slice(index)
  return left + options.to + right
}
