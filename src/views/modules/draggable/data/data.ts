import { stageConfig } from './config';

export const frameList = ref<Draggable[]>([]);
export const hoverTarget = ref<string>('');
export const selected = ref<Draggable[]>([]);

export const current = ref<Draggable>();

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
