<template>
  <div ref="elRef">
    <div v-for="item in data" :key="item.z">
      <div>
        <div
          class="flex items-center cursor-pointer tree-item py-1 hover:bg-blue-100"
          :class="[{ active: include(item) }, { 'bg-blue-100': item.id === hoverTarget }]"
          @click.stop="selectNode(item)"
          @mouseenter="mouseenter(item)"
          @mouseleave="mouseleave"
          :style="{ paddingLeft: `${(deep || 0) * 0.5}rem` }"
        >
          <div class="w-[18px] h-[18px] ml-2" @click="item.expand = !item.expand">
            <CaretRightOutlined
              v-if="item.children && item.children.length > 0"
              class="text-[12px] text-gray-300 tree-icon"
              :rotate="item.expand ? 90 : 0"
            />
          </div>
          <div class="flex-1">{{ item.name }}{{ item.z }}</div>
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
            @mouseenter="mouseenter"
            @mouseleave="mouseleave"
            :data="item.children"
            :hover-target="hoverTarget"
            :selected-keys="selectedKeys"
          ></DraggableTree>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getTreeDepth } from '@/utils/common/tree.utils';
import { useSortable } from '@vueuse/integrations/useSortable';

const emit = defineEmits(['select', 'mouseenter', 'mouseleave']);

const elRef = ref();

const selectedKeys = defineModel<Tree[]>('selectedKeys');
const data = defineModel<Tree[]>('data');
const props = defineProps<{
  deep?: number;
  hoverTarget: string;
}>();
console.log(props);

const mouseenter = (item: Tree) => {
  emit('mouseenter', item);
};
const mouseleave = (item: Tree) => {
  emit('mouseleave', item);
};
const include = (item: Tree) => {
  if (!selectedKeys.value) return false;
  return (
    selectedKeys.value?.findIndex(v => {
      return item.id === v.id;
    }) !== -1
  );
};
const selectNode = (item: Tree) => {
  emit('select', item);
};
const selectChild = (item: Tree) => {
  nextTick(() => {
    emit('select', item);
  });
};
nextTick(() => {
  useSortable(elRef, data, {
    animation: 200,
  });
});
</script>

<style lang="scss" scoped>
.tree-item {
  border-radius: 2px;
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
