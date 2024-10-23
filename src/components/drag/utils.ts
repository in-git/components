export const getTreeDepth = (node: Draggable | DraggableTree): number => {
  if (!node.children || node.children.length === 0) {
    return node.treeDeep || 0; // 返回当前节点的深度或 0
  }

  // 递归计算每个子节点的深度
  const childDepths = node.children.map(getTreeDepth);

  // 返回当前节点深度与子节点中最大深度的最大值
  return Math.max(...childDepths) + 1; // 加 1 代表当前节点的深度
};

export const getAllParentNodes = (nodes: Draggable[], currentId?: string): Draggable[] => {
  const parentNodes: Draggable[] = [];

  const findParents = (id: string | boolean) => {
    const parent = nodes.find(draggable => draggable.id === id);
    if (parent) {
      parentNodes.push(parent);
      if (parent.parent) {
        findParents(parent.parent);
      }
    }
  };

  if (currentId) {
    findParents(currentId);
  } else {
    nodes.forEach(draggable => {
      if (draggable.parent) {
        findParents(draggable.parent);
      }
    });
  }

  return Array.from(new Set(parentNodes));
};
