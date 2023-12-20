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

import template from './template';

const code = ref(template)

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
