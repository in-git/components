<template>
  <div class="flex justify-center flex-col items-center h-full" @contextmenu="parentClick">
    <h1 class="text-[2rem]">鼠标右键能删除元素</h1>
    <div class="my-4">必须在高亮处点击</div>
    <div class="my-4">灰色区的右键菜单和其他区域的不相同</div>
    <div class="my-4"></div>
    <ul class="w-[400px] bg-gray-200">
      <li
        v-for="(item, key) in list"
        :key="item"
        class="flex justify-between mb-4 items-center hover:bg-blue-200"
        @contextmenu.stop="onContextmneu(key)"
      >
        <span>{{ item }}</span>
        <a-button @click="del(key)">删除</a-button>
      </li>
    </ul>
    <Contextmenu :data="menuItems" :evt="evt" />
  </div>
</template>

<script setup lang="ts">
import { EyeOutlined } from '@ant-design/icons-vue';
import { contextmenuItems } from './contextmenu';
import { Modal } from 'ant-design-vue';

const evt = ref<MouseEvent>();
const menuItems = ref(contextmenuItems);
const current = ref(-1);
const items: ContextmenuProps[] = [
  {
    title: '删除',
    onClick() {
      del(current.value);
    },
    type: 'menu',
  },
  {
    title: '查看',
    icon: h(EyeOutlined),
    onClick() {
      alert(`查看了第${current.value + 1}号元素`);
    },
    type: 'menu',
  },
  {
    title: '测试',
    onClick() {
      alert(`测试了第${current.value + 1}号元素`);
    },
    type: 'menu',
  },
  {
    title: '弹出模态框',
    onClick() {
      Modal.success({
        content: '成了',
      });
    },
    type: 'menu',
  },
];
const parentClick = (e: MouseEvent) => {
  evt.value = e;
  menuItems.value = contextmenuItems;
};
const del = (k: number) => {
  current.value = k;
  list.value = list.value.filter((_, k) => current.value !== k);
};

const onContextmneu = (k: number) => {
  const e = window.event as MouseEvent;
  evt.value = e;
  menuItems.value = items;
  current.value = k;
};
const list = ref(['数据1', '数据2', '数据3', '数据4', '数据5', '数据6', '数据7']);
</script>

<style lang="scss" scoped></style>
