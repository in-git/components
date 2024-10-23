<template>
  <div>
    <div class="flex">
      <a-button>分组</a-button>
      <a-input-number class="w-fit" v-model:value="config.scale"></a-input-number>

      <div v-if="current && typeof current.parent === 'boolean'">
        限制出界
        <a-checkbox v-model:checked="current.parent"></a-checkbox>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { config } from './config';
import { current } from './data';
</script>

<style lang="scss" scoped></style>
