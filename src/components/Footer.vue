<template>
  <div class="footer">

    <span>文件数: {{ selectedCount }} / {{ total }} (过滤结果/导入总数)</span>

    <span class="working-file-span" v-if="waitRenameCount > 0">正在等待重命名文件数: {{ waitRenameCount }} ;
      成功数量: {{ successRenameCount }} ;
      失败数量: {{ failRenameCount }} ;
      当前正在重命名: {{ renameWorkingFile?.name ?? "" }}</span>

  </div>
</template>

<script lang="ts" setup>
import { useFileStore } from '@/store/files';
import { storeToRefs } from 'pinia';

const fileStore = useFileStore()

const { total, selectedCount, waitRenameCount, successRenameCount, failRenameCount, renameWorkingFile } = storeToRefs(fileStore)

</script>

<style lang="less" scoped>
.footer {

  display: flex;
  justify-content: center;

  background-color: #eee;

  font-size: 12px;
  line-height: 20px;
  user-select: none;

  &>span:nth-child(n+1) {
    margin-left: 24px;
  }

}

.working-file-span {
  display: inline-block;
  width: 800px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
