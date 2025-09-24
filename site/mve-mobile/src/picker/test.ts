import { fdom } from 'mve-dom';
import { PickerMobileDemo } from './demos/mobile';

/**
 * Picker 组件测试页面
 */
export function PickerTest() {
  return fdom.div({
    className: 'picker-test-page',
    children() {
      fdom.div({
        className: 'test-header',
        children() {
          fdom.h1({
            children: 'Picker 组件测试',
          });
        },
      });

      fdom.div({
        className: 'test-content',
        children() {
          PickerMobileDemo();
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
    PickerTest();
  });
}
