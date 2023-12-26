interface IRenameHandler {
  /**
   * 标题
   */
  title: string

  /**
   * 是否为当前选中的 Handler
   */
  active: boolean

  /**
   * 是否启用
   */
  enable: boolean

  /**
   * 是否处理扩展名
   */
  containExt: boolean

  /**
   * Handler 参数配置组件实例
   */
  component: Component

  /**
   * 排序参考
   */
  sortHint: number

  /**
   * 唯一标识
   */
  id: string

  /**
   * 执行 rename 操作
   * @param ctx rename 上下文
   * @param options Handler 参数配置，如果为空则使用缓存的配置
   */
  rename(ctx: IRenameContext, options?: T)

  /**
   * 缓存配置
   * @param options Handler 参数配置
   */
  setOptions(options: T)
}

interface IRenameContext {
  /**
   * 文件名，不包含后缀
   */
  name: string

  /**
   * 后缀名，包含 .
   */
  extension: string

  /**
   * 文件
   */
  file: FileItem
}
