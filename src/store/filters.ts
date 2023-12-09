import { FileFilterItem } from "@/lib/filter/FileFilterItem"
import { defineStore } from "pinia"

export const useFilterStore = defineStore("filters", () => {
  const filters: Ref<FileFilterItem[]> = ref([])

  function addFilter(filter: FileFilterItem | null) {
    if (!filter) {
      return
    }

    if (filters.value.find((f) => isSame(f, filter))) {
      throw Error(`重复添加条件：[${filter.type}] ${filter.prop}`)
    }

    filters.value.push(filter)
  }

  function removeFilter(filter: FileFilterItem) {
    filters.value = filters.value.filter((f) => {
      if (isSame(f, filter)) {
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
      includeMatch = includeFilters.every((filter) => filter.match(file))
    }
    if (excludeFilters.length > 0) {
      excludeMatch = excludeFilters.some((filter) => filter.match(file))
    }

    return includeMatch && !excludeMatch
  }

  function isSame(f1: FileFilterItem, f2: FileFilterItem) {
    return f1.prop === f2.prop && f1.type === f2.type && f1.predicate === f2.predicate
  }

  return { filters, addFilter, removeFilter, filter }
})
