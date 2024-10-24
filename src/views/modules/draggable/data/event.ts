import { onKeyStroke, useEventListener, useMagicKeys } from '@vueuse/core';
import { createHistory, delCurrent, moveX, moveY } from './operation';
import { redoFrame, undoFrame } from './history';
import { stageConfig } from './config';
const { Ctrl_Z, Ctrl_Y, Space } = useMagicKeys();

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

watch(Space, v => (stageConfig.value.allowDrag = v));
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

export const stageWheelEvent = (e: WheelEvent) => {
  if (e.deltaY < 0) {
    if (stageConfig.value.scale <= 0.6) return;
    stageConfig.value.scale -= 0.1;
  } else {
    if (stageConfig.value.scale >= 2) return;
    stageConfig.value.scale += 0.1;
  }
};
