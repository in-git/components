<template>
  <div class="fixed bg-white min-w-[240px]" :style="style" v-if="visible">
    <ul class="p-2">
      <li
        class="flex items-center justify-between h-[32px] hover:bg-blue-100"
        v-for="item in list"
        @click="onClick(item)"
      >
        <div class="icon w-[24px] h-[24px]">
          <component :is="item.icon" v-if="item.icon"></component>
        </div>
        <div class="flex-1">{{ item.title }}</div>
        <div>
          <div class="icon w-[24px] h-[24px] flex items-center">
            <CaretRightOutlined />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const position = ref({
  left: 0,
  top: 0,
});

const visible = ref();

const onClick = (item: ContextmenuProps) => {
  item.onClick && item.onClick();
  visible.value = false;
};
const list = ref<ContextmenuProps[]>([
  {
    title: '标题-1',
    icon: '',
    children: [],
    onClick() {
      console.log('Click');
    },
  },
]);

const style = computed(() => {
  return {
    left: `${position.value.left}px`,
    top: `${position.value.top}px`,
  };
});
const contextmenu = (e: MouseEvent) => {
  position.value.left = e.x;
  position.value.top = e.y;
  visible.value = true;
  e.preventDefault();
};

document.addEventListener('contextmenu', contextmenu);
</script>

<style lang="scss" scoped></style>
