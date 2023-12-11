import { markRaw } from "vue"

import ReplaceConfiguration from "./ReplaceConfiguration.vue"
import _ from "lodash"

import RenameHandlerBase from "@/lib/handler/RenameHandlerBase"

interface IReplaceHandlerOptions {
  from: string
  to: string
}

class Handler extends RenameHandlerBase<IReplaceHandlerOptions> implements IRenameHandler {
  public title: string = "删除/替换字符"
  public component: Component = markRaw(ReplaceConfiguration)

  doRename(ctx: IRenameContext, options: IReplaceHandlerOptions) {
    const newName = ctx.name.replaceAll(options.from, options.to)
    ctx.name = newName
  }
}

export default new Handler()
