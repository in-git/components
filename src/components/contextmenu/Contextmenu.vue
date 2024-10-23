<template>
  <div v-show="visible">
    <div class="fixed min-w-[240px]" :style="style" ref="elRef">
      <SubContextmenu v-model:position="menuPlacement" @visible="visible = false" :data="data" />
    </div>
  </div>
</template>

<script setup lang="ts" generic="ContextmenuConfig">
import { onClickOutside } from '@vueuse/core';

const menuPlacement = ref('left-full');
type ContextmenuConfig = {
  data: ContextmenuProps[];
  left?: number;
  top?: number;
  evt?: MouseEvent;
}
const props = defineProps<ContextmenuConfig>();
const elRef = ref<HTMLElement>();

const position = ref({
  left: 0,
  top: 0,
});

const visible = defineModel<boolean>('visible');

nextTick(() => {
  onClickOutside(elRef, () => {
    visible.value = false;
  });
});

const contextmenu = (e: MouseEvent) => {
  visible.value = true;
  position.value.left = e.x;
  position.value.top = e.y;
  nextTick(() => {
    if (elRef.value) {
      const domRect = elRef.value.getBoundingClientRect();
      if (domRect.width + domRect.left > innerWidth) {
        position.value.left = innerWidth - domRect.width;
        menuPlacement.value = 'right-full';
        return;
      }
      if (domRect.height + domRect.top > innerHeight) {
        position.value.top = innerHeight - domRect.height;
      }
      menuPlacement.value = 'left-full';
    }
  });
  e.preventDefault();
};

const style = computed(() => {
  return {
    left: `${position.value.left}px`,
    top: `${position.value.top}px`,
  };
});

watch(
  props,
  () => {
    position.value.left = props.left || 0;
    position.value.top = props.top || 0;

    if (props.evt) {
      contextmenu(props.evt);
    } else {
      document.addEventListener('contextmenu', contextmenu);
    }
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>

<style lang="scss" scoped>
.icon {
  border-radius: 6px;
}
.items {
  cursor: pointer;
}
</style>
