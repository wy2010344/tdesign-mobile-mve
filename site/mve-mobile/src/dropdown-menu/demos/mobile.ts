import { fdom } from 'mve-dom';

import demoBlock from '../../../demo-block';
import single from './single';

export default function () {
  fdom.div({
    className: 'tdesign-mobile-demo',
    children() {
      fdom.h1({
        className: 'title',
        children: 'DropdownMenu 下拉菜单',
      });
      fdom.p({
        className: 'summary',
        children: '菜单呈现数个并列的选项类目，用于整个页面的内容筛选，由菜单面板和菜单选项组成。',
      });

      demoBlock({
        title: '01 组件类型',
        summary: '单选下拉菜单',
        children: single,
      });
    },
  });
}
