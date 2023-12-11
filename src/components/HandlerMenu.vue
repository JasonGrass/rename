<template>
  <div>

    <el-menu default-active="0" @select="onMenuSelected">

      <el-menu-item v-for="(handler, index) of handlers" :index="index.toString()">
        <el-icon>
          <SetUp />
        </el-icon>
        <span>{{ handler.title }}</span>
        <span class="dot" v-show="handler.enable">
        </span>
      </el-menu-item>

      <!--
      <el-menu-item index="0">
        <el-icon>
          <SetUp />
        </el-icon>
        <span>替换字符</span>
      </el-menu-item>
      <el-menu-item index="1">
        <el-icon>
          <SetUp />
        </el-icon>
        <span>删除字符</span>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon>
          <SetUp />
        </el-icon>
        <span>新增/插入字符</span>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon>
          <SetUp />
        </el-icon>
        <span>转换字符</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon>
          <SetUp />
        </el-icon>
        <span>全新命名</span>
      </el-menu-item>
      <el-menu-item index="5">
        <el-icon>
          <SetUp />
        </el-icon>
        <span>后缀名处理</span>
      </el-menu-item> -->

    </el-menu>

  </div>
</template>

<script lang="ts" setup>
import { SetUp } from '@element-plus/icons-vue';
import HandlerFactory from '@/lib/handler/HandlerFactory';

const handlers = HandlerFactory.handlers

const onMenuSelected = (index: string) => {
  const current = handlers[Number(index)]
  if (!current) {
    return
  }
  handlers.forEach(h => h.active = false)
  current.active = true
}

onMounted(() => {
  handlers[0].active = true
})

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
