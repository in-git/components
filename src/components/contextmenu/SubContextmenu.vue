<template>
  <ul class="p-2 bg-white subs" v-show="data.length > 0" ref="subRef">
    <template v-for="item in data">
      <li
        class=" relative"
        @click="onClick(item)"
        :class="{ 'pointer-events-none text-gray-400 ': item.disabled }"
      >
        <div
          v-if="item.type === 'menu'"
          class="hover:bg-blue-100 h-[32px] flex items-center icon justify-between cursor-pointer items"
        >
          <div class="w-[24px] h-[24px] mx-2 flex justify-center">
            <component :is="item.icon" v-if="item.icon"></component>
          </div>
          <div class="flex-1">{{ item.title }}</div>
          <div v-if="item.children && item.children.length > 0">
            <div class="icon w-[24px] h-[24px] flex items-center">
              <CaretRightOutlined />
            </div>
          </div>
          <div
            class="subs-contextmenu absolute w-full"
            :class="[position]"
            v-if="item.children && item.children.length > 0"
          >
            <SubContextmenu v-model:position="position" :data="item.children"></SubContextmenu>
          </div>
        </div>
        <a-divider
          v-else
          :style="{ margin: '.5rem 1rem' }"
          orientation="left"
          class="pointer-events-none"
        >
          <span class="text-[12px] text-gray-400">
            {{ item.title }}
          </span>
        </a-divider>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
const emit = defineEmits(['visible']);
const position = defineModel<string>('position');
const subRef = ref<HTMLDivElement>();

defineProps<{
  data: ContextmenuProps[];
}>();

const onClick = (item: ContextmenuProps) => {
  item.onClick && item.onClick();
  emit('visible', false);
};
console.log(position.value);

</script>

<style lang="scss" scoped>
.subs {
  box-shadow: 0px 0px 5px #9694940a;
  border-radius: var(--radius);
}
.subs-contextmenu {
  opacity: 0;
}
.items {
  &:hover {
    & > .subs-contextmenu {
      opacity: 1;
    }
  }
}
</style>
