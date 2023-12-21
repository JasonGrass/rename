<template>
  <div class="container">
    <div>
      <el-text>对第</el-text>
      <el-input-number v-model="serial" :min="1" style="margin: 0 5px;"></el-input-number>
      <el-text>组数字进行补齐操作，</el-text>
      <el-text>目标长度为：</el-text>
      <el-input-number v-model="length" :min="1" :max="9"></el-input-number>
    </div>
    <div class="pad-string">
      <el-text>填充字符：</el-text>
      <el-input v-model="padString" minlength="1" maxlength="1" show-word-limit style="width: 100px;"></el-input>
    </div>
  </div>
</template>

<script lang="ts" setup>

const serial = ref(1)
const length = ref(2)
const padString = ref("0")

const emits = defineEmits(["submit"])
watchEffect(() => {
  const options = {
    serial: serial.value,
    length: length.value,
    padString: padString.value
  }
  emits("submit", options)
})

</script>

<style lang="less" scoped>
.container {
  margin: 16px 0 0 0;
}

.pad-string {
  display: flex;
  margin: 12px 0;
}
</style>
