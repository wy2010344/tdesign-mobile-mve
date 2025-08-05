import { fdom } from 'mve-dom';
import BaseDemo from './base';
import PositionDemo from './position';
import ShapeDemo from './shape';
import StatusDemo from './status';
import demoBlock from '../../../demo-block';

export default function ImageDemos() {
  fdom.div({
    className: 'tdesign-mobile-demo',
    s_backgroundColor: '#fff',
    children() {
      fdom.h1({
        className: 'title',
        children: 'Image 图片',
      });
      fdom.p({
        className: 'summary',
        children: '用于展示图片素材。',
      });
      demoBlock({
        title: '01 组件类型',
        padding: true,
        children() {
          BaseDemo();
          PositionDemo();
          ShapeDemo();
        },
      });
      demoBlock({
        title: '02 组件状态',
        children() {
          StatusDemo();
        },
      });
    },
  });
}
