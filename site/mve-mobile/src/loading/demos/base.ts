import { fdom } from 'mve-dom';
import { Loading } from '../index';
import { css } from 'wy-dom-helper';

export default function BaseDemo() {
  fdom.div({
    className: s,
    children() {
      Loading({});
      Loading({
        theme: 'spinner',
      });
      Loading({
        theme: 'dots',
        size: '40px',
      });
    },
  });
}

const s = css`
  .t-loading {
    margin-right: 64px;
  }
`;
