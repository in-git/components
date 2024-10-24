import { nanoid } from 'nanoid';

export const historyList = ref<RedoHistory[]>([]);

export const pointer = ref(-1);

export const addHistory = (item: RedoHistory) => {
  item.id = nanoid();
  historyList.value.push(item);
  pointer.value++;
};
/* 撤销 */
export const redoHistory = () => {
  if (pointer.value > 0) {
    pointer.value--;
  }
  return historyList.value[pointer.value].data;
};

export const undoHistory = () => {
  if (pointer.value < historyList.value.length - 1) {
    pointer.value++;
  }
  return historyList.value[pointer.value].data;
};
