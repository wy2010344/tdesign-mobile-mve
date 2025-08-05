import { fdom } from 'mve-dom';
import { Image } from '../index';
import { Loading } from '../../loading';
import { css } from 'wy-dom-helper';

export default function StatusDemo() {
  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'col',
        children() {
          fdom.p({
            className: 'tips',
            children: '加载默认提示',
          });
          Image({
            className: 'image-container',
            shape: 'round',
          });
        },
      });

      fdom.div({
        className: 'col',
        children() {
          fdom.p({
            className: 'tips',
            children: '加载自定义提示',
          });
          Image({
            className: 'image-container',
            shape: 'round',
            loading: () => Loading({}),
          });
        },
      });
    },
  });

  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'col',
        children() {
          fdom.p({
            className: 'tips',
            children: '失败默认提示',
          });
          Image({
            className: 'image-container',
            src: 'x',
            shape: 'round',
          });
        },
      });

      fdom.div({
        className: 'col',
        children() {
          fdom.p({
            className: 'tips',
            children: '失败自定义提示',
          });
          Image({
            className: 'image-container',
            src: 'x',
            shape: 'round',
            error: () =>
              fdom.div({
                className: 'error-tips',
                children: '加载失败',
              }),
          });
        },
      });
    },
  });
}

const s = css`
  display: flex;
  grid-gap: 24px;
  padding: 0 16px;
  margin-bottom: 16px;

  .image-container {
    width: 72px;
    height: 72px;
  }

  .tips {
    color: var(--td-text-color-secondary, rgba(0, 0, 0, 0.6));
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 16px;
    text-align: center;
    white-space: nowrap;
  }

  .error-tips {
    color: var(--td-text-color-placeholder, rgba(0, 0, 0, 0.4));
    font-size: 10px;
  }
`;
