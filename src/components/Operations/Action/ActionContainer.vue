<template>
  <div>
    <el-button type="primary" @click="onExecute">执行</el-button>

    <el-popconfirm title="确认清空所有文件?" width="200" @confirm="onClean">
      <template #reference>
        <el-button type="danger">清空</el-button>
      </template>
    </el-popconfirm>

    <el-button @click="onRefresh">刷新</el-button>
    <!-- <el-button @click="onHelp">帮助</el-button> -->
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
      console.log(`成功修改 ${success} 个文件的文件名`)
    }
    if (fail > 0) {
      ElMessage.error(`有 ${fail} 个文件重命名失败`)
      console.log(`有 ${fail} 个文件重命名失败`)
    }
  } catch (error: any) {
    ElMessage.error(error.message)
  }
}

const onClean = () => {
  fileStore.clear()
  ElMessage({
    showClose: true,
    message: "清空完成",
    type: "success"
  });
}

const onRefresh = async () => {
  if (fileStore.$state.files.length === 0) {
    ElMessage({
      showClose: true,
      message: "没有任何可以刷新的文件",
      type: "warning"
    });
    return
  }

  await fileStore.reload()
  ElMessage.success("刷新完成");
}

</script>

<style lang="less" scoped>
button {
  width: 80px;
}
</style>
