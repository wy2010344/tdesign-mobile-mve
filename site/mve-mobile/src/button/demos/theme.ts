import { fdom } from 'mve-dom';
import { Button } from '../index';
import { css } from 'wy-dom-helper';

export default function ThemeDemo() {
  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'row',
        children() {
          Button({
            size: 'large',
            children: '填充按钮',
          });
          Button({
            size: 'large',
            variant: 'outline',
            children: '描边按钮',
          });
          Button({
            size: 'large',
            variant: 'dashed',
            children: '虚框按钮',
          });
          Button({
            size: 'large',
            variant: 'text',
            children: '文字按钮',
          });
        },
      });

      fdom.div({
        className: 'row',
        children() {
          Button({
            size: 'large',
            theme: 'primary',
            children: '填充按钮',
          });
          Button({
            size: 'large',
            theme: 'primary',
            variant: 'outline',
            children: '描边按钮',
          });
          Button({
            size: 'large',
            theme: 'primary',
            variant: 'dashed',
            children: '虚框按钮',
          });
          Button({
            size: 'large',
            theme: 'primary',
            variant: 'text',
            children: '文字按钮',
          });
        },
      });

      fdom.div({
        className: 'row',
        children() {
          Button({
            size: 'large',
            theme: 'danger',
            children: '填充按钮',
          });
          Button({
            size: 'large',
            theme: 'danger',
            variant: 'outline',
            children: '描边按钮',
          });
          Button({
            size: 'large',
            theme: 'danger',
            variant: 'dashed',
            children: '虚框按钮',
          });
          Button({
            size: 'large',
            theme: 'danger',
            variant: 'text',
            children: '文字按钮',
          });
        },
      });

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
            theme: 'light',
            variant: 'outline',
            children: '描边按钮',
          });
          Button({
            size: 'large',
            theme: 'light',
            variant: 'dashed',
            children: '虚框按钮',
          });
          Button({
            size: 'large',
            theme: 'light',
            variant: 'text',
            children: '文字按钮',
          });
        },
      });
    },
  });
}

const s = css`
  .section-theme {
    overflow-y: auto;

    .row {
      margin: 0 16px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }

    .row:not(:last-child) {
      margin-bottom: 16px;
    }
  }

  .row {
    margin: 0 16px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .row:not(:last-child) {
    margin-bottom: 16px;
  }
`;
