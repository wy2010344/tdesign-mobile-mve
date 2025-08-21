import { fdom } from 'mve-dom';
import base from './base';

export default function () {
  fdom.div({
    className: 'tdesign-mobile-demo',
    children() {
      fdom.h1({
        className: 'title',
        children: 'Swiper 轮播',
      });
      fdom.summary({
        className: 'summary',
        children: '用于循环轮播一组图片或内容，也可以滑动进行切换，轮播动效时间可以设置。',
      });
      base();
    },
  });
}
