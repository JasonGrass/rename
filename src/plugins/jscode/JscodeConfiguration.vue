<template>
  <div>
    <codemirror v-model="code" :style="{ height: '400px' }" :autofocus="true" :indent-with-tab="true" :tab-size="2"
      :extensions="extensions" @ready="handleReady" @change="onCodeChange($event)" />
  </div>
</template>

<script lang="ts" setup>
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { espresso } from 'thememirror';

const code = ref(`// 在这里自定义重命名的 js 代码
/**
 * 参数说明: options 一个对象，包含单个文件的信息，
 * name(string): 文件名，默认不包含后缀名，如果勾选了 "同时处理后缀名" 则包含后缀名
 * nameWithoutExt(string): 文件名，不包含后缀名
 * extension(string): 后缀名，包括 "."
 * modifyTime(number): 文件修改时间，毫秒时间戳
 * size(number): 文件大小，字节
 * index(number): 文件在表格中显示的序号
 *
 * 返回值：新文件名(字符串类型)，返回空值会忽略重命名操作
 * 注意：默认应该返回不包含后缀名的文件名，如果勾选了 "同时处理后缀名" ，则返回包含后缀名的文件名
*/
function rename(options){
  const {name, nameWithoutExt, extension, modifyTime, size, index} = options
  // your code here. tips: 如果代码逻辑较为复杂，建议使用 vscode 编辑完成之后，复制粘贴过来
  return name
}

/**
 * 安全性声明
 * 本网站是一个静态站点，所有操作都在本地运行，没有服务器，不会收集您的数据。
 * 但是如果您使用了不安全的自定义重命名代码，则可能会造成数据泄漏。
 * 如果您使用的是其他人提供的自定义重命名代码，请核实代码的安全性。
 * 安全的代码应仅包含对文件名处理的字符串处理逻辑。
*/
`)

const extensions = [javascript(), espresso]

// Codemirror EditorView instance ref
const view = shallowRef()
const handleReady = (payload: any) => {
  view.value = payload.view
}

const emits = defineEmits(["submit"])
const onCodeChange = (code: string) => {
  const options = {
    code
  }
  emits("submit", options)
}

</script>

<style lang="less" scoped></style>
