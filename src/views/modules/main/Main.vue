<template>
  <div class="p-4">
    <Toolbar />
    <div class="flex gap-4">
      <div class="w-[300px] overflow-hidden">
        <DraggableTree
          @select="onSelected"
          v-model:selectedKeys="selected"
          :data="list"
        ></DraggableTree>
      </div>
      <div class="w-full h-[600px]" id="test-parent" ref="parentEl">
        <DraggableGroup
          :parent="config.parent"
          @dragging="dragging"
          @onClick="activated"
          :config="config"
          @mousedown="mousedown"
          :data="list"
        ></DraggableGroup>
      </div>
    </div>
    <Contextmenu />
  </div>
</template>

<script setup lang="ts">
import { addSelected, current, list, selected } from './data';
import Toolbar from './Toolbar.vue';

import { config } from './config';

const parentEl = ref<HTMLElement>();

const mousedown = (item: Draggable) => {
  current.value = item;
};

const onSelected = (item: Draggable) => {
  addSelected(item);
};
const activated = (item: Draggable) => {
  item.active = true;
  addSelected(item);
};

const dragging = () => {
  if (current.value) {
    list.value.forEach(e => {});
  }
};
</script>

<style lang="scss" scoped>
.test {
  box-sizing: content-box;
}
</style>
