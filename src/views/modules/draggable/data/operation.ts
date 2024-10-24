import { addHistory } from '@/components/history/history';
import { stageConfig } from './config';
import { current, frameList, selected } from './data';
import { useCloned } from '@vueuse/core';
import { getCurrentTime } from '@/utils/common/bin';
import { nanoid } from 'nanoid';

export const moveX = (direction: 1 | -1) => {
  if (current.value) {
    current.value.x += stageConfig.value.grid.x * direction;
  }
};

export const moveY = (direction: 1 | -1) => {
  if (current.value) {
    current.value.y += stageConfig.value.grid.y * direction;
  }
};

export const delCurrent = () => {
  if (current.value) {
    frameList.value = frameList.value.filter(e => e.id !== current.value!.id);
    current.value = undefined;
  }
};

export const createHistory = (name: string) => {
  addHistory({
    name,
    time: getCurrentTime(),
    data: useCloned(frameList.value).cloned.value,
  });
};
export const copyFrame = () => {
  if (current.value) {
    const cloneObj = useCloned(current.value).cloned.value;
    frameList.value.push(cloneObj);
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
    z: getMaxZIndex(),
  });
  createHistory('创建图形');
};
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

export const getMaxZIndex = () => {
  if (frameList.value.length === 0) return 0;
  return Math.max(...frameList.value.map(e => e.z!)) + 1;
};
