import { fdom } from 'mve-dom';
import { Button } from '../index';
import { css } from 'wy-dom-helper';

export default function GroupDemo() {
  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'row',
        children() {
          Button({
            size: 'large',
            theme: 'light',
            children: '填充按钮',
          });
          Button({
            size: 'large',
            theme: 'primary',
            children: '填充按钮',
          });
        },
      });
    },
  });
}

const s = css`
  .row {
    margin: 0 16px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
`;
