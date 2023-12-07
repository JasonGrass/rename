<template>
  <div>
    <OperationWrapper :canFold="true" title="文件过滤">
      <FileFilter></FileFilter>
    </OperationWrapper>

    <OperationWrapper :canFold="true" title="重命名配置">
      <div>xxxxxxxxxxxxxxx</div>
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

</script>

<style lang="less" scoped></style>
