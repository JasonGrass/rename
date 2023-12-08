<template>
  <div>
    <el-button type="primary" @click="onExecute">执行</el-button>
    <el-button type="danger">清空</el-button>
    <el-button>帮助</el-button>
  </div>
</template>

<script lang="ts" setup>
import { useFileStore } from '@/store/files';

const fileStore = useFileStore()

const onExecute = async () => {

  try {
    await fileStore.renameExecute()
  } catch (error: any) {
    ElMessage.error(error.message)
  }

}

</script>

<style lang="less" scoped>
button {
  width: 100px;
}
</style>
