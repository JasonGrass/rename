<template>
  <div class="display-container">
    <el-tag class="display-item" v-for="item of filterDisplay" :key="item.message" :type='item.type' closable
      @close="() => onFilterDelete(item.filter)">{{
        item.message
      }}</el-tag>
  </div>
  <FileFilterSelector @submit="onFilterSubmit"></FileFilterSelector>
</template>

<script lang="ts" setup>
import { FileFilterItem } from '@/lib/filter/FileFilterItem';
import { useFilterStore } from '@/store/filters';

const filterStore = useFilterStore()

const filterDisplay: Ref<{ message: string, type: "success" | "warning" | "info" | "danger", filter: FileFilterItem }[]> = ref([])

const onFilterSubmit = (filter: FileFilterItem) => {
  try {
    filterStore.addFilter(filter)
  } catch (error: any) {
    ElMessage.error(error.message)
  }
}

const onFilterDelete = (filter: FileFilterItem) => {
  filterStore.removeFilter(filter)
}

watch([filterStore.filters, filterStore], () => {
  filterDisplay.value = filterStore.filters.map(f => ({
    message: f.toString(),
    type: f.type === "include" ? "success" : "warning",
    filter: f
  }))

}, {
  immediate: true
})



</script>

<style lang="less" scoped>
.display-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin: 12px 0 8px 0;
}

.display-item {
  margin-right: 12px;
}
</style>
