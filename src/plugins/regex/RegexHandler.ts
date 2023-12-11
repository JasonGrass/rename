import { markRaw } from "vue"
import RegexConfiguration from "./RegexConfiguration.vue"

import RenameHandlerBase from "@/lib/handler/RenameHandlerBase"

interface IRegexHandlerOptions {
  pattern: string
  to: string
}

class Handler extends RenameHandlerBase<IRegexHandlerOptions> implements IRenameHandler {
  public title: string = "正则替换"
  public component: Component = markRaw(RegexConfiguration)
  public sortHint = 3

  protected doRename(ctx: IRenameContext, options: IRegexHandlerOptions) {
    if (!options.pattern) {
      return
    }
    let pattern = options.pattern.replace(/^\/|\/\w*$/g, "") // 删除正则表达式字面量的斜杠和标志
    let flags = options.pattern.match(/\/(\w*)$/)
    if (!flags) {
      return
    }
    let flag = flags[1] // 提取标志
    let regex = new RegExp(pattern, flag)

    let fileName = this.getFileName(ctx).replace(regex, options.to)
    this.setFileName(ctx, fileName)
  }
}

export default new Handler()
