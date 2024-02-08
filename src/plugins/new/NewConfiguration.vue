<template>
  <div class="container">
    <el-input v-model="pattern" placeholder="输入全新的命名规则，使用 <> 引用变量，如 <name>，点击右侧 Help 查看帮助（再次点击 Help 隐藏）"></el-input>
    <el-button type="primary" @click="onHelpClick">Help</el-button>
  </div>

  <Teleport to="body">
    <Transition name="help">
      <div class="help-container" v-if="isHelpContentShow">
        <div class="help-content">
          <h3 class="title">变量定义</h3>
          <div class="content">
            <span class="content-line">
              <span class="variable">&lt;name&gt;</span> 原文件名(不含后缀); <span class="variable">&lt;ext&gt;</span> 原后缀名; 可以使用
              :upper 或 :lower 转换大小写
            </span>
            <span class="content-line">
              <span class="variable">&lt;#:1&gt;</span> 编号,基数为1(默认),固定位数则使用多个 #, 如 <span
                class="variable">&lt;####&gt;</span>
            </span>
            <span class="content-line">
              <span class="variable">&lt;date&gt;</span>/<span class="variable">&lt;date.now&gt;</span> 当前日期;
              <span class="variable">&lt;date.modify&gt;</span> 文件最后修改日期
            </span>
            <span class="content-line">
              <span class="variable">&lt;time&gt;</span>/<span class="variable">&lt;time.now&gt;</span> 当前时间;
              <span class="variable">&lt;time.modify&gt;</span> 文件最后修改时间
            </span>
            <span class="content-line">
              日期和时间可以使用格式化字符串，如 <span class="variable">&lt;date.modify:YYYY-MM-DD&gt;</span> /
              <span class="variable">&lt;time:HH-mm-ss&gt;</span> <a href="https://day.js.org/docs/zh-CN/display/format"
                target="_blank" referrerpolicy="no-referrer">文档参考</a>
            </span>

            <span class="content-line">
              <span class="variable">&lt;uuid:8:upper&gt;</span> 随机字符串，可以使用 :8 指定长度，最长 32，添加 :upper 可以转换成大写
            </span>
          </div>
        </div>

      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
const pattern = ref("")
const isHelpContentShow = ref(false)

const emits = defineEmits(["submit"])

watchEffect(() => {
  const options = {
    pattern: pattern.value,
  }
  emits("submit", options)
})

const onHelpClick = () => {
  isHelpContentShow.value = !isHelpContentShow.value
}

onDeactivated(() => {
  isHelpContentShow.value = false
})

</script>

<style lang="less" scoped>
.container {
  display: flex;

  button {
    margin: 0 4px 0 12px
  }
}

.content {
  display: flex;
  flex-direction: column;
}

.content-line {
  font-size: 14px;
  line-height: 22px;

  .variable {
    color: #337ecc
  }
}

.help-content {
  margin: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;

}

.help-container {

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;

  height: 170px;
  max-height: 20vh;
  backdrop-filter: blur(6px);
  background-color: rgba(255, 255, 255, 0.6);

}

.help-enter-active,
.help-leave-active {
  transition: all 0.3s ease;
}

.help-enter-from,
.help-leave-to {
  opacity: 0;
  height: 0;
}
</style>
