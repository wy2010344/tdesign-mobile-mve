import { fdom } from 'mve-dom';
import { Loading } from '../index';
import { Switch } from '../../switch';
import { css } from 'wy-dom-helper';
import { signal } from 'mve-signal';

export default function AttachDemo() {
  const loading = signal(false);

  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'loading-demo',
        children() {
          fdom.div({
            id: 'alice',
            className: 'loading-attach-demo__title',
            children: "Hello, I'm Alice. I'm going to be a front-end developer.",
          });
          Loading({
            attach: '#alice',
            size: 'small',
            loading: loading,
          });
          Switch({
            value: loading,
            customValue: [true, false],
            size: 'small',
            label: ['开', '关'],
          });
        },
      });
    },
  });
}

const s = css`
  .loading-demo {
    padding: 0 16px;
  }

  .loading-attach-demo__title {
    /** position: relative is required as a parent node */
    position: relative;
    width: 360px;
    text-align: center;
  }
`;
