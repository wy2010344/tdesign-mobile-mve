import { fdom } from 'mve-dom';
import ListDemo from './list';
import GridDemo from './grid';
import GridMultipleDemo from './grid-multiple';
import AlignDemo from './align';
import StatusDemo from './status';
import demoBlock from '../../../demo-block';
import { css } from 'wy-dom-helper';

export default function ActionSheetDemos() {
  fdom.div({
    className: s,
    children() {
      fdom.h1({
        className: 'title',
        children: 'ActionSheet 动作面板',
      });
      fdom.p({
        className: 'summary',
        children: '从底部弹出的模态框，提供和当前场景相关的操作动作，也支持提供信息输入和描述。',
      });

      demoBlock({
        title: '01 类型',
        summary: '列表型',
        children() {
          ListDemo();
        },
      });

      demoBlock({
        summary: '宫格型动作面板',
        children() {
          fdom.div({
            className: 'action-sheet-grid-demo',
            children() {
              GridDemo();
              GridMultipleDemo();
            },
          });
        },
      });

      demoBlock({
        title: '02 组件状态',
        summary: '列表型选项状态',
        children() {
          StatusDemo();
        },
      });

      demoBlock({
        title: '03 组件样式',
        summary: '列表型对齐方式',
        children() {
          AlignDemo();
        },
      });
    },
  });
}

const s = css`
  background-color: var(--bg-color-demo, #fff);

  .action-sheet-grid-demo {
    > div {
      margin-top: 8px;
    }
  }
`;
