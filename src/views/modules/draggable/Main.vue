<template>
  <div class="p-4 h-full" @contextmenu="e => (evt = e)">
    <div class="flex gap-4 mb-4">
      <History />
      <a-button type="primary" @click="create">添加</a-button>
    </div>
    <div class="flex gap-4 h-full">
      <div class="w-[300px] overflow-hidden">
        <Tree @select="onSelected" v-model:selectedKeys="selected" :data="frameList"></Tree>
      </div>
      <div class="w-full h-full" id="test-parent" ref="parentEl">
        <DraggableGroup
          :parent="config.parent"
          @dragging="dragging"
          @onClick="activated"
          :config="config"
          @mousedown="mousedown"
          :data="frameList"
        ></DraggableGroup>
      </div>
      <Contextmenu :data="menuItems" :evt="evt" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { addSelected, createNode, current, frameList, menuItems, selected } from './data';

import { config } from './config';

const evt = ref<MouseEvent>();
const parentEl = ref<HTMLElement>();

const mousedown = (item: Draggable) => {
  current.value = item;
};

const onSelected = (item: Draggable) => {
  addSelected(item);
};
const activated = (item: Draggable) => {
  addSelected(item);
};

const dragging = () => {
  if (current.value) {
  }
};

const create = () => {
  createNode();
};
</script>

<style lang="scss" scoped>
.test {
  box-sizing: content-box;
}
</style>
