import { FileFilterItem } from "@/lib/filter/FileFilterItem"
import { defineStore } from "pinia"

export const useFilterStore = defineStore("filters", () => {
  const filters: Ref<FileFilterItem[]> = ref([])

  function addFilter(filter: FileFilterItem | null) {
    if (!filter) {
      return
    }

    if (filters.value.find((f) => f.prop === filter.prop && f.type === filter.type)) {
      throw Error(`重复添加条件：[${filter.type}] ${filter.prop}`)
    }

    filters.value.push(filter)
  }

  function removeFilter(filter: FileFilterItem) {
    filters.value = filters.value.filter((f) => {
      if (f.prop === filter.prop && f.type === filter.type) {
        return false
      } else {
        return true
      }
    })
  }

  function filter(file: FileItem): boolean {
    const includeFilters = filters.value.filter((filter) => filter.type === "include")
    const excludeFilters = filters.value.filter((filter) => filter.type === "exclude")

    let includeMatch = true
    let excludeMatch = false

    if (includeFilters.length > 0) {
      includeMatch = includeFilters.some((filter) => filter.match(file))
    }
    if (excludeFilters.length > 0) {
      excludeMatch = excludeFilters.some((filter) => filter.match(file))
    }

    return includeMatch && !excludeMatch
  }

  return { filters, addFilter, removeFilter, filter }
})
