import { defineStore } from "pinia"
import { useFilterStore } from "./filters"
import { calcHash } from "@/utils/file"

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

    for (const item of items) {
      const same = files.value.find((f) => f.hash === item.hash)
      if (same) {
        same.name = item.name
        same.modifyTime = item.modifyTime
        same.size = item.size

        // OPT store 中使用 UI
        ElMessage.warning(`文件已存在 \"${item.name}\"`)
      } else {
        files.value.push(item)
      }
    }
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

    let success = 0
    let fail = 0
    for (const file of files) {
      try {
        file.error = ""
        await file.handle.move(file.preview)
        await updateFile(file)
        success += 1
      } catch (e: any) {
        console.error("重命名失败", file.name, e)
        file.error = typeof e === "string" ? e : e instanceof Error ? e.message : `未知错误 ${e}`
        fail += 1
      }
    }

    return [success, fail]
  }

  async function refresh() {
    const files: FileItem[] = filteredFiles.value
    for (const file of files) {
      try {
        file.error = ""
        await updateFile(file)
      } catch (e: any) {
        console.error("刷新失败", file.name, e)
        const message = typeof e === "string" ? e : e instanceof Error ? e.message : `未知错误 ${e}`
        // OPT store 中使用 UI
        ElMessage.error(`文件 \"${file.name}\" 刷新失败. ${message}`)
      }
    }
  }

  async function updateFile(file: FileItem) {
    const nf = await file.handle.getFile()
    file.name = nf.name
    file.modifyTime = nf.lastModified
    file.size = nf.size
    file.hash = calcHash(nf, file.folder)
  }

  function clear() {
    files.value = []
  }

  return {
    files,
    filteredFiles,
    selectedCount,
    total,
    addFiles,
    renamePreview,
    renameExecute,
    refresh,
    clear
  }
})
