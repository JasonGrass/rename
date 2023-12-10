<template>
  <div>
    <el-input v-model="replacedStr" placeholder="被替换字符串"></el-input>
    <el-input v-model="newStr" placeholder="新字符串"></el-input>
  </div>
</template>

<script lang="ts" setup>

const replacedStr = ref("")
const newStr = ref("")

const emits = defineEmits(["submit"])

watchEffect(() => {
  const options = {
    from: replacedStr.value,
    to: newStr.value
  }
  emits("submit", options)
})

</script>

<style lang="less" scoped></style>


