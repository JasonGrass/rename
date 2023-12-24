<script setup lang="ts">
import { ElMessageBox } from 'element-plus'

const isMobile = ref(false)

onMounted(() => {

  isMobile.value = checkIsMobile();
  if (isMobile.value) {
    return
  }

  const f = globalThis.showOpenFilePicker
  if (typeof f !== "function") {
    ElMessageBox.alert('当前浏览器尚未支持相关 API，请使用最新版本的 Edge 或 Chrome 浏览器', '浏览器不兼容', {
      confirmButtonText: 'OK',
    })
  }
})

const checkIsMobile = () => {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return Boolean(flag);
}

const onGithubClick = () => {
  globalThis.open("https://github.com/JasonGrass/rename", "_self", "noreferrer")
}

</script>

<template>
  <div class="app" v-if="!isMobile">
    <Header></Header>

    <div class="body">
      <HandlerMenu class="menu"></HandlerMenu>
      <Operations class="operation"></Operations>
    </div>

    <Footer class="footer"></Footer>
  </div>

  <div class="app-mobile" v-if="isMobile">
    <img class="logo" src="@/assets/icon256.ico" alt="logo" width="128" height="128">
    <el-text class="text">文件批量重命名工具</el-text>
    <el-text class="text">此工具不支持移动端，请在电脑上使用最新版本的 Chrome/Edge 浏览器打开</el-text>
    <img class="github" src="@/assets/github.svg" alt="github" width="32" @click="onGithubClick" />
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

.app-mobile {
  height: 90vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 12px;

  .logo {
    margin: -64px 0 64px 0;
  }

  .text {
    margin: 8px 0;
    text-align: center;

    word-break: keep-all;
  }

  .github {
    margin-top: 64px;
  }
}
</style>
