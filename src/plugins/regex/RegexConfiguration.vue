<template>
  <div class="container">
    <el-input style="max-width: 80vw;" v-model="pattern"
      placeholder="search value, 正则表达式，可以使用 js 的正则字面量形式，如 /\d\d/i ，或者直接写正则表达式，如 \d\d"></el-input>
    <el-input style="max-width: 80vw;" v-model="newStr" placeholder="replace value, 新字符串,可以使用反向引用"></el-input>
  </div>
</template>

<script lang="ts" setup>

const pattern = ref("")
const newStr = ref("")

const emits = defineEmits(["submit"])

watchEffect(() => {
  const options = {
    pattern: pattern.value,
    to: newStr.value
  }
  emits("submit", options)
})

</script>

<style lang="less" scoped>
.container {

  display: flex;
  flex-direction: column;

  &>div:nth-child(1) {
    margin-bottom: 12px;
  }
}
</style>
