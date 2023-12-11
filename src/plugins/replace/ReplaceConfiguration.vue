<template>
  <div class="postion-select">
    <el-select v-model="position" placeholder="删除/替换字符的位置">
      <el-option v-for="item in positionOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>

    <el-input-number v-show='["someCharAfterIndexM", "someCharBeforeIndexM"].includes(position)' style="width: 220px;"
      v-model="postionIndex" :min="0" placeholder="设置 M 的取值"></el-input-number>

    <el-input v-show='["string", "allAfterStr", "allBeforeStr", "someAfterStr", "someBeforeStr"].includes(position)'
      style="width: 360px;" v-model="postionStr" placeholder="设置字符串 XX 的取值"></el-input>

    <el-input-number
      v-show='["frontN", "behindN", "someCharAfterIndexM", "someCharBeforeIndexM", "someAfterStr", "someBeforeStr"].includes(position)'
      style="width: 220px;" v-model="strLengh" :min="0" placeholder="设置 N 的取值"></el-input-number>
  </div>
  <el-input class="insert-text" v-model="insertText" placeholder="新字符串（如果是删除，则这里留空）"></el-input>
</template>

<script lang="ts" setup>

const positionOptions = [{
  label: "指定字符串 XX",
  value: "string"
}, {
  label: "前 N 个字符",
  value: "frontN"
}, {
  label: "后 N 个字符",
  value: "behindN"
}, {
  label: "第 M 位置后的 N 个字符",
  value: "nCharAfterIndexM"
}, {
  label: "倒数 M 位置前的 N 个字符",
  value: "nCharBeforeIndexM"
},
{
  label: "XX 字符串后面的所有字符",
  value: "allAfterStr"
},
{
  label: "XX 字符串前面的所有字符",
  value: "allBeforeStr"
}, {
  label: "XX 字符串后面的 N 个字符",
  value: "nAfterStr"
},
{
  label: "XX 字符串前面的 N 个字符",
  value: "nBeforeStr"
}]

const position = ref("")
const postionIndex = ref()
const strLengh = ref()
const postionStr = ref("")
const insertText = ref("")

const emits = defineEmits(["submit"])

watchEffect(() => {
  const options = {
    position: position.value,
    m: postionIndex.value,
    n: strLengh.value,
    from: postionStr.value,
    to: insertText.value
  }
  emits("submit", options)
})

</script>

<style lang="less" scoped>
.postion-select {
  display: flex;
  align-items: center;

  &>* {
    margin-right: 12px;
  }
}

.insert-text {
  margin-top: 8px;
  max-width: 460px;
}
</style>


