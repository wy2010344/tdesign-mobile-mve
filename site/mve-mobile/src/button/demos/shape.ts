import { fdom } from 'mve-dom';
import { Button } from '../index';
import { css } from 'wy-dom-helper';

import { TdSearch } from 'mve-icons/td';
import { TSvg } from '../../../svg';
export default function ShapeDemo() {
  const SearchIcon = () =>
    TdSearch(TSvg, {
      size: '24px',
    });
  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'row',
        children() {
          Button({
            theme: 'primary',
            size: 'large',
            children: '填充按钮',
          });
          Button({
            theme: 'primary',
            size: 'large',
            icon: SearchIcon, // 临时图标，实际应该使用图标组件
            shape: 'square',
            aria_label: '搜索',
          });
          Button({
            theme: 'primary',
            size: 'large',
            shape: 'round',
            children: '填充按钮',
          });
          Button({
            theme: 'primary',
            size: 'large',
            icon: SearchIcon, // 临时图标，实际应该使用图标组件
            shape: 'circle',
            aria_label: '搜索',
          });
        },
      });

      Button({
        theme: 'primary',
        size: 'large',
        block: true,
        className: 'rectangle-button',
        children: '填充按钮',
      });
    },
  });
}

const s = css`
  .row {
    display: flex;
    justify-content: space-between;
    margin: 0 16px 16px;
  }

  .rectangle-button {
    border-radius: 0;
  }
`;
