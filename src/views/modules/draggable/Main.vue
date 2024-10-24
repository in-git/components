<template>
  <div class="p-4 h-full" @contextmenu="e => (evt = e)">
    <div class="flex gap-4 mb-4">
      <History v-model:data="frameList" />
      <a-button type="primary" @click="create">添加</a-button>
    </div>
    <div class="flex gap-2 h-full bg-white">
      <div class="w-[300px] overflow-hidden p-2">
        <h1 class="mb-2">菜单</h1>
        <Tree @select="onSelected" v-model:selectedKeys="selected" :data="frameList"></Tree>
      </div>
      <div class="w-full h-full relative" id="test-parent" ref="parentEl">
        <DraggableGroup
          :parent="config.parent"
          @dragging="dragging"
          @onClick="activated"
          :config="config"
          @mousedown="mousedown"
          @dragstop="dragstop"
          :data="frameList"
        ></DraggableGroup>
        <Line :data="lines" />
      </div>
      <Contextmenu :data="menuItems" :evt="evt" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { addSelected, createNode, current, frameList, menuItems, selected } from './data';

import { config } from './config';
import Line from './assist/Line.vue';
import { lines, renderHorizontalLine, renderVerticalLine } from './assist/utils';

const evt = ref<MouseEvent>();
const parentEl = ref<HTMLElement>();

const mousedown = (item: Draggable) => {
  current.value = item;
};
const dragstop = () => {
  lines.value = [];
};
const onSelected = (item: Draggable) => {
  addSelected(item);
};
const activated = (item: Draggable) => {
  addSelected(item);
};

const dragging = () => {
  frameList.value.forEach(v => {
    renderVerticalLine(v);
    renderHorizontalLine(v);
  });
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
