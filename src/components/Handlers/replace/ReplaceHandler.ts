import ReplaceConfiguration from "./ReplaceConfiguration.vue"
import { useFileStore } from "@/store/files"
import { getFilenameWithoutExtension } from "@/utils/file"
import _ from "lodash"

const handler = {
  title: "替换字符",
  component: ReplaceConfiguration,
  rename(options: IReplaceHandlerOptions) {
    const fileStore = useFileStore()
    fileStore.renamePreview((file) => doRename(file, options))
  }
} as IRenameHandler

function doRename(file: FileItem, options: IReplaceHandlerOptions): string {
  const name = getFilenameWithoutExtension(file.name)
  return name.replaceAll(options.from, options.to)
}

export default handler
