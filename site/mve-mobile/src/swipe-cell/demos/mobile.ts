import { fdom } from 'mve-dom';
import { createSignal } from 'wy-helper';
import { SwipeCell } from '../swipe-cell';
import { Cell } from '../../cell';
import left from './left';
import icon from './icon';

/**
 * SwipeCell 滑动单元格组件演示
 */
export default function SwipeCellDemo() {
  fdom.div({
    className: 'tdesign-mobile-demo',
    children() {
      fdom.h1({
        className: 'title',
        children: 'Swipecell 滑动操作',
      });
      fdom.p({
        className: 'summary',
        children: `用于承载列表中的更多操作，通过左右滑动来展示，按钮的宽度固定高度根据列表高度而变化。`,
      });
      left();
      icon();
    },
  });
}
