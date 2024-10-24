import { redoHistory, undoHistory } from '@/components/history/history';
import { frameList } from './data';

export const redoFrame = () => {
  frameList.value = redoHistory();
};
export const undoFrame = () => {
  frameList.value = undoHistory();
};
