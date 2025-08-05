import { fdom } from 'mve-dom';
import BaseDemo from './base';
import IconDemo from './icon';
import GhostDemo from './ghost';
import GroupDemo from './group';
import BlockDemo from './block';
import StatusDemo from './status';
import SizeDemo from './size';
import ShapeDemo from './shape';
import ThemeDemo from './theme';
import demoBlock from '../../../demo-block';

export default function ButtonDemos() {
  fdom.div({
    className: 'tdesign-mobile-demo',
    s_backgroundColor: '#fff',
    children() {
      fdom.h1({
        className: 'title',
        children: 'Button 按钮',
      });
      fdom.p({
        className: 'summary',
        children: '按钮用于开启一个闭环的操作任务，如"删除"对象、"购买"商品等。',
      });

      demoBlock({
        title: '01 组件类型',
        summary: '基础按钮',
        children() {
          BaseDemo();
        },
      });

      demoBlock({
        summary: '图标按钮',
        children() {
          IconDemo();
        },
      });

      demoBlock({
        summary: '幽灵按钮',
        children() {
          GhostDemo();
        },
      });

      demoBlock({
        summary: '组合按钮',
        children() {
          GroupDemo();
        },
      });

      demoBlock({
        summary: '通栏按钮',
        children() {
          BlockDemo();
        },
      });

      demoBlock({
        title: '02 组件状态',
        summary: '按钮禁用态',
        children() {
          StatusDemo();
        },
      });

      demoBlock({
        title: '03 组件样式',
        summary: '按钮尺寸',
        children() {
          SizeDemo();
        },
      });

      demoBlock({
        summary: '按钮形状',
        children() {
          ShapeDemo();
        },
      });

      demoBlock({
        summary: '按钮主题',
        children() {
          ThemeDemo();
        },
      });
    },
  });
}
