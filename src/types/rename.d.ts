interface FileItem {
  /**
   * 文件名
   */
  name: string

  /**
   * 修改时间
   */
  modifyTime: number

  /**
   * 创建时间，在浏览器 API 下，不提供
   */
  createTime?: number

  /**
   * 文件大小，单位：字节
   */
  size: number

  /**
   * 目录，web api 不提供完整的路径
   * */
  folder?: string

  /**
   * 直接父目录
   */
  parent?: string

  /**
   * MIME Type
   */
  type: string

  /**
   * 重命名预览
   */
  preview: string = ""

  /**
   * 修改之后的命名，是否为合法文件名
  */
  isValidName: boolean = true

  /**
   * 是否被选择重命名
   */
  selected: boolean = true

  /**
   * 文件处理句柄
   */
  handle: FileSystemFileHandle

  /**
   * 加载文件时，根据文件信息计算出来的 hash 值
   */
  hash: string
}
