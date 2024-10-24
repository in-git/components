import { addHistory } from '@/components/history/history';
import { stageConfig } from './config';
import { current, frameList } from './data';
import { useCloned } from '@vueuse/core';

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
  }
};
export const createHistory = (name: string) => {
  addHistory({
    name,
    time: new Date().toLocaleDateString(),
    data: useCloned(frameList.value).cloned.value,
  });
};
