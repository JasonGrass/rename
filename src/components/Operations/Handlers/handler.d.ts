interface IRenameHandler {
  title: string
  active: boolean
  enable: boolean
  component: Component
  rename(ctx: IRenameContext, options?: T)
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
