import { fdom } from 'mve-dom';
import { Image } from '../index';
import { css } from 'wy-dom-helper';

const imageSrc = 'https://tdesign.gtimg.com/demo/demo-image-1.png';

export default function ShapeDemo() {
  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: `${s}-title`,
        children: '不同形状的图片',
      });

      fdom.div({
        className: `${s}-desc`,
        children: '提供方形、圆角方形、圆角 3 种形状。 当图片长宽不相等时，无法使用 circle 展示一个正圆。',
      });

      fdom.div({
        className: 'image-group',
        s_display: 'flex',
        s_flexWrap: 'wrap',
        children() {
          fdom.div({
            className: 'image-demo',
            children() {
              fdom.p({
                className: 'image-demo-tip',
                children: '方形',
              });
              Image({
                className: 'image-container',
                src: imageSrc,
              });
            },
          });

          fdom.div({
            className: 'image-demo',
            children() {
              fdom.p({
                className: 'image-demo-tip',
                children: '圆角方形',
              });
              Image({
                className: 'image-container',
                src: imageSrc,
                shape: 'round',
              });
            },
          });

          fdom.div({
            className: 'image-demo',
            children() {
              fdom.p({
                className: 'image-demo-tip',
                children: '圆形',
              });
              Image({
                className: 'image-container',
                alt: '一张图片',
                src: imageSrc,
                fit: 'cover',
                shape: 'circle',
              });
            },
          });
        },
      });
    },
  });
}

const s = css`
  margin-bottom: 24px;
  color: var(--td-text-color-secondary, rgba(0, 0, 0, 0.6));

  &-title {
    font-size: 14px;
    line-height: 22px;
  }

  &-desc {
    font-size: 12px;
    line-height: 20px;
  }

  .image-group {
    display: flex;
    flex-wrap: wrap;

    .image-demo {
      margin-right: 24px;
      .image-container {
        height: 72px;
        width: 72px;
        background-color: #000;
      }

      .image-demo-tip {
        color: var(--td-text-color-secondary, rgba(0, 0, 0, 0.6));
        font-size: 14px;
        line-height: 22px;
        margin: 16px 0;
        white-space: nowrap;
      }
    }
  }
`;
