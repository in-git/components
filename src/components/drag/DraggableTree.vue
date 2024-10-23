<template>
  <div ref="elRef">
    <div v-for="item in data">
      <div>
        <div
          class="flex items-center cursor-pointer tree-item py-1 hover:bg-blue-100"
          :class="{ active: include(item) }"
          @click.stop="selectNode(item)"
          :style="{ paddingLeft: `${(deep || 0) * 0.5}rem` }"
        >
          <div class="w-[18px] h-[18px] ml-2" @click="item.expand = !item.expand">
            <CaretRightOutlined
              v-if="item.children && item.children.length > 0"
              class="text-[12px] text-gray-300 tree-icon"
              :rotate="item.expand ? 90 : 0"
            />
          </div>
          <div class="flex-1">{{ item.name }}</div>
          <div class="flex actions mr-2">
            <EditOutlined />
          </div>
        </div>
        <template v-if="item.expand">
          <DraggableTree
            class="hover:bg-blue-100"
            :deep="getTreeDepth(item)"
            v-if="item.children"
            @select="selectChild"
            :data="item.children"
            :selected-keys="selectedKeys"
          ></DraggableTree>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCloned } from '@vueuse/core';
import { useSortable } from '@vueuse/integrations/useSortable';
import { getTreeDepth } from './utils';

const emit = defineEmits(['select']);

const elRef = ref();

const selectedKeys = defineModel<DraggableTree[]>('selectedKeys');

const props = defineProps<{
  data: DraggableTree[];
  deep?: number;
}>();

const include = (item: DraggableTree) => {
  if (!selectedKeys.value) return false;
  return (
    selectedKeys.value?.findIndex(v => {
      return item.id === v.id;
    }) !== -1
  );
};
const selectNode = (item: DraggableTree) => {
  emit('select', item);
};
const selectChild = (item: DraggableTree) => {
  nextTick(() => {
    emit('select', item);
  });
};
nextTick(() => {
  useSortable(elRef, useCloned(props.data).cloned.value, {
    animation: 200,
  });
});
</script>

<style lang="scss" scoped>
.tree-item {
  .actions {
    opacity: 0;
  }
  &:hover {
    .actions {
      opacity: 1;
    }
  }
}
.tree-icon {
  transition: all 0.2s;
}
.active {
  color: white;
  background: #75b8f7;
}
</style>
