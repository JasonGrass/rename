import { markRaw } from "vue"

import ReplaceConfiguration from "./ReplaceConfiguration.vue"
import _ from "lodash"

interface IReplaceHandlerOptions {
  from: string
  to: string
}

class Handler implements IRenameHandler {
  private _options: IReplaceHandlerOptions | null = null

  public title: string = "删除/替换字符"
  public active: boolean = false
  public enable: boolean = false
  public component: Component = markRaw(ReplaceConfiguration)

  public rename(ctx: IRenameContext, options?: IReplaceHandlerOptions) {
    if (options) {
      this._options = options
    }

    if (!this._options) {
      return
    }

    this.doRename(ctx, this._options)
  }

  public setOptions(options: IReplaceHandlerOptions) {
    this._options = options
  }

  private doRename(ctx: IRenameContext, options: IReplaceHandlerOptions) {
    const newName = ctx.name.replaceAll(options.from, options.to)
    ctx.name = newName
  }
}

export default new Handler()
