import { fdom } from 'mve-dom';
import { Loading } from '../index';
import { css } from 'wy-dom-helper';

export default function SizeDemo() {
  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'loading-demo',
        children() {
          fdom.div({
            className: 'loading-demo__summary mb-16',
            children: '大尺寸',
          });
          Loading({
            size: '26px',
            text: '加载中...',
          });
        },
      });

      fdom.div({
        className: 'loading-demo',
        children() {
          fdom.div({
            className: 'loading-demo__summary mt-24 mb-16',
            children: '中尺寸',
          });
          Loading({
            size: '22px',
            text: '加载中...',
          });
        },
      });

      fdom.div({
        className: 'loading-demo',
        children() {
          fdom.div({
            className: 'loading-demo__summary mt-24 mb-16',
            children: '小尺寸',
          });
          Loading({
            size: '20px',
            text: '加载中...',
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

  .loading-demo__summary {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
    line-height: 22px;
  }

  .mt-24 {
    margin-top: 24px;
  }

  .mb-16 {
    margin-bottom: 16px;
  }
`;
