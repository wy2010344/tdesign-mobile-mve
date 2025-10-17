import { fdom } from 'mve-dom';
import demoBlock from '../../../demo-block';
import typeDemo from './typeDemo';

export default function () {
  fdom.div({
    className: 'tdesign-mobile-demo',
    children() {
      fdom.h1({
        className: 'title',
        children: 'Popover 弹出气泡',
      });
      fdom.p({
        className: 'summary',
        children: '用于文字提示的气泡框。',
      });
      demoBlock({
        title: '01 组件类型',
        children() {
          typeDemo();
        },
      });
      demoBlock({
        title: '02 组件样式',
        children() {},
      });
      demoBlock({
        children() {},
      });
    },
  });
}
