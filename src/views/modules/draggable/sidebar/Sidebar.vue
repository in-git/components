<template>
  <div class="w-[300px] overflow-hidden px-2 bg-white">
    <a-tabs>
      <a-tab-pane key="component" tab="组件"></a-tab-pane>
      <a-tab-pane key="layer" tab="图层">
        <DraggableTree
          @select="onSelected"
          @mouseenter="mouseenter"
          @mouseleave="mouseleave"
          v-model:selectedKeys="selected"
          :data="frameList"
          :hoverTarget="hoverTarget"
        ></DraggableTree>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { frameList, hoverTarget, selected } from '../data/data';
import { addSelected } from '../data/operation';
import DraggableTree from './DraggableTree.vue';

const onSelected = (item: Draggable) => {
  addSelected(item);
};

const mouseleave = () => {
  hoverTarget.value = '';
};

const mouseenter = (item: Draggable) => {
  if (item.id) {
    hoverTarget.value = item.id;
  }
};
</script>

<style lang="scss" scoped></style>
