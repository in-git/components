export const stageConfig = ref<DraggableConfig>({
  handlesSize: 4,
  handlesType: 'borders',
  enableNativeDrag: true,
  disableUserSelect: true,
  multipleSelect: false,
  showGrid: true,
  grid: {
    x: 5,
    y: 5,
  },
  parent: '#test-parent',
  scale: 1,
  activeOnHover: false,
  width: 600,
  height: 600,
});
