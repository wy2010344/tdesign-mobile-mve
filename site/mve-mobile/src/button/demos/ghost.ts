import { fdom } from 'mve-dom';
import { Button } from '../index';
import { css } from 'wy-dom-helper';

export default function GhostDemo() {
  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'row',
        children() {
          Button({
            size: 'large',
            ghost: true,
            theme: 'primary',
            children: '幽灵按钮',
          });
          Button({
            size: 'large',
            ghost: true,
            theme: 'danger',
            children: '幽灵按钮',
          });
          Button({
            size: 'large',
            ghost: true,
            children: '幽灵按钮',
          });
        },
      });
    },
  });
}

const s = css`
  .row {
    display: flex;
    padding: 16px;
    background-color: #181818;
  }

  .t-button + .t-button {
    margin-left: 16px;
  }
`;
