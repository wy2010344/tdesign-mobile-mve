import { fdom } from 'mve-dom';

import demoBlock from '../../../demo-block';
import base from './base';
import { horizontal } from './horizontal';
import { status } from './status';
import { Icon } from './icon';
import Placement from './placement';
import Special from './special';

export default function () {
  fdom.div({
    className: 'tdesign-mobile-demo',
    children() {
      fdom.h1({
        className: 'title',
        children: 'Checkbox 多选框',
      });
      fdom.p({
        className: 'summary',
        children: '用于在预设的一组选项中执行多项选择，并呈现选择结果。',
      });

      demoBlock({
        title: '01 组件类型',
        summary: '纵向多选框',
        children: base,
      });
      demoBlock({
        title: '',
        summary: '横向多选框',
        children: horizontal,
      });
      demoBlock({
        title: '02 组件状态',
        summary: '多选框禁用态',
        children: status,
      });
      demoBlock({
        title: '03 组件样式',
        summary: '勾选样式',
        children: Icon,
      });
      demoBlock({
        summary: '勾选样式显示位置',
        children: Placement,
      });
      demoBlock({
        title: '04 特殊样式',
        summary: '多选框特殊配置',
        children: Special,
      });
    },
  });
}
