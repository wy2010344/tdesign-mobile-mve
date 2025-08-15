import { fdom } from 'mve-dom';
import { createSignal } from 'wy-helper';
import { Tag } from '../index';
import { css } from 'wy-dom-helper';

export default function ClosableDemo() {
  const show1 = createSignal(true);
  const show2 = createSignal(true);

  function onClickClose(index: number) {
    if (index === 1) {
      show1.set(false);
    }
    if (index === 2) {
      show2.set(false);
    }
  }

  fdom.div({
    children() {
      fdom.div({
        className: 'summary',
        children: '可关闭标签',
      });

      fdom.div({
        className: s,
        children() {
          // 第一个标签
          if (show1.get()) {
            Tag({
              closable: true,
              variant: 'light',
              onClose: () => onClickClose(1),
              children: '文字标签',
            });
          }

          // 第二个标签
          if (show2.get()) {
            Tag({
              closable: true,
              variant: 'outline',
              onClose: () => onClickClose(2),
              children: '文字标签',
            });
          }
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

  .t-tag + .t-tag {
    margin-left: 8px;
  }
`;
