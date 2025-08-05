import { fdom } from 'mve-dom';
import { Button } from '../index';
import { css } from 'wy-dom-helper';

export default function StatusDemo() {
  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'row',
        children() {
          Button({
            size: 'large',
            disabled: true,
            theme: 'primary',
            children: '填充按钮',
          });
          Button({
            size: 'large',
            disabled: true,
            theme: 'light',
            children: '填充按钮',
          });
          Button({
            size: 'large',
            disabled: true,
            children: '填充按钮',
          });
        },
      });

      fdom.div({
        className: 'row',
        children() {
          Button({
            size: 'large',
            disabled: true,
            theme: 'primary',
            variant: 'outline',
            children: '描边按钮',
          });
          Button({
            size: 'large',
            disabled: true,
            theme: 'primary',
            variant: 'dashed',
            children: '虚框按钮',
          });
          Button({
            size: 'large',
            disabled: true,
            theme: 'primary',
            variant: 'text',
            children: '文字按钮',
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
