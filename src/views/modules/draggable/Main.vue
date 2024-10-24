<template>
  <div class="p-4 h-full" @contextmenu="e => (evt = e)">
    <div class="flex gap-4 mb-4">
      <History v-model:data="frameList" />
      <a-button type="primary" @click="create">添加</a-button>
    </div>
    <div class="flex gap-2 h-full">
      <div class="w-[300px] overflow-hidden p-2 bg-white">
        <h1 class="mb-2">菜单</h1>
        <Tree @select="onSelected" v-model:selectedKeys="selected" :data="frameList"></Tree>
      </div>
      <div class="w-full h-full bg-white flex justify-center items-center">
        <div :style="style" class="bg-white relative" id="test-parent" ref="parentEl">
          <DraggableGroup
            :parent="stageConfig.parent"
            @dragging="dragging"
            @onClick="activated"
            :config="stageConfig"
            @mousedown="mousedown"
            @dragstop="dragstop"
            :data="frameList"
          ></DraggableGroup>
          <Line :data="lines" />
        </div>
      </div>
      <Contextmenu :data="menuItems" :evt="evt" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { addSelected, createNode, current, frameList, menuItems, selected } from './data/data';

import { stageConfig } from './data/config';
import './data/event';
import Line from './assist/Line.vue';
import { lines, renderHorizontalLine, renderVerticalLine } from './data/utils';
import { createHistory } from './data/operation';

const evt = ref<MouseEvent>();
const parentEl = ref<HTMLElement>();

const mousedown = (item: Draggable) => {
  current.value = item;
};
const dragstop = () => {
  lines.value = [];
  createHistory('移动图形');
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

const style = computed(() => {
  return {
    width: stageConfig.value.width + 'px',
    height: stageConfig.value.height + 'px',
  };
});
</script>

<style lang="scss" scoped>
.test {
  box-sizing: content-box;
}
#test-parent {
  border: 1px solid var(--border-color);
}
</style>
