<template>
  <div>
    <OperationWrapper :canFold="true" title="文件过滤">
      <FileFilter></FileFilter>
    </OperationWrapper>

    <OperationWrapper v-if="Boolean(currentHandler)" :canFold="true" :title="currentHandler?.title">
      <HandlerContainer :currentHandler="currentHandler"></HandlerContainer>
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
import HandlerFactory from '@/components/Handlers/HandlerFactory';
const handlers = HandlerFactory.handlers

const currentHandler = ref<IRenameHandler>()
watch(handlers, () => {
  const current = handlers.find(h => h.active)
  currentHandler.value = current
})

onMounted(() => {
  currentHandler.value = handlers[0]
})

</script>

<style lang="less" scoped></style>
