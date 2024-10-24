import { onKeyStroke, useMagicKeys } from '@vueuse/core';
import { createHistory, delCurrent, moveX, moveY } from './operation';
import { redoHistory, undoHistory } from '@/components/history/history';
import { redoFrame, undoFrame } from './history';
const { Ctrl_Z, Ctrl_Y } = useMagicKeys();

onKeyStroke('ArrowDown', e => {
  e.preventDefault();
  moveY(1);
  createHistory('移动图形');
});

onKeyStroke('ArrowUp', e => {
  e.preventDefault();
  moveY(-1);
  createHistory('移动图形');
});

onKeyStroke('ArrowLeft', e => {
  e.preventDefault();
  moveX(-1);
  createHistory('移动图形');
});

onKeyStroke('ArrowRight', e => {
  e.preventDefault();
  moveX(1);
  createHistory('移动图形');
});

onKeyStroke('Delete', e => {
  delCurrent();
  createHistory('删除图形');
});

watch(Ctrl_Z, v => {
  if (v) {
    redoFrame();
  }
});
watch(Ctrl_Y, v => {
  if (v) {
    undoFrame();
  }
});
