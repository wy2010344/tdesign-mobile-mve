import { fdom } from 'mve-dom';
import { CollapseMobileDemo } from './demos/mobile';

/**
 * Collapse 组件测试页面
 */
export function CollapseTest() {
  return fdom.div({
    className: 'collapse-test-page',
    children() {
      fdom.div({
        className: 'test-header',
        children() {
          fdom.h1({
            children: 'Collapse 组件测试',
          });
        },
      });

      fdom.div({
        className: 'test-content',
        children() {
          CollapseMobileDemo();
        },
      });
    },
  });
}

// 如果在浏览器环境中，可以直接渲染测试
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('app') || document.body;
    container.innerHTML = '';
    CollapseTest();
  });
}
