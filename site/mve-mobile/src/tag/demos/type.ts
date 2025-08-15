import { fdom } from 'mve-dom';
import { Tag } from '../index';
import { TdDiscount } from 'mve-icons/td';
import { TSvg } from '../../../svg';
import { css } from 'wy-dom-helper';

export default function TypeDemo() {
  fdom.div({
    children() {
      // 基础标签
      fdom.div({
        className: 'summary',
        children: '基础标签',
      });
      fdom.div({
        className: 'tag-demo',
        children() {
          Tag({ variant: 'light', children: '标签文字' });
          Tag({ variant: 'outline', children: '标签文字' });
        },
      });

      // 圆弧标签
      fdom.div({
        className: 'summary',
        children: '圆弧标签',
      });
      fdom.div({
        className: 'tag-demo',
        children() {
          Tag({ variant: 'light', shape: 'round', children: '标签文字' });
          Tag({ variant: 'outline', shape: 'round', children: '标签文字' });
          Tag({ variant: 'outline', shape: 'mark', children: '标签文字' });
        },
      });

      // 带图标的标签
      fdom.div({
        className: 'summary',
        children: '带图标的标签',
      });
      fdom.div({
        className: 'tag-demo',
        children() {
          Tag({
            variant: 'light',
            icon: () =>
              TdDiscount(TSvg, {
                size: '16px',
              }),
            children: '标签文字',
          });
          Tag({
            variant: 'outline',
            icon: () =>
              TdDiscount(TSvg, {
                size: '16px',
              }),
            children: '标签文字',
          });
        },
      });

      // 超长文本省略标签
      fdom.div({
        className: 'summary',
        children: '超长文本省略标签',
      });
      fdom.div({
        className: 'tag-demo',
        children() {
          Tag({
            s_maxWidth: '130px',
            variant: 'light',
            children: '听说超长可以省略听说超长',
          });
        },
      });
    },
  });
}

const s = css`
  .summary {
    margin-bottom: 16px;
    font-size: 14px;
    color: #666;
  }

  .tag-demo {
    margin-bottom: 24px;
    display: flex;
    gap: 8px;
  }
`;
