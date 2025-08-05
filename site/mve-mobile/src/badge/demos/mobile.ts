import { fdom } from 'mve-dom';
import BaseDemo from './base';
import ThemeDemo from './theme';
import SizeDemo from './size';
import demoBlock from '../../../demo-block';

export default function BadgeDemos() {
  fdom.div({
    className: 'tdesign-mobile-demo',
    s_backgroundColor: '#fff',
    children() {
      fdom.h1({
        className: 'title',
        children: 'Badge 徽标',
      });
      fdom.p({
        className: 'summary',
        children: '用于告知用户，该区域的状态变化或者待处理任务的数量。',
      });

      demoBlock({
        title: '01 组件类型',
        children() {
          BaseDemo();
        },
      });

      demoBlock({
        title: '02 组件样式',
        children() {
          ThemeDemo();
        },
      });

      demoBlock({
        title: '03 组件尺寸',
        children() {
          SizeDemo();
        },
      });
    },
  });
}
