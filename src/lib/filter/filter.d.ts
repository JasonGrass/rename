type FileFilterType = "include" | "exclude"

type FileFilterProp = "filename" | "extension" | "size" | "modifyTime" | undefined

type FileFilterPredicate =
  | "contains"
  | "notContains"
  | "startsWith"
  | "endsWith"
  | "equals"
  | "gt"
  | "ge"
  | "lt"
  | "le"
  | "eq"
  | undefined

type SizeUnit = "KB" | "MB" | "GB" | "TB" | undefined

interface PredicateItem {
  label: string
  value: FileFilterPredicate
}
