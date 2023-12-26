import { getExtension, getFilenameWithoutExtension } from "@/utils/file"

/**
 * Handler 的基类，抽取了一些公共代码
 */
export default abstract class RenameHandlerBase<T> implements Partial<IRenameHandler> {
  private _options: T | null = null

  public active: boolean = false
  public enable: boolean = false
  public containExt: boolean = false
  public id: string = ""

  public setOptions(options: T) {
    if (options) {
      this._options = options
    }
  }

  public rename(ctx: IRenameContext, options?: T) {
    if (options) {
      this._options = options
    }

    if (!this._options) {
      return
    }

    this.doRename(ctx, this._options)
  }

  protected abstract doRename(ctx: IRenameContext, options: T): void

  /**
   * 获取需要进行重命名操作的文件名，自动判断是否包含扩展名
   */
  protected getFileName(ctx: IRenameContext) {
    if (this.containExt) {
      return ctx.name + ctx.extension
    }
    return ctx.name
  }

  /**
   * 更新重命名之后的文件名，自动判断是否包含扩展名
   */
  protected setFileName(ctx: IRenameContext, fileName: string) {
    if (this.containExt) {
      ctx.name = getFilenameWithoutExtension(fileName).trim()
      ctx.extension = getExtension(fileName).trim()
    } else {
      ctx.name = fileName.trim()
    }
    return ctx
  }
}
