import { stageConfig } from './config';
import { current } from './data';

export const lines = ref<AssistLine[]>([]);
const grid = stageConfig.value.grid.x;

const getTarget = (id: string) => {
  return lines.value.find(e => {
    if (e.id === id) {
      return e;
    }
    return null;
  });
};

export const renderHorizontalLine = (v: Draggable) => {
  if (!current.value || v.id === current.value.id) return;
  const id = `${v.id}-${current.value.id}`;

  const m = current.value.x + current.value.w / 2;
  const b = current.value.x + current.value.w;

  const snapL =
    Math.abs(current.value.x - v.x) < grid ||
    Math.abs(v.x + v.w / 2 - current.value.x) < grid ||
    Math.abs(v.x + v.w - current.value.x) < grid;

  const snapC =
    Math.abs(m - v.x) < grid ||
    Math.abs(m - (v.x + v.w / 2)) < grid ||
    Math.abs(m - (v.x + v.w)) < grid;

  const snapR =
    Math.abs(b - v.x) < grid ||
    Math.abs(b - (v.x + v.w / 2)) < grid ||
    Math.abs(b - (v.x + v.w)) < grid;

  const snapId = {
    left: `${id}-left`,
    center: `${id}-center`,
    right: `${id}-right`,
  };
  const { y, h } = current.value;
  let top = Math.min(v.y, y);
  /* 获取最右侧的盒子 */
  const bottom = Math.max(v.y + v.h, y + h);
  /* 线的宽度 */
  let offsetHeight = bottom - top;
  const leftLine = getTarget(snapId.left);
  const centerLine = getTarget(snapId.center);
  const lineRight = getTarget(snapId.right);
  if (snapL) {
    if (!leftLine) {
      lines.value.push({
        left: current.value.x,
        top,
        width: 1,
        height: offsetHeight,
        type: 'horizontal',
        id: snapId.left,
      });
    } else {
      leftLine.top = top;
      leftLine.height = offsetHeight;
    }
  } else {
    lines.value = lines.value.filter(e => e.id !== snapId.left);
  }
  if (snapC) {
    if (!centerLine) {
      lines.value.push({
        left: current.value.x + current.value.w / 2,
        top,
        width: 1,
        height: offsetHeight,
        type: 'horizontal',
        id: snapId.center,
      });
    } else {
      centerLine.top = top;
      centerLine.height = offsetHeight;
    }
  } else {
    lines.value = lines.value.filter(e => e.id !== snapId.center);
  }

  if (snapR) {
    if (!lineRight) {
      lines.value.push({
        left: current.value.x + current.value.w - 1,
        top,
        width: 1,
        height: offsetHeight,
        type: 'horizontal',
        id: snapId.right,
      });
    } else {
      lineRight.top = top;
      lineRight.height = offsetHeight;
    }
  } else {
    lines.value = lines.value.filter(e => e.id !== snapId.right);
  }
};
export const renderVerticalLine = (v: Draggable) => {
  if (!current.value || v.id === current.value.id) return;
  const id = `${v.id}-${current.value.id}`;

  const m = current.value.y + current.value.h / 2;
  const b = current.value.y + current.value.h;

  const snapT =
    Math.abs(current.value.y - v.y) < grid ||
    Math.abs(v.y + v.h / 2 - current.value.y) < grid ||
    Math.abs(v.y + v.h - current.value.y) < grid;

  const snapM =
    Math.abs(m - v.y) < grid ||
    Math.abs(m - (v.y + v.h / 2)) < grid ||
    Math.abs(m - (v.y + v.h)) < grid;

  const snapB =
    Math.abs(b - v.y) < grid ||
    Math.abs(b - (v.y + v.h / 2)) < grid ||
    Math.abs(b - (v.y + v.h)) < grid;

  const snapId = {
    top: `${id}-top`,
    middle: `${id}-middle`,
    bottom: `${id}-bottom`,
  };

  const correction = (target: AssistLine, left: number) => {
    target.left = left;
    target.width = offsetWidth;
  };
  const { x, w, y } = current.value;
  let left = Math.min(v.x, x);

  const right = Math.max(x + w, v.x + v.w);
  /* 线的宽度 */
  let offsetWidth = right - left;

  const topLine = getTarget(snapId.top);
  const middleLine = getTarget(snapId.middle);
  const bottomLine = getTarget(snapId.bottom);

  if (snapT) {
    if (!topLine) {
      lines.value.push({
        left,
        top: y,
        width: offsetWidth,
        height: 1,
        type: 'vertical',
        id: snapId.top,
      });
    } else {
      correction(topLine, left);
    }
  } else {
    lines.value = lines.value.filter(e => e.id !== snapId.top);
  }
  if (snapM) {
    if (!middleLine) {
      lines.value.push({
        left,
        top: current.value.y + current.value.h / 2,
        width: offsetWidth,
        height: 1,
        type: 'vertical',
        id: snapId.middle,
      });
    } else {
      correction(middleLine, left);
    }
  } else {
    lines.value = lines.value.filter(e => e.id !== snapId.middle);
  }

  if (snapB) {
    if (!bottomLine) {
      lines.value.push({
        left,
        top: current.value.y + current.value.h,
        width: offsetWidth,
        height: 1,
        type: 'vertical',
        id: snapId.bottom,
      });
    } else {
      correction(bottomLine, left);
    }
  } else {
    lines.value = lines.value.filter(e => e.id !== snapId.bottom);
  }
};
