<template>
  <div>

    <el-input v-model="insert" placeholder="待插入的字符串"></el-input>

  </div>
</template>

<script lang="ts" setup>
const insert = ref("")

const emits = defineEmits(["submit"])

watchEffect(() => {
  const options = {
    to: insert.value
  }
  emits("submit", options)
})

</script>

<style lang="scss" scoped></style>
