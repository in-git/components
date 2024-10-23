type DraggableHandles = 'tm' | 'bm' | 'ml' | 'mr';

interface DraggableTree {
  /* 是否展开 */
  expand?: boolean;
  /* 是否编辑 */
  editing?: boolean;
  /* 节点深度 */
  treeDeep?: number;
  [key: string]: any;
}

interface Draggable extends DraggableTree {
  w: number;
  h: number;
  x: number;
  y: number;
  id?: string;
  axis?: 'x' | 'y' | 'both';
  z?: number;
  minWidth?: number;
  gridColor?: string;
  minHeight?: number;
  children?: Draggable[];
  draggable?: boolean;
  dragHandle?: string;
  dragCancel?: string;
  resizable?: boolean;
  lockAspectRatio?: boolean;
  handlesBorder?: string;
  handles?: DraggableHandles;
  parent?: string | boolean;
  active?: boolean;
  activeOnHover?: boolean;
  preventDeactivation?: boolean;
  type?: string;
  name?: string;
}
interface DraggableEvent {
  onDragStart?: (e?: MouseEvent) => any;
  onDrag?: (x?: number, y?: number) => any;
  onResizeStart?: (handles?: DraggableHandles, ev?: MouseEvent) => any;
  onResize?: (handles?: DraggableHandles, x?: number, y?: number, w?: number, h?: number) => any;
  activated?: () => any;
  onDeactivated?: () => any;
  resizing?: (x?: number, y?: number, w?: number, h?: number) => any;
  resizestop?: (x?: number, y?: number, w?: number, h?: number) => any;
  dragging?: (x?: number, y?: number) => any;
  dragstop?: () => any;
}

interface DraggableConfig {
  classNameDraggable?: string;
  classNameResizable?: string;
  classNameDragging?: string;
  classNameResizing?: string;
  classNameActive?: string;
  classNameHandle?: string;
  handlesType?: 'handles' | 'custom' | 'borders';
  handlesSize?: number;
  disableUserSelect?: boolean;
  enableNativeDrag?: boolean;
  /* 是否允许多选 */
  multipleSelect?: boolean;
  grid?: [number, number];
  showGrid?: boolean;
  parent?: string | boolean;
  scale?: number;
}
