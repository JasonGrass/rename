import { defineStore } from "pinia"

export const useFileStore = defineStore("files", () => {
  const files: Ref<FileItem[]> = ref([])

  const total = computed(() => files.value.length)
  const selectedCount = computed(() => files.value.filter((file) => file.selected).length)

  function addFiles(items: FileItem[]) {
    if (items.length === 0) {
      return
    }
    files.value.push(...items)
  }

  return { files, selectedCount, total, addFiles }
})
