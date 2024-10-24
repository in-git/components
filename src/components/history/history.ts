import { nanoid } from 'nanoid';

export const historyList = ref<RedoHistory[]>([]);

export const pointer = ref(0);

export const addHistory = (item: RedoHistory) => {
  item.id = nanoid();
  historyList.value.push(item);
  pointer.value++;
};

export const redo = <T>(data: RedoHistory<T>): T => {
  return data.data[pointer.value];
};

export const undo = <T>(data: RedoHistory<T>): T => {
  return data.data[pointer.value - 1];
};
