import { markRaw } from "vue"

import InsertConfiguration from "./InsertConfiguration.vue"
import _ from "lodash"

interface IInsertHandlerOptions {
  to: string
}

class Handler implements IRenameHandler {
  private _options: IInsertHandlerOptions | null = null

  public title: string = "新增/插入字符"
  public active: boolean = false
  public enable: boolean = false
  public component: Component = markRaw(InsertConfiguration)

  public rename(ctx: IRenameContext, options?: IInsertHandlerOptions) {
    if (options) {
      this._options = options
    }

    if (!this._options) {
      return
    }

    this.doRename(ctx, this._options)
  }

  public setOptions(options: IInsertHandlerOptions) {
    this._options = options
  }

  private doRename(ctx: IRenameContext, options: IInsertHandlerOptions) {
    const newName = ctx.name.concat(options.to)

    console.log("insert", ctx.name, options.to, newName)

    ctx.name = newName
  }
}

export default new Handler()
