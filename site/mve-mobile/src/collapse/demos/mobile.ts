import { fdom } from 'mve-dom';
import { BaseCollapseDemo } from './base';
import { AccordionCollapseDemo } from './accordion';
import { CardCollapseDemo } from './card';
import { PlacementCollapseDemo } from './placement';
import { ActionCollapseDemo } from './action';

import demoBlock from '../../../demo-block';
/**
 * Collapse 组件移动端演示页面
 */
export default function CollapseMobileDemo() {
  return fdom.div({
    className: 'tdesign-mobile-demo',
    children() {
      fdom.h1({
        children: 'Collapse 折叠面板',
      });
      fdom.p({
        children: '可以折叠/展开的内容区域。',
      });
      demoBlock({
        title: '01 组件类型',
        summary: '基础折叠面板',
        children() {
          BaseCollapseDemo();
          AccordionCollapseDemo();
          CardCollapseDemo();
          PlacementCollapseDemo();
          ActionCollapseDemo();
        },
      });
    },
  });
}
