<template>
  <div>
    <div class="flex">
      <a-button>分组</a-button>
      <a-input-number class="w-fit" v-model:value="stageConfig.scale"></a-input-number>

      <div v-if="current && typeof current.parent === 'boolean'">
        限制出界
        <a-checkbox v-model:checked="current.parent"></a-checkbox>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { stageConfig } from './data/config';
import { current } from './data/data';
</script>

<style lang="scss" scoped></style>
