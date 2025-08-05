import { fdom } from 'mve-dom';
import { Image } from '../index';
import { css } from 'wy-dom-helper';

const imageSrc = 'https://tdesign.gtimg.com/demo/demo-image-1.png';

export default function PositionDemo() {
  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: `${s}-title`,
        children: '不同填充位置的图片',
      });

      fdom.div({
        className: `${s}-desc`,
        children: '当图片过大时，提供显示图片的局部左侧对齐、或右侧对齐的不同位置。',
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
                children: 'cover center',
              });
              Image({
                className: 'image-container',
                s_width: '72px',
                s_height: '72px',
                fit: 'cover',
                position: 'center',
                src: imageSrc,
              });
            },
          });

          fdom.div({
            className: 'image-demo',
            children() {
              fdom.p({
                className: 'image-demo-tip',
                children: 'cover left',
              });
              Image({
                className: 'image-container',
                s_width: '72px',
                s_height: '72px',
                fit: 'cover',
                position: 'left',
                src: imageSrc,
              });
            },
          });

          fdom.div({
            className: 'image-demo',
            children() {
              fdom.p({
                className: 'image-demo-tip',
                children: 'cover right',
              });
              Image({
                className: 'image-container',
                s_width: '72px',
                s_height: '72px',
                fit: 'cover',
                position: 'right',
                src: imageSrc,
              });
            },
          });

          fdom.div({
            className: 'image-demo',
            children() {
              fdom.p({
                className: 'image-demo-tip',
                children: 'cover top',
              });
              Image({
                className: 'image-container',
                s_width: '240px',
                s_height: '80px',
                fit: 'cover',
                position: 'top',
                src: imageSrc,
              });
            },
          });

          fdom.div({
            className: 'image-demo',
            children() {
              fdom.p({
                className: 'image-demo-tip',
                children: 'cover bottom',
              });
              Image({
                className: 'image-container',
                s_width: '240px',
                s_height: '80px',
                fit: 'cover',
                position: 'bottom',
                src: imageSrc,
              });
            },
          });

          fdom.div({
            className: 'image-demo',
            children() {
              fdom.p({
                className: 'image-demo-tip',
                children: 'contain top',
              });
              Image({
                className: 'image-container',
                s_width: '72px',
                s_height: '80px',
                fit: 'contain',
                position: 'top',
                src: imageSrc,
              });
            },
          });

          fdom.div({
            className: 'image-demo',
            children() {
              fdom.p({
                className: 'image-demo-tip',
                children: 'contain bottom',
              });
              Image({
                className: 'image-container',
                s_width: '72px',
                s_height: '80px',
                fit: 'contain',
                position: 'bottom',
                src: imageSrc,
              });
            },
          });

          fdom.div({
            className: 'image-demo',
            children() {
              fdom.p({
                className: 'image-demo-tip',
                children: 'contain center',
              });
              Image({
                className: 'image-container',
                s_width: '72px',
                s_height: '80px',
                fit: 'contain',
                position: 'center',
                src: imageSrc,
              });
            },
          });

          fdom.div({
            className: 'image-demo',
            children() {
              fdom.p({
                className: 'image-demo-tip',
                children: 'contain left',
              });
              Image({
                className: 'image-container',
                s_width: '180px',
                s_height: '80px',
                fit: 'contain',
                position: 'left',
                src: imageSrc,
              });
            },
          });

          fdom.div({
            className: 'image-demo',
            children() {
              fdom.p({
                className: 'image-demo-tip',
                children: 'contain right',
              });
              Image({
                className: 'image-container',
                s_width: '180px',
                s_height: '80px',
                fit: 'contain',
                position: 'right',
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
