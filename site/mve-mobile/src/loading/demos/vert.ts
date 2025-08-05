import { fdom } from 'mve-dom';
import { Loading } from '../index';
import { css } from 'wy-dom-helper';

export default function VertDemo() {
  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'container',
        children() {
          Loading({
            text: '加载中',
            layout: 'vertical',
          });
          Loading({
            theme: 'spinner',
            text: '加载中...',
            layout: 'vertical',
          });
        },
      });
    },
  });
}

const s = css`
  .container {
    display: flex;
  }

  .t-loading {
    margin-right: 64px;
  }
`;
