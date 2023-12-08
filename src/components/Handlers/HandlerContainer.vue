<template>
  <div>
    <el-checkbox v-model="enabled" label="启用规则" border></el-checkbox>

    <KeepAlive>
      <component :is="currentHandler?.component" @submit="onRenameHandlerSubmit"></component>
    </KeepAlive>

  </div>
</template>

<script lang="ts" setup>
import _ from 'lodash';

import { useFileStore } from "@/store/files"
import { getFilenameWithoutExtension, getExtension } from "@/utils/file"

import HandlerFactory from '@/components/Handlers/HandlerFactory';
import { storeToRefs } from 'pinia';
const handlers = HandlerFactory.handlers

const { currentHandler } = defineProps<{
  currentHandler?: IRenameHandler
}>()

const fileStore = useFileStore()
const { filteredFiles } = storeToRefs(fileStore)

const enabled = computed({
  get: () => {
    const h = handlers.find(h => h.active)
    return h?.enable ?? false
  },
  set: (v) => {
    const h = handlers.find(h => h.active)
    if (h) {
      h.enable = v
    }
    debounceRename(undefined)
  }
})

const onRenameHandlerSubmit = (options: any) => {
  debounceRename(options)
}

watch(filteredFiles, () => {
  debounceRename(undefined)
})

const rename = (options: any) => {
  const activeHandler = handlers.find(h => h.active)
  if (activeHandler && options) {
    activeHandler.setOptions(options)
  }

  fileStore.renamePreview((file) => {
    const ctx = {
      name: getFilenameWithoutExtension(file.name),
      extension: getExtension(file.name),
      file: file
    }

    for (const handler of handlers) {
      if (!handler.enable) {
        continue
      }

      if (handler.active) {
        handler.rename(ctx, options)
      }
      else {
        handler.rename(ctx, undefined)
      }
    }
    return ctx.name + ctx.extension
  })

}

const debounceRename = _.debounce((options) => {
  rename(options)
}, 500)

</script>

<style lang="scss" scoped></style>
