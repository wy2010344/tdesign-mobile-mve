import { fdom } from 'mve-dom';
import BaseDemo from './base';
import LabelDemo from './label';
import ColorDemo from './color';
import StatusDemo from './status';
import SizeDemo from './size';
import demoBlock from '../../../demo-block';

export default function SwitchDemos() {
  fdom.div({
    className: 'tdesign-mobile-demo',
    children() {
      fdom.h1({
        className: 'title',
        children: 'Switch 开关',
      });
      fdom.p({
        className: 'summary',
        children: '开关用于切换当个设置项的状态，开启、关闭为两个互斥的操作',
      });

      demoBlock({
        title: '01 组件类型',
        summary: '基础开关',
        children() {
          BaseDemo();
        },
      });

      demoBlock({
        summary: '带描述开关',
        children() {
          LabelDemo();
        },
      });

      demoBlock({
        summary: '自定义颜色开关',
        children() {
          ColorDemo();
        },
      });

      demoBlock({
        title: '02 组件状态',
        summary: '加载状态',
        children() {
          StatusDemo();
        },
      });

      demoBlock({
        title: '02 组件样式',
        summary: '开关尺寸',
        children() {
          SizeDemo();
        },
      });
    },
  });
}
