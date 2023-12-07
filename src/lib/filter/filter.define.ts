export const filterTypeOptions: { label: string; value: FileFilterType }[] = [
  {
    label: "包含文件",
    value: "include"
  },
  {
    label: "排除文件",
    value: "exclude"
  }
]

export const matchOptions: { label: string; value: FileFilterProp }[] = [
  {
    label: "文件名",
    value: "filename"
  },
  {
    label: "后缀名",
    value: "extension"
  },
  {
    label: "文件大小",
    value: "size"
  },
  {
    label: "修改时间",
    value: "modifyTime"
  }
]

export const stringPredicateOptions: PredicateItem[] = [
  {
    label: "包含",
    value: "contains"
  },
  {
    label: "不包含",
    value: "notContains"
  },
  {
    label: "开始于",
    value: "startsWith"
  },
  {
    label: "结束于",
    value: "endsWith"
  },
  {
    label: "等于",
    value: "equals"
  }
]

export const numberPredicateOptions: PredicateItem[] = [
  {
    label: "大于",
    value: "gt"
  },
  {
    label: "大于等于",
    value: "ge"
  },
  {
    label: "小于",
    value: "lt"
  },
  {
    label: "小于等于",
    value: "le"
  },
  {
    label: "等于",
    value: "eq"
  }
]
