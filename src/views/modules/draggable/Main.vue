<template>
  <div class="p-4 h-full" @contextmenu="e => (evt = e)" @wheel="stageWheelEvent">
    <div class="flex gap-4 mb-4">
      <History v-model:data="frameList" />
      <a-button type="primary" @click="create">添加</a-button>
    </div>
    <div class="flex gap-2 h-full" @mousedown.stop="onMousedown">
      <Sidebar />
      <div class="w-full h-full bg-gray-50 overflow-hidden" ref="parentEl">
        <div :style="style" class="bg-white relative" id="test-parent">
          <DraggableContainer
            :hover-target="hoverTarget"
            :parent="stageConfig.parent"
            @dragging="dragging"
            @onClick="activated"
            :config="stageConfig"
            @mousedown="mousedown"
            @mouseleave="clearHoverTarget"
            @dragstop="dragstop"
            @mouseenter="draggableMouseEnter"
            :data="frameList"
          ></DraggableContainer>
          <Line :data="lines" />
        </div>
      </div>

      <Contextmenu :data="menuItems" :evt="evt" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { current, frameList, hoverTarget, menuItems, selected } from './data/data';

import { stageConfig } from './data/config';
import './data/event';
import Line from './assist/Line.vue';
import { lines, renderHorizontalLine, renderVerticalLine } from './data/line.utils';
import { addSelected, createHistory, createNode } from './data/operation';
import { CSSProperties } from 'vue';
import { stageWheelEvent } from './data/event';
import Sidebar from './sidebar/Sidebar.vue';

const evt = ref<MouseEvent>();
const parentEl = ref<HTMLElement>();
const mouseOffset = {
  x: 0,
  y: 0,
};
const mousedown = (item: Draggable) => {
  current.value = item;
};
const draggableMouseEnter = (item: Draggable) => {
  hoverTarget.value = item.id!;
};

onMounted(() => {
  if (parentEl.value) {
    const domRect = parentEl.value.getBoundingClientRect();
    stageConfig.value.left = Math.floor(domRect.width / 2 - stageConfig.value.width / 2);
    stageConfig.value.top = domRect.height / 2 - stageConfig.value.height / 2;
  }
});
const clearHoverTarget = () => {
  hoverTarget.value = '';
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
const onMousedown = (e: MouseEvent) => {
  if (!stageConfig.value.allowDrag) return;

  mouseOffset.x = e.x;
  mouseOffset.y = e.y;
  const mousemove = (me: MouseEvent) => {
    let left = me.x - mouseOffset.x;
    let top = me.y - mouseOffset.y;
    stageConfig.value.left += left;
    stageConfig.value.top += top;
    mouseOffset.x = me.x;
    mouseOffset.y = me.y;
    console.log(left);
  };
  const mouseup = () => {
    document.removeEventListener('mousemove', mousemove);
  };
  document.addEventListener('mousemove', mousemove);
  document.addEventListener('mouseup', mouseup);
  e.preventDefault();
};
const style = computed((): CSSProperties => {
  return {
    width: stageConfig.value.width + 'px',
    height: stageConfig.value.height + 'px',
    transform: `scale(${stageConfig.value.scale})
    translate(${stageConfig.value.left / stageConfig.value.scale}px, ${stageConfig.value.top / stageConfig.value.scale}px)`,
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
