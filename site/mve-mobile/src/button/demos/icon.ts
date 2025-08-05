import { fdom } from 'mve-dom';
import { Button } from '../index';
import { css } from 'wy-dom-helper';
import { TdApp, TdSearch } from 'mve-icons/td';
import { TSvg } from '../../../svg';
export default function IconDemo() {
  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'row',
        children() {
          Button({
            theme: 'primary',
            size: 'large',
            icon: () =>
              TdApp(TSvg, {
                size: '24px',
              }), // 临时图标，实际应该使用图标组件
            children: '填充按钮',
          });
          Button({
            theme: 'primary',
            size: 'large',
            loading: true,
            children: '加载中',
          });
          Button({
            theme: 'primary',
            size: 'large',
            icon: () =>
              TdSearch(TSvg, {
                size: '24px',
              }), // 临时图标，实际应该使用图标组件
            shape: 'square',
          });
        },
      });
    },
  });
}

const s = css`
  .row {
    display: flex;
    padding: 0 16px;
  }

  .row + .row {
    margin-top: 16px;
  }

  .t-button + .t-button {
    margin-left: 16px;
  }
`;
