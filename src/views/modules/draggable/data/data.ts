import { nanoid } from 'nanoid';
import { addHistory } from '@/components/history/history';
import { useCloned, useDateFormat, useNow } from '@vueuse/core';
import { stageConfig } from './config';
import { getCurrentTime } from '@/utils/common/bin';

export const frameList = ref<Draggable[]>([]);

export const selected = ref<Draggable[]>([]);

export const current = ref<Draggable>();

export const addSelected = (item: Draggable) => {
  if (stageConfig.value.multipleSelect) {
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
    time: getCurrentTime(),
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
