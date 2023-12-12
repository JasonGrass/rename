<template>
  <div>
    <div class="filters">
      <el-checkbox v-model="isShowFolder" label="显示目录" border />
      <el-checkbox v-model="isOnlyPreview" label="仅显示预览" border />
    </div>

    <vxe-table :data="data" class="table" max-height="300%" stripe border="inner" empty-text="尚未加载任何文件"
      @sort-change="onSortChange">
      <vxe-column type="seq" title="序号" width="60" align="center"></vxe-column>
      <vxe-column field="name" title="文件名" sortable align="left"></vxe-column>
      <!-- <vxe-column field="index" title="index" sortable align="left"></vxe-column> -->
      <vxe-column :visible="!isOnlyPreview" field="modifyTime" :formatter="timeFormater" title="修改时间" width="180" sortable
        align="center"></vxe-column>
      <!-- <vxe-column :visible="!isOnlyPreview" field="createTime" :formatter="timeFormater" title="创建时间" width="180" sortable
        align="center"></vxe-column> -->
      <vxe-column :visible="!isOnlyPreview" field="size" :formatter="sizeFormatter" title="大小" width="100" sortable
        align="center"></vxe-column>
      <vxe-column :visible="isShowFolder && !isOnlyPreview" field="folder" title="目录" sortable align="right"></vxe-column>
      <vxe-column field="preview" title="预览" align="left" :class-name="previewCellClass"></vxe-column>

    </vxe-table>

  </div>
</template>

<script lang="ts" setup>
import { formatFileSize, formatDate } from "@/utils/formatter";
import { VxeColumnPropTypes } from 'vxe-table'

import { useFileStore } from '@/store/files';
import { storeToRefs } from "pinia";

const fileStore = useFileStore()
const { filteredFiles } = storeToRefs(fileStore)

const data = computed(() => {
  // 初始化文件 Item 的索引计数
  const files = filteredFiles.value
  for (let i = 0; i < files.length; i++) {
    files[i].index = i
  }
  return files
})

const sizeFormatter: VxeColumnPropTypes.Formatter<FileItem> = ({ cellValue }) => {
  // {cellValue, column, row, rowIndex}
  return formatFileSize(cellValue)
}

const timeFormater: VxeColumnPropTypes.Formatter<FileItem> = ({ cellValue }) => {
  if (!cellValue) {
    return "UNKNOWN"
  }
  return formatDate(cellValue)
}

const isShowFolder = ref(false)
const isOnlyPreview = ref(false)

const previewCellClass = (args: any) => {
  const row = args.row as FileItem
  if (!row || row.isValidName === undefined) {
    return ""
  }
  return row.isValidName ? "" : "invalid-filename"
}

const onSortChange = (args: any) => {
  const table = args.$table;
  const visibleData = table.getTableData().visibleData // 排序结果

  for (let i = 0; i < visibleData.length; i++) {
    const item = visibleData[i]
    item.index = i;
    fileStore.updateIndex(item)
  }
}

</script>

<style lang="less" scoped>
.table {
  min-width: 10%;
  max-width: 99%;

}

.filters {
  margin: 4px 0 8px 0;

  .el-checkbox {
    margin-right: 12px;
  }
}
</style>

<style>
.invalid-filename {
  color: #F56C6C
}
</style>

