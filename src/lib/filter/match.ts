import { FileFilterItem } from "./FileFilterItem"
import { getExtension } from "@/utils/file"

export function isMatch(file: FileItem, filter: FileFilterItem): boolean {
  let match = isFilenameMatch(file, filter)
  if (match !== null) {
    return match
  }
  match = isExtensionMatch(file, filter)
  if (match !== null) {
    return match
  }
  match = isSizeMatch(file, filter)
  if (match !== null) {
    return match
  }
  match = isModifyTimeMatch(file, filter)
  if (match !== null) {
    return match
  }
  return false
}

function isFilenameMatch(file: FileItem, filter: FileFilterItem): boolean | null {
  if (filter.prop !== "filename") {
    return null
  }

  let filename = file.name
  let pattern = filter.stringValue
  if (!filter.caseSensitive) {
    filename = filename.toLowerCase()
    pattern = pattern.toLowerCase()
  }

  return isStringValueMatch(filename, pattern, filter.predicate)
}

function isExtensionMatch(file: FileItem, filter: FileFilterItem): boolean | null {
  if (filter.prop !== "extension") {
    return null
  }

  let extension = getExtension(file.name)
  let pattern = filter.stringValue
  if (!filter.caseSensitive) {
    extension = extension.toLowerCase()
    pattern = pattern.toLowerCase()
  }

  return isStringValueMatch(extension, pattern, filter.predicate)
}

function isSizeMatch(file: FileItem, filter: FileFilterItem): boolean | null {
  if (filter.prop !== "size") {
    return null
  }

  return isNumberValueMatch(file.size, filter.numberValue, filter.predicate)
}

function isModifyTimeMatch(file: FileItem, filter: FileFilterItem): boolean | null {
  if (filter.prop !== "modifyTime") {
    return null
  }

  return isNumberValueMatch(file.modifyTime, filter.numberValue, filter.predicate)
}

function isStringValueMatch(value: string, pattern: string, predicate: FileFilterPredicate) {
  if (predicate === "contains") {
    return value.includes(pattern)
  }

  if (predicate === "notContains") {
    return !value.includes(pattern)
  }

  if (predicate === "startsWith") {
    return value.startsWith(pattern)
  }

  if (predicate === "endsWith") {
    return value.endsWith(pattern)
  }

  if (predicate === "equals") {
    return value === pattern
  }

  return false
}

function isNumberValueMatch(value: number, pattern: number, predicate: FileFilterPredicate) {
  if (predicate === "equals" || predicate === "eq") {
    return value === pattern
  }

  if (predicate === "gt") {
    return value > pattern
  }

  if (predicate === "lt") {
    return value < pattern
  }

  if (predicate === "ge") {
    return value >= pattern
  }

  if (predicate === "le") {
    return value <= pattern
  }

  return false
}
