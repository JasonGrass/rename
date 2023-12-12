import { defineStore } from "pinia"
import { useFilterStore } from "./filters"
import { calcHash } from "@/utils/file"
import { ElNotification } from "element-plus"

export const useFileStore = defineStore("files", () => {
  const filterStore = useFilterStore()

  const files: Ref<FileItem[]> = ref([])
  const filteredFiles = computed(() => files.value.filter((file) => filterStore.filter(file)))

  const total = computed(() => files.value.length)
  const selectedCount = computed(() => filteredFiles.value.length)

  const waitRenameCount = ref(0)
  const successRenameCount = ref(0)
  const failRenameCount = ref(0)
  const renameWorkingFile = ref()

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

    if (files.length === 0) {
      return [0, 0]
    }

    const invalidName = files.find((f) => !f.isValidName)
    if (invalidName) {
      throw new Error("重命名拒绝执行，存在非法文件名称")
    }

    waitRenameCount.value = files.length
    successRenameCount.value = 0
    failRenameCount.value = 0
    renameWorkingFile.value = undefined

    for (const file of files) {
      try {
        file.error = ""
        renameWorkingFile.value = file
        await file.handle.move(file.preview)
        await updateFile(file)
        successRenameCount.value += 1
        waitRenameCount.value -= 1
      } catch (e: any) {
        console.log("重命名失败", file.name)
        console.error(e)
        console.table(e)
        file.error = typeof e === "string" ? e : e instanceof Error ? e.message : `未知错误 ${e}`
        failRenameCount.value += 1
        waitRenameCount.value -= 1
        ElNotification({
          title: "重命名失败",
          message: `${file.name} 重命名失败. ${file.error}`,
          type: "error",
          duration: 0
        })
      }
    }

    return [successRenameCount.value, failRenameCount.value]
  }

  /**
   * 从磁盘读取刷新文件信息
   */
  async function refresh() {
    const files: FileItem[] = filteredFiles.value
    for (const file of files) {
      try {
        file.error = ""
        await updateFile(file)
      } catch (e: any) {
        console.log("刷新失败", file.name)
        console.error(e)
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

  /**
   * 清空文件记录
   */
  function clear() {
    files.value = []
  }

  /**
   * 更新排序索引
   */
  function updateIndex(file: FileItem) {
    const files: FileItem[] = filteredFiles.value
    const one = files.find((f) => f.hash === file.hash)
    if (one) {
      one.index = file.index
    }
  }

  return {
    files,
    filteredFiles,
    selectedCount,
    total,
    waitRenameCount,
    successRenameCount,
    failRenameCount,
    renameWorkingFile,
    addFiles,
    renamePreview,
    renameExecute,
    refresh,
    clear,
    updateIndex
  }
})
