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
    const newName = ctx.name.concat(options.toStr)
    ctx.name = newName
  }
}

export default new Handler()
