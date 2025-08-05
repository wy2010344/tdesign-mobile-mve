import { fdom } from 'mve-dom';
import { Image } from '../index';
import { css } from 'wy-dom-helper';

const imageSrc = 'https://tdesign.gtimg.com/demo/demo-image-1.png';

export default function BaseDemo() {
  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: `${s}-title`,
        children: '不同填充模式的图片',
      });

      fdom.div({
        className: `${s}-desc`,
        children: '提供 fill、contain、cover、none、scale-down 5 种填充类型。',
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
                children: 'fill',
              });
              Image({
                className: 'image-container',
                s_width: '72px',
                s_height: '72px',
                fit: 'fill',
                src: imageSrc,
              });
            },
          });

          fdom.div({
            className: 'image-demo',
            children() {
              fdom.p({
                className: 'image-demo-tip',
                children: 'contain',
              });
              Image({
                className: 'image-container',
                s_width: '72px',
                s_height: '72px',
                fit: 'contain',
                src: imageSrc,
              });
            },
          });

          fdom.div({
            className: 'image-demo',
            children() {
              fdom.p({
                className: 'image-demo-tip',
                children: 'cover',
              });
              Image({
                className: 'image-container',
                s_width: '72px',
                s_height: '72px',
                fit: 'cover',
                src: imageSrc,
              });
            },
          });

          fdom.div({
            className: 'image-demo',
            children() {
              fdom.p({
                className: 'image-demo-tip',
                children: 'none',
              });
              Image({
                className: 'image-container',
                s_width: '72px',
                s_height: '72px',
                fit: 'none',
                src: imageSrc,
              });
            },
          });

          fdom.div({
            className: 'image-demo',
            children() {
              fdom.p({
                className: 'image-demo-tip',
                children: 'scale-down',
              });
              Image({
                className: 'image-container',
                s_width: '72px',
                s_height: '72px',
                fit: 'scale-down',
                src: imageSrc,
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
