<template>
  <div>
    <OperationWrapper :canFold="true" title="文件过滤">
      <FileFilter></FileFilter>
    </OperationWrapper>

    <OperationWrapper v-if="Boolean(currentHandler)" :canFold="true" :title="currentHandler?.title">
      <div>
        <KeepAlive>
          <component :is="currentHandler?.component" @submit="onRenameHandlerSubmit"></component>
        </KeepAlive>
      </div>
    </OperationWrapper>

    <OperationWrapper>
      <div>
        <el-button>执行</el-button>
        <el-button>清空</el-button>
        <el-button>帮助</el-button>
      </div>
    </OperationWrapper>

    <OperationWrapper title="文件列表/结果预览">
      <FilesTable></FilesTable>
    </OperationWrapper>

  </div>
</template>

<script lang="ts" setup>

import ReplaceHandler from '@/components/Handlers/replace/ReplaceHandler';

const currentHandler = ref<IRenameHandler>()

const onRenameHandlerSubmit = (options: any) => {
  currentHandler.value?.rename(options)
}

onMounted(() => {
  currentHandler.value = ReplaceHandler
})


</script>

<style lang="less" scoped></style>
