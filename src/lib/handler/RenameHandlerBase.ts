/**
 * Handler 的基类，抽取了一些公共代码
 */
export default abstract class RenameHandlerBase<T> implements Partial<IRenameHandler> {
  private _options: T | null = null

  public active: boolean = false
  public enable: boolean = false
  public containExt: boolean = false

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

  abstract doRename(ctx: IRenameContext, options: T): void
}
