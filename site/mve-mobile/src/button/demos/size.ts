import { fdom } from 'mve-dom';
import { Button } from '../index';
import { css } from 'wy-dom-helper';

export default function SizeDemo() {
  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'row',
        children() {
          Button({
            size: 'large',
            theme: 'primary',
            children: '按钮 48',
          });
          Button({
            theme: 'primary',
            children: '按钮 40',
          });
          Button({
            size: 'small',
            theme: 'primary',
            children: '按钮 32',
          });
          Button({
            size: 'extra-small',
            theme: 'primary',
            children: '按钮 28',
          });
        },
      });
    },
  });
}

const s = css`
  .row {
    display: flex;
    justify-content: space-between;
    margin: 0 16px;
  }
`;
