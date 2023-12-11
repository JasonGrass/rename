import _ from "lodash"

import { useFileStore } from "@/store/files"

import { getFilenameWithoutExtension, getExtension, isValidFilename } from "@/utils/file"
import HandlerFactory from "./HandlerFactory"

/**
 * 文件重命名处理流程
 */
export function useRenameHandler() {
  const handlers = HandlerFactory.handlers
  const fileStore = useFileStore()

  const rename = (options: any) => {
    // 对于当前选中的重命名操作，即使 enable，也先保存其配置
    const activeHandler = handlers.find((h) => h.active)
    if (activeHandler && options) {
      activeHandler.setOptions(options)
    }

    fileStore.renamePreview((file) => {
      // 构建重命名操作上下文
      const ctx = {
        name: getFilenameWithoutExtension(file.name),
        extension: getExtension(file.name),
        file: file
      }

      for (const handler of handlers) {
        // 未启用的操作规则，不执行
        if (!handler.enable) {
          continue
        }

        try {
          if (handler.active) {
            // 当前选中的操作规则，则按照最新的配置执行
            handler.rename(ctx, options)
          } else {
            // 其它规则，则按照缓存的规则配置执行
            handler.rename(ctx, undefined)
          }
        } catch (error: any) {
          console.error(`执行 "${handler.title}" 出错`, error)
        }
      }

      const newName = ctx.name + ctx.extension
      // 判断新文件名是否合法
      file.isValidName = isValidFilename(newName)
      return newName
    })
  }

  const debounceRename = _.debounce((options) => {
    rename(options)
  }, 500)

  return { debounceRename }
}
