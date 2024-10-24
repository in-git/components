export const config = ref<DraggableConfig>({
  handlesSize: 4,
  handlesType: 'borders',
  enableNativeDrag: true,
  disableUserSelect: true,
  multipleSelect: false,
  showGrid: true,
  grid: [5, 5],
  parent: '#test-parent',
  scale: 1,
  activeOnHover: false,
});
