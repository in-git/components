<template>
  <a-layout class="h-[100vh]">
    <a-layout-header>页面标题</a-layout-header>
    <a-layout-content>
      <RouterView />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.ant-layout-header {
  color: white;
}
</style>
