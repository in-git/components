import { nanoid } from 'nanoid';
import { config } from './config';

export const list = ref<Draggable[]>([
  {
    w: 100,
    h: 100,
    x: 400,
    y: 400,
    id: nanoid(),
    parent: false,
    z: 1,
    name: 'Frame 1',
    children: [
      {
        name: '子元素Frame',
        w: 40,
        h: 40,
        x: 0,
        y: 0,
        id: nanoid(),
        z: 1,
      },
    ],
  },
  {
    w: 40,
    h: 40,
    x: 10,
    y: 10,
    id: nanoid(),
    z: 2,
    parent: false,
    name: 'Frame 2',
  },
  {
    w: 40,
    h: 40,
    x: 60,
    y: 60,
    id: nanoid(),
    z: 3,
    parent: false,
    name: 'Frame 3',
  },
]);

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

export const createNode = () => {};
