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
    const [success, fail] = await fileStore.renameExecute()
    if (success > 0) {
      ElMessage.success(`成功修改 ${success} 个文件的文件名`)
    }
    if (fail > 0) {
      ElMessage.error(`有 ${fail} 个文件重命名失败`)
    }
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
