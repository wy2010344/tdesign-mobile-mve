import { fdom } from 'mve-dom';
import { createSignal } from 'wy-helper';
import { NoticeBar } from '../index';
import { TdArrowRight, TdChevronRight, TdClose, TdSound } from 'mve-icons/td';
import { TSvg } from '../../../svg';
import { Toast } from '../../toast';
import demoBlock from '../../../demo-block';
import { Link } from '../../link';
import { css } from 'wy-dom-helper';
import theme from './theme';
import base from './base';
import scrolling from './scrolling';

/**
 * NoticeBar 通知栏组件演示
 */
export default function NoticeBarDemo() {
  fdom.div({
    className: 'tdesign-mobile-demo',
    children() {
      fdom.h1({
        className: 'title',
        children: 'NoticeBar 公告栏',
      });
      fdom.p({
        className: 'summary',
        children: '在导航栏下方，用于给用户显示提示消息',
      });
      base();
      theme();
      scrolling();
    },
  });
}
