<template>
  <div class="footer">

    <span>文件数: {{ selectedCount }} / {{ total }} (过滤结果/导入总数)</span>

  </div>
</template>

<script lang="ts" setup>
import { useFileStore } from '@/store/files';
import { storeToRefs } from 'pinia';

const fileStore = useFileStore()

const { total, selectedCount } = storeToRefs(fileStore)

</script>

<style lang="less" scoped>
.footer {

  display: flex;
  justify-content: center;

  background-color: #eee;

  font-size: 12px;
  line-height: 20px;
  user-select: none;

}
</style>
