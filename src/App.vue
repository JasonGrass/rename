<script setup lang="ts">

</script>

<template>
  <Header></Header>

  <div class="body">
    <HandlerMenu class="menu"></HandlerMenu>
    <Operations class="operation"></Operations>
  </div>
</template>

<style scoped>
.body {
  display: flex;
  margin-right: 8px;
}

.menu {
  min-width: 180px;
  margin: 0 12px 0 0;

}

.operation {
  flex: 1 1 0%
}
</style>
