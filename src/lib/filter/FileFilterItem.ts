export class FileFilterItem {
  public type: FileFilterType = "include"
  public prop: FileFilterProp = undefined
  public predicate: FileFilterPredicate = undefined
  public stringValue: string = ""
  public numberValue: number = 0
  public caseSensitive: boolean = false
  public sizeUnit: SizeUnit = undefined

  constructor() {}

  public toString() {
    if (this.prop === "filename" || this.prop === "extension") {
      return `[${nameOfType(this.type)}] ${nameOfProp(this.prop)}${nameOfPredicate(this.predicate)}
      "${this.stringValue}" (${nameCaseSensitive(this.caseSensitive)})`
    } else if (this.prop === "size") {
      return `[${nameOfType(this.type)}] ${nameOfProp(this.prop)}${nameOfPredicate(this.predicate)}
      ${this.numberValue}${this.sizeUnit}`
    } else if (this.prop === "modifyTime") {
      return `[${nameOfType(this.type)}] ${nameOfProp(this.prop)}${nameOfPredicate(
        this.predicate
      )} ${nameOfDateTime(this.numberValue)}`
    } else {
      return "未知过滤参数"
    }
  }

  static build(
    type: FileFilterType,
    prop: FileFilterProp,
    predicate: FileFilterPredicate,
    stringValue: string,
    numberValue: number,
    caseSensitive: boolean,
    sizeUnit: SizeUnit
  ): FileFilterItem {
    const item = new FileFilterItem()

    item.type = type
    item.prop = prop
    item.predicate = predicate
    item.stringValue = stringValue
    item.numberValue = numberValue
    item.caseSensitive = caseSensitive
    item.sizeUnit = sizeUnit

    return item
  }
}

import {
  filterTypeOptions,
  matchOptions,
  stringPredicateOptions,
  numberPredicateOptions
} from "./filter.define"

function nameOfType(type: FileFilterType) {
  return filterTypeOptions.find((item) => item.value === type)?.label
}

function nameOfProp(prop: FileFilterProp) {
  return matchOptions.find((item) => item.value === prop)?.label
}

function nameOfPredicate(predicate: FileFilterPredicate) {
  const r = stringPredicateOptions.find((item) => item.value === predicate)?.label
  if (!r) {
    return numberPredicateOptions.find((item) => item.value === predicate)?.label
  } else {
    return r
  }
}

function nameCaseSensitive(caseSensitive: boolean) {
  return caseSensitive ? "大小写敏感" : "忽略大小写"
}

function nameOfDateTime(timestamp: number) {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  const seconds = date.getSeconds().toString().padStart(2, "0")

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
