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
  public sortHint = 100

  protected doRename(ctx: IRenameContext, options: IRegexHandlerOptions) {
    if (!options.pattern) {
      return
    }

    const regex = buildRegExp(options.pattern)
    if (regex == null) {
      return
    }

    let fileName = this.getFileName(ctx).replace(regex, options.to)
    this.setFileName(ctx, fileName)
  }
}

export default new Handler()

function buildRegExp(input: string) {
  // 如果是正则表达式字面量，/pattern/flag 这种格式的字符串
  if (input.match(/^\/.*\/(\w*)$/g)) {
    let pattern = input.replace(/^\/|\/\w*$/g, "") // 删除正则表达式字面量的斜杠和标志
    let flags = input.match(/\/(\w*)$/)
    if (!flags) {
      return null
    }
    let flag = flags[1] // 提取标志
    return new RegExp(pattern, flag)
  }
  // 如果是普通字符串，则直接识别为 pattern
  else {
    return new RegExp(input)
  }
}
