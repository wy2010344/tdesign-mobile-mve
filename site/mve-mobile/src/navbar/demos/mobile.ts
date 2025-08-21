import { fdom } from 'mve-dom';
import base from './base';

export default function NoticeBarDemo() {
  fdom.div({
    className: 'tdesign-mobile-demo',
    children() {
      fdom.h1({
        className: 'title',
        children: 'NavBar 导航栏',
      });
      fdom.p({
        className: 'summary',
        children: '用于不同页面之间切换或者跳转，位于内容区的上方，系统状态栏的下方。',
      });
      base();
    },
  });
}
