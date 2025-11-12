import { fdom } from 'mve-dom';
import { cns, css } from 'wy-dom-helper';
import SingleDemo from './single';
import MultipleDemo from './multiple';
import GroupDemo from './group';
import demoBlock from '../../../demo-block';

export default function CellDemos() {
  fdom.div({
    className: cns(s, 'tdesign-mobile-demo'),
    children() {
      fdom.h1({
        className: 'title',
        children: 'Cell 单元格',
      });
      fdom.p({
        className: 'summary',
        children: '一行内容/功能的垂直排列方式。一行项目左侧为主要内容展示区域，右侧可增加更多操作内容',
      });

      demoBlock({
        title: '01 组件类型',
        summary: '单行单元格',
        children() {
          SingleDemo();
        },
      });

      demoBlock({
        summary: '多行单元格',
        children() {
          MultipleDemo();
        },
      });

      demoBlock({
        title: '02 组件样式',
        summary: '卡片单元格',
        children() {
          GroupDemo();
        },
      });
    },
  });
}

const s = css`
  padding-bottom: 66px;
`;
