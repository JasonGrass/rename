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

  return { files, filteredFiles, selectedCount, total, addFiles }
})
