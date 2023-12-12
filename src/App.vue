<script setup lang="ts">
import { ElMessageBox } from 'element-plus'

onMounted(() => {
  const f = globalThis.showOpenFilePicker
  if (typeof f !== "function") {
    ElMessageBox.alert('当前浏览器尚不支持次功能，请使用最新版本的 Edge 或 Chrome 浏览器', '浏览器不兼容', {
      confirmButtonText: 'OK',
    })
  }
})

</script>

<template>
  <div class="app">
    <Header></Header>

    <div class="body">
      <HandlerMenu class="menu"></HandlerMenu>
      <Operations class="operation"></Operations>
    </div>

    <Footer class="footer"></Footer>
  </div>
</template>

<style scoped>
.app {
  height: calc(100vh - env(safe-area-inset-bottom) - 20px);
}

.body {
  display: flex;
  margin-right: 8px;
  padding-bottom: 20px;
}

.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: env(safe-area-inset-bottom);
  height: 20px;
}

.menu {
  min-width: 180px;
  margin: 0 12px 0 0;

}

.operation {
  flex: 1 1 0%
}
</style>
