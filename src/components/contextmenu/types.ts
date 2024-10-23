interface ContextmenuProps {
  /* 是否禁用 */
  disabled?: boolean;
  /* 标题 */
  title?: string;
  /* 图标,传一个可在 <component :is=""/> 中渲染的值 */
  icon?: any;
  /* 子节点 */
  children?: ContextmenuProps[];
  /* 点击事件 */
  onClick?: () => any;

  type: 'menu' | 'devider';
}
