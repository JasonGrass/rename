<template>
  <div>

    <el-menu :default-active="defaultActiveItemId" @select="onMenuSelected">

      <Container @drop="onDrop">
        <Draggable v-for="handler of handlers" :key="handler.id">
          <el-menu-item :index="handler.id">
            <el-icon>
              <SetUp />
            </el-icon>
            <span>{{ handler.title }}</span>
            <span class="dot" v-show="handler.enable">
            </span>
          </el-menu-item>
        </Draggable>
      </Container>

    </el-menu>

  </div>
</template>

<script lang="ts" setup>
import { Container, Draggable } from "vue3-smooth-dnd";

import { SetUp } from '@element-plus/icons-vue';
import HandlerFactory from '@/lib/handler/HandlerFactory';
import { useRenameHandler } from './Operations/Handlers/handler.flow';

const { debounceRename } = useRenameHandler()

const handlers = ref<IRenameHandler[]>(HandlerFactory.handlers)
const defaultActiveItemId = ref("")

const onMenuSelected = (index: string) => {
  const current = handlers.value.find(h => h.id === index)
  if (!current) {
    return
  }
  handlers.value.forEach(h => h.active = false)
  current.active = true
}

onMounted(() => {
  const list = handlers.value
  if (list.length < 1) {
    return
  }
  list[0].active = true
  defaultActiveItemId.value = list[0].id
})

const onDrop = (dropResult: any) => {
  handlers.value = applyDrag(handlers.value, dropResult);
}

const applyDrag = (arr: IRenameHandler[], dragResult: any) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;
  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }
  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  let sortHint = 1
  for (const handler of result) {
    handler.sortHint = sortHint++
  }

  // 修改排序之后，执行一次重命名预览
  nextTick(() => {
    debounceRename(undefined)
  })

  return result;
}

</script>

<style lang="less" scoped>
.dot {
  position: relative;
  top: -5px;
  left: 3px;

  width: 6px;
  height: 6px;
  border-radius: 8px;
  background-color: #67C23A;

}
</style>
