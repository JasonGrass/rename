import { markRaw } from "vue"

import InsertConfiguration from "./InsertConfiguration.vue"
import _ from "lodash"

import RenameHandlerBase from "@/lib/handler/RenameHandlerBase"

interface IInsertHandlerOptions {
  to: string
}

class Handler extends RenameHandlerBase<IInsertHandlerOptions> implements IRenameHandler {
  public title: string = "新增/插入字符"
  public component: Component = markRaw(InsertConfiguration)

  doRename(ctx: IRenameContext, options: IInsertHandlerOptions) {
    const newName = ctx.name.concat(options.to)

    console.log("insert", ctx.name, options.to, newName)

    ctx.name = newName
  }
}

export default new Handler()
