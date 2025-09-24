import { fdom } from 'mve-dom';
import { createSignal } from 'wy-helper';
import { css } from 'wy-dom-helper';
import { Button } from '../../button';
import { Popup } from '../index';

export default function BaseDemo() {
  const visible = createSignal(false);
  const currentPlacement = createSignal<'top' | 'left' | 'center' | 'bottom' | 'right'>('top');

  const placement = [
    { value: 'top' as const, text: '顶部弹出' },
    { value: 'left' as const, text: '左侧弹出' },
    { value: 'center' as const, text: '中间弹出' },
    { value: 'bottom' as const, text: '底部弹出' },
    { value: 'right' as const, text: '右侧弹出' },
  ];

  const onClick = (item: (typeof placement)[0]) => {
    currentPlacement.set(item.value);
    setTimeout(() => visible.set(true), 0);
  };

  fdom.div({
    className: s,
    children() {
      placement.forEach((p) => {
        Button({
          block: true,
          variant: 'outline',
          theme: 'primary',
          size: 'large',
          children: p.text,
          onClick: () => onClick(p),
        });
      });

      Popup({
        visible: visible.get,
        placement: currentPlacement.get,
        destroyOnClose: true,
        showCloseBtn: true,
        onClose() {
          visible.set(false);
        },
        s_padding: '100px',
      });
    },
  });
}

const s = css`
  padding: 0 16px;

  .t-button {
    margin-bottom: 16px;
  }
`;
