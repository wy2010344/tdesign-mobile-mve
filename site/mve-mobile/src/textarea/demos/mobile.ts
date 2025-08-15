import { fdom } from 'mve-dom';
import BaseDemo from './base';
import AutosizeDemo from './autosize';
import MaxlengthDemo from './maxlength';
import DisabledDemo from './disabled';
import LabelDemo from './label';
import CardDemo from './card';
import MaxcharacterDemo from './maxcharacter';
import { cns } from 'wy-dom-helper';

import demoBlock from '../../../demo-block';
export default function MobileDemo() {
  fdom.div({
    className: 'tdesign-mobile-demo',
    children() {
      fdom.h1({
        className: 'title',
        children: 'Textarea 多行文本框',
      });
      fdom.p({
        className: 'summary',
        children: '用于多行文本的输入',
      });
      demoBlock({
        title: '01 组件类型',
        summary: '基础多行文本框',
        children: BaseDemo,
      });

      demoBlock({
        summary: '带标题多行文本框',
        children: LabelDemo,
      });

      demoBlock({
        summary: '自动增高多行文本框',
        children: AutosizeDemo,
      });

      demoBlock({
        summary: '设置字符数限制',
        children() {
          MaxlengthDemo();
          MaxcharacterDemo();
        },
      });

      demoBlock({
        title: '02 组件状态',
        summary: '禁用状态',
        children: DisabledDemo,
      });

      demoBlock({
        title: '03 组件样式',
        summary: '竖排样式',
        children: CardDemo,
      });

      demoBlock({
        title: '04 特殊样式',
        summary: '标签外置输入框',
        children: DisabledDemo,
      });
    },
  });
}
