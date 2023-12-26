import RenameHandlerBase from "@/lib/handler/RenameHandlerBase"
import { importPluginComponent } from "../component"

interface IPadHandlerOptions {
  /**
   * 对第几组数字进行处理
   */
  serial: number

  /**
   * 目标长度
   */
  length: number

  /**
   * 填充的字符
   */
  padString: string
}

class Handler extends RenameHandlerBase<IPadHandlerOptions> implements IRenameHandler {
  public title: string = "序号补齐"
  public component: Component = importPluginComponent("pad-number", "PadConfiguration")

  public sortHint = 3

  protected doRename(ctx: IRenameContext, options: IPadHandlerOptions) {
    let fileName = this.getFileName(ctx)
    let result = fileName.matchAll(/(\d+)/g)
    const list = Array.from(result)
    if (list.length < 1) {
      return // 文件名中没有任何数字
    }

    if (options.serial > list.length) {
      return // 序号超出范围，不做任何处理
    }

    let match = list[options.serial - 1]
    let value = match[1]
    let index = match.index

    if (index === undefined) {
      return // 匹配出现问题，通常不会出现
    }
    if (value.length >= options.length) {
      return // 已经是要求的长度了，不做任何处理
    }

    let newValue = value.padStart(options.length, options.padString)
    let newName = fileName.slice(0, index) + newValue + fileName.slice(index + value.length)

    this.setFileName(ctx, newName)
  }
}

export default new Handler()
