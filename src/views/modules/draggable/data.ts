import { nanoid } from 'nanoid';
import { config } from './config';
import { addHistory } from '@/components/history/history';
import { useCloned } from '@vueuse/core';

export const frameList = ref<Draggable[]>([]);

export const selected = ref<Draggable[]>([]);

export const current = ref<Draggable>();
export const addSelected = (item: Draggable) => {
  if (config.value.multipleSelect) {
    const target = selected.value.findIndex(e => {
      return e.id === item.id;
    });
    if (target === -1) {
      selected.value.push(item);
    } else {
      selected.value = selected.value.filter(e => e.id !== item.id);
    }
  } else {
    selected.value = [item];
  }
};

export const createNode = () => {
  frameList.value.push({
    w: 60,
    h: 60,
    x: 60,
    y: 60,
    name: '新节点',
    id: nanoid(),
  });
  addHistory({
    name: '创建图形',
    data: useCloned(frameList.value).cloned.value,
  });
};
export const menuItems: ContextmenuProps[] = [
  {
    type: 'menu',
    title: '上移一层',
  },
  {
    type: 'menu',
    title: '下移一层',
  },
  {
    type: 'menu',
    title: '插件中心',
  },
];
