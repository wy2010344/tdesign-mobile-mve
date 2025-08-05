import { fdom } from 'mve-dom';
import { Loading } from '../index';
import { css } from 'wy-dom-helper';

export default function HorzDemo() {
  fdom.div({
    className: s,
    children() {
      Loading({
        text: '加载中...',
      });
      Loading({
        theme: 'spinner',
        text: '加载中...',
      });
    },
  });
}

const s = css`
  .t-loading {
    margin-right: 40px;
  }
`;
