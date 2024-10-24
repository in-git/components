<template>
  <div>
    <VueDrag
      v-for="item in data"
      v-model:x="item.x"
      v-model:y="item.y"
      v-model:w="item.w"
      v-model:h="item.h"
      :z-index="item.z"
      :key="item.id"
      :draggable="item.draggable"
      :resizable="item.resizable"
      :id="item.id"
      :onDeactivated="onDeactivated(item)"
      @activated="activated(item)"
      @mousedown.stop="onMousedown(item)"
      :axis="item.axis"
      :disableUserSelect="config.disableUserSelect"
      :grid="[config.grid.x, config.grid.y]"
      :showGrid="config.showGrid"
      :scale="config.scale"
      :active="item.active"
      :dragHandle="item.dragHandle"
      :handlesType="config.handlesType || 'borders'"
      :handles="item.handles"
      :lockAspectRatio="item.lockAspectRatio"
      :enableNativeDrag="config.enableNativeDrag"
      :activeOnHover="config.activeOnHover"
      :preventDeactivation="item.preventDeactivation"
      :classNameDraggable="config.classNameDraggable"
      class="drag-class"
      @click="onClick(item)"
      :parent="parent"
      @dragging="dragging"
      @dragstop="dragstop"
      :handlesSize="config.handlesSize || 4"
      :classNameActive="config.classNameActive || 'draggable-active'"
    >
      <template v-if="!item.children || item.children.length === 0">
        <slot></slot>
      </template>
      <div v-else>
        <DraggableGroup :data="item.children" :parent="getParent(item)" :config="config">
          <slot></slot>
        </DraggableGroup>
      </div>
    </VueDrag>
  </div>
</template>

<script setup lang="ts">
import VueDrag from 'draggable-resizable-vue3';

const emit = defineEmits([
  'deactivated',
  'activated',
  'onClick',
  'dragging',
  'mousedown',
  'dragstop',
]);
defineProps<{
  data: Draggable[];
  config: DraggableConfig;
  parent?: string | boolean;
}>();

const onMousedown = (item: Draggable) => {
  emit('mousedown', item);
};

const onDeactivated = (item: Draggable) => {
  emit('deactivated', item);
};
const dragstop = () => {
  emit('dragstop');
};
const activated = (item: Draggable) => {
  emit('activated', item);
};
const dragging = (x: number, y: number) => {
  emit('dragging', x, y);
};
const onClick = (item: Draggable) => {
  emit('onClick', item);
};

const getParent = (item: Draggable) => {
  if (typeof item.parent === 'boolean') {
    return item.parent;
  } else {
    return `#${item.id}`;
  }
};
</script>

<style lang="scss" scoped>
.draggable-active {
  outline: 1px solid var(--primary) !important;
}
.drag-class {
  outline: 1px solid transparent;
  border-style: solid;
}
:deep(.drv-borders) {
  z-index: 100;
  .drv-handle {
    background: transparent;

    &:hover {
      background: rgb(16, 188, 231);
    }
  }
  .drv-handle-mr {
    border-radius: 4px;
    transform: translate(100%, 0);
  }
  .drv-handle-ml {
    border-radius: 4px;
    transform: translate(-100%, 0);
  }
  .drv-handle-tm {
    border-radius: 4px;
    transform: translate(0, -100%) !important;
  }
  .drv-handle-bm {
    border-radius: 4px;
    transform: translate(0, 100%) !important;
  }
}
</style>
