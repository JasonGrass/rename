<template>
  <div>
    <el-input v-model="replacedStr" placeholder="被替换字符串"></el-input>
    <el-input v-model="newStr" placeholder="新字符串"></el-input>
  </div>
</template>

<script lang="ts" setup>
import _ from 'lodash';

const replacedStr = ref("")
const newStr = ref("")

const emits = defineEmits(["submit"])

const submit = _.debounce((options: IReplaceHandlerOptions) => {
  emits("submit", options)
}, 500)

watchEffect(() => {
  const options = {
    from: replacedStr.value,
    to: newStr.value
  }
  submit(options)
})

</script>

<style lang="less" scoped></style>


