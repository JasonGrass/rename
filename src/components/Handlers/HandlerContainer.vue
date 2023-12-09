<template>
  <div>
    <el-checkbox class="enable-handler" v-model="enabled" label="启用规则" border></el-checkbox>

    <KeepAlive>
      <component :is="currentHandler?.component" @submit="onRenameHandlerSubmit"></component>
    </KeepAlive>

  </div>
</template>

<script lang="ts" setup>
import { useFileStore } from "@/store/files"
import { storeToRefs } from "pinia"

import HandlerFactory from '@/components/Handlers/HandlerFactory';
import { useRenameHandler } from './handler.flow';

// 动态组件，根据当前选中的重命名操作，显示对应 UI
const { currentHandler } = defineProps<{
  currentHandler?: IRenameHandler
}>()

const handlers = HandlerFactory.handlers
const { debounceRename } = useRenameHandler()

// 判断当前选中的重命名操作，是否可用
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

// 重命名操作的配置变更之后，重新计算文件名预览
const onRenameHandlerSubmit = (options: any) => {
  debounceRename(options)
}

// 文件列表发生变化时，更新重命名预览
const fileStore = useFileStore()
const { filteredFiles } = storeToRefs(fileStore)
watch(filteredFiles, () => {
  debounceRename(undefined)
})

</script>

<style lang="less" scoped>
.enable-handler {
  margin: 4px 0 12px 0;
}
</style>
