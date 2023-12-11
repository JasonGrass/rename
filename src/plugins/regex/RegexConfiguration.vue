<template>
  <div class="container">
    <el-input style="max-width: 80vw;" v-model="pattern" placeholder="正则表达式（e.g. /abc/g ）"></el-input>
    <el-input style="max-width: 80vw;" v-model="newStr" placeholder="新字符串"></el-input>
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
