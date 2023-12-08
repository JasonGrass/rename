import { defineStore } from "pinia"

import { useFilterStore } from "./filters"

export const useFileStore = defineStore("files", () => {
  const filterStore = useFilterStore()

  const files: Ref<FileItem[]> = ref([])
  const filteredFiles = computed(() => files.value.filter((file) => filterStore.filter(file)))

  const total = computed(() => files.value.length)
  const selectedCount = computed(() => filteredFiles.value.length)

  function addFiles(items: FileItem[]) {
    if (items.length === 0) {
      return
    }
    files.value.push(...items)
  }

  function renamePreview(rename: (item: FileItem) => string) {
    for (const file of filteredFiles.value) {
      file.preview = rename(file)
    }
  }

  async function renameExecute() {
    const files: FileItem[] = filteredFiles.value
    const invalidName = files.find((f) => !f.isValidName)
    if (invalidName) {
      throw new Error("重命名拒绝执行，存在非法文件名称")
    }

    for (const file of files) {
      try {
        file.error = ""
        await file.handle.move(file.preview)
        const nf = await file.handle.getFile()
        file.name = nf.name
        file.modifyTime = nf.lastModified
        file.size = nf.size
      } catch (e: any) {
        file.error = typeof e === "string" ? e : e instanceof Error ? e.message : e.toString()
      }
    }
  }

  return { files, filteredFiles, selectedCount, total, addFiles, renamePreview, renameExecute }
})
