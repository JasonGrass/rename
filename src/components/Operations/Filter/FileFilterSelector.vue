<template>
  <div class="container">

    <el-select v-model="filterType" style="width: 120px;">
      <el-option v-for="item in filterTypeOptions" :key="item.value" :label="item.label" :value="<string>item.value" />
    </el-select>

    <el-select v-model="matchProp" style="width: 120px;">
      <el-option v-for="item in matchOptions" :key="item.value" :label="item.label" :value="<string>item.value" />
    </el-select>
    <el-select v-model="predicate" style="width: 120px;">
      <el-option v-for="item in predicateOptions" :key="item.value" :label="item.label" :value="<string>item.value" />
    </el-select>

    <!-- 文件名/扩展名输入 -->
    <el-input v-if='matchProp === "filename" || matchProp === "extension"' v-model="predicateStringParam" />
    <el-checkbox v-if='matchProp === "filename" || matchProp === "extension"' v-model="ignoreCase"
      border>忽略大小写</el-checkbox>

    <!-- 文件大小输入 -->
    <el-input-number v-if='matchProp === "size"' v-model="predicateNumberParam" :min="0" controls-position="right" />
    <el-select v-if='matchProp === "size"' v-model="sizeUnit" style="width: 80px;">
      <el-option v-for='item in ["KB", "MB", "GB", "TB"]' :key="item" :label="item" :value="item" />
    </el-select>

    <!-- 日期输入 -->
    <el-date-picker v-if='matchProp === "modifyTime"' v-model="predicateNumberParam" type="datetime"
      placeholder="Select date and time" style="margin-right: 12px;" />

    <!-- 提交 -->
    <el-button type="primary" @click="onSubmit" style="width: 80px;">提交</el-button>

    <!-- 备注提示 -->
    <el-alert v-if="Boolean(remark)" type="info" :closable="false" show-icon>
      <template v-slot:title>
        <span class="alert">{{ remark }}</span>
      </template>
    </el-alert>
  </div>
</template>

<script lang="ts" setup>
import { filterTypeOptions, matchOptions, stringPredicateOptions, numberPredicateOptions } from '@/lib/filter/filter.const';
import { FileFilterItem } from '@/lib/filter/FileFilterItem';

// 包含还是排除
const filterType = ref<FileFilterType>("include")

// 过滤的属性
const matchProp = ref<FileFilterProp>("filename")
// 过滤的操作（谓词）
const predicate = ref<FileFilterPredicate>(undefined)
const predicateOptions = ref<PredicateItem[]>([])
// 过滤操作的参数
const predicateStringParam = ref("")
const predicateNumberParam = ref(0)
// 过滤操作的额外参数
const ignoreCase = ref(true) // 忽略大小写
const sizeUnit = ref<SizeUnit>("KB") // 大小的单位
// 备注提示
const remark = ref("")

watch(matchProp, () => {
  const m = matchProp.value;
  if (m === "filename" || m === "extension") {
    predicateOptions.value = stringPredicateOptions
    predicate.value = stringPredicateOptions[0].value
  }
  else if (m === "size" || m === "modifyTime") {
    predicateOptions.value = numberPredicateOptions
    predicate.value = numberPredicateOptions[0].value
    predicateNumberParam.value = 0
  }
  else {
    console.error("存在没有处理的选项", m)
  }

  switch (m) {
    case "filename":
      remark.value = "这里的文件名不包括扩展名称"
      break
    case "extension":
      remark.value = "后缀名称包括字符 \".\""
      break
    default:
      remark.value = ""
  }

}, {
  immediate: true
})

const buildFilterOptions: () => FileFilterItem | null = () => {
  const options = {
    prop: matchProp.value,
    predicate: predicate.value,
    stringValue: predicateStringParam.value?.trim(),
    numberValue: predicateNumberParam.value,
    caseSensitive: !ignoreCase.value,
    sizeUnit: sizeUnit.value,
  }

  if (options.prop === "filename" || options.prop === "extension") {
    if (!options.stringValue) {
      ElMessage.error('Oops, 还没有填写具体内容')
      return null
    }
  }

  if (options.prop === "modifyTime" && options.numberValue < 1) {
    ElMessage.error('Oops, 请重新选择日期')
    return null
  }

  return FileFilterItem.build(
    filterType.value,
    options.prop,
    options.predicate,
    options.stringValue,
    options.numberValue,
    options.caseSensitive,
    options.sizeUnit)
}

const emit = defineEmits(["submit"])

const onSubmit = () => {
  const options = buildFilterOptions()
  if (options) {
    emit("submit", options)
  }
}

</script>

<style lang="less" scoped>
.container {
  display: flex;
  align-items: center;

  padding: 4px 0 0 0;

  &>div,
  label,
  button {
    margin-right: 12px;
  }

}

.el-input {
  max-width: 240px;
}

.el-alert {
  max-width: 280px;
  padding: 6px 8px;
}

.alert {
  line-height: 21px;
}
</style>

