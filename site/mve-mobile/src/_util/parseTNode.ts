import { TNode } from '../common';

// MVE版本的parseTNode - 解析TNode数据结构并渲染
export default function parseTNode(renderNode: TNode | undefined, renderParams?: any, defaultNode?: () => void): void {
  if (typeof renderNode === 'function') {
    renderNode(renderParams);
  } else if (renderNode === true && defaultNode) {
    defaultNode();
  } else if (renderNode && typeof renderNode === 'string') {
    // 对于字符串内容，需要在调用处处理
    // 这里不直接渲染，因为MVE需要在具体的DOM节点中处理文本
    return;
  } else if (renderNode) {
    // 对于其他类型的节点，尝试调用
    if (typeof renderNode === 'object' && 'render' in renderNode) {
      (renderNode as any).render();
    }
  }
}

/**
 * 解析各种数据类型的 TNode
 * 函数类型：content={(props) => Icon()}
 * 字符类型：直接返回字符串
 */
export function parseContentTNode<T>(tnode: TNode<T>, props: T): string | void {
  if (typeof tnode === 'function') {
    return tnode(props);
  }
  if (!tnode || ['string', 'number', 'boolean'].includes(typeof tnode)) {
    return tnode as string;
  }
  // 对于其他复杂类型，在MVE中需要特殊处理
  return undefined;
}
