import { markRaw } from "vue"
import { v4 as uuidv4 } from "uuid"
import * as dayjs from "dayjs"

import RenameHandlerBase from "@/lib/handler/RenameHandlerBase"
import NewConfiguration from "./NewConfiguration.vue"

interface INewHandlerOptions {
  pattern: string
}

interface IVariableReplace {
  replace(ctx: IRenameContext, input: string): string
}

class NameReplace implements IVariableReplace {
  replace(ctx: IRenameContext, input: string): string {
    const result = input.matchAll(/<name(:lower)?(:upper)?>/g)
    for (const match of result) {
      let name = ctx.name
      // 是否转换成小写
      const isLower = match[1] ? match[1] === ":lower" : false
      if (isLower) {
        name = name.toLowerCase()
      }

      // 是否转换成大写
      const isUpper = match[2] ? match[2] === ":upper" : false
      if (isUpper) {
        name = name.toUpperCase()
      }

      input = input.replace(match[0], name)
    }
    return input
  }
}

class ExtReplace implements IVariableReplace {
  replace(ctx: IRenameContext, input: string): string {
    const result = input.matchAll(/<ext(:lower)?(:upper)?>/g)
    for (const match of result) {
      let ext = ctx.extension
      // 是否转换成小写
      const isLower = match[1] ? match[1] === ":lower" : false
      if (isLower) {
        ext = ext.toLowerCase()
      }

      // 是否转换成大写
      const isUpper = match[2] ? match[2] === ":upper" : false
      if (isUpper) {
        ext = ext.toUpperCase()
      }

      input = input.replace(match[0], ext)
    }
    return input
  }
}

class IndexNumberReplace implements IVariableReplace {
  replace(ctx: IRenameContext, input: string): string {
    const result = input.matchAll(/<#+(:\-?\d+)?>/g)
    for (const match of result) {
      const length = match[0].match(/#+/)?.[0].length ?? 0 // 序号有多少位
      const base = match[1] ? parseInt(match[1].slice(1)) : 1 // 序号的基数
      const number = ctx.file.index + base
      const numberStr =
        number >= 0
          ? number.toString().padStart(length, "0")
          : "-" + (-number).toString().padStart(length - 1, "0")
      input = input.replace(match[0], numberStr)
    }
    return input
  }
}

class UuidReplace implements IVariableReplace {
  replace(_: IRenameContext, input: string): string {
    const result = input.matchAll(/<uuid(:\d+)?(:upper)?>/g)
    for (const match of result) {
      // 计算 UUID 取值
      let uuid = uuidv4().replace(/-/g, "")
      const length = match[1] ? parseInt(match[1].slice(1)) : 32
      uuid = uuid.substring(0, length)

      // 是否转换成大写
      const isUpper = match[2] ? match[2] === ":upper" : false
      if (isUpper) {
        uuid = uuid.toUpperCase()
      }

      input = input.replace(match[0], uuid)
    }

    return input
  }
}

class DateReplace implements IVariableReplace {
  replace(ctx: IRenameContext, input: string): string {
    const result = input.matchAll(/<date(\.now)?(\.modify)?(:\w+)?>/g)
    for (const match of result) {
      let date = dayjs()
      const isModify = match[2] ? match[2] === ".modify" : false
      if (isModify) {
        date = dayjs(ctx.file.modifyTime)
      }
      const format = match[3] ? match[3].slice(1) : "YYYY-MM-DD"
      input = input.replace(match[0], date.format(format))
    }
    return input
  }
}

class TimeReplace implements IVariableReplace {
  replace(ctx: IRenameContext, input: string): string {
    const result = input.matchAll(/<time(\.now)?(\.modify)?(:\w+)?>/g)
    for (const match of result) {
      let date = dayjs()
      const isModify = match[2] ? match[2] === ".modify" : false
      if (isModify) {
        date = dayjs(ctx.file.modifyTime)
      }
      const format = match[3] ? match[3].slice(1) : "HH-mm-ss"
      input = input.replace(match[0], date.format(format))
    }
    return input
  }
}

class Handler extends RenameHandlerBase<INewHandlerOptions> implements IRenameHandler {
  public title: string = "全新命名"
  public component: Component = markRaw(NewConfiguration)
  public sortHint = 4

  private _replaceWorker: IVariableReplace[] = [
    new NameReplace(),
    new ExtReplace(),
    new IndexNumberReplace(),
    new UuidReplace(),
    new DateReplace(),
    new TimeReplace()
  ]

  protected doRename(ctx: IRenameContext, options: INewHandlerOptions) {
    if (!options.pattern) {
      return
    }

    let fileName = options.pattern
    for (const worker of this._replaceWorker) {
      fileName = worker.replace(ctx, fileName)
    }

    this.setFileName(ctx, fileName)
  }
}

export default new Handler()
