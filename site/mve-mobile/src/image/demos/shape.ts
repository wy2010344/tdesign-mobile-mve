import { fdom } from 'mve-dom';
import { Image } from '../index';

const imageSrc = 'https://tdesign.gtimg.com/demo/demo-image-1.png';

export default function ShapeDemo() {
  fdom.div({
    className: 'image-example',
    children() {
      fdom.div({
        className: 'image-example-title',
        s_fontSize: '16px',
        s_fontWeight: '600',
        s_marginBottom: '8px',
        childrenType: 'text',
        children: '不同形状的图片',
      });

      fdom.div({
        className: 'image-example-desc',
        s_fontSize: '14px',
        s_color: '#666',
        s_marginBottom: '16px',
        s_lineHeight: '1.5',
        childrenType: 'text',
        children: '提供方形、圆角方形、圆角 3 种形状。当图片长宽不相等时，无法使用 circle 展示一个正圆。',
      });

      fdom.div({
        className: 'image-group',
        s_display: 'flex',
        s_gap: '20px',
        s_alignItems: 'center',
        children() {
          // 方形
          fdom.div({
            className: 'image-demo',
            s_textAlign: 'center',
            children() {
              fdom.p({
                className: 'image-demo-tip',
                s_fontSize: '12px',
                s_color: '#666',
                s_marginBottom: '8px',
                childrenType: 'text',
                children: '方形',
              });

              Image({
                className: 'image-container',
                s_width: '72px',
                s_height: '72px',
                src: imageSrc,
              });
            },
          });

          // 圆角方形
          fdom.div({
            className: 'image-demo',
            s_textAlign: 'center',
            children() {
              fdom.p({
                className: 'image-demo-tip',
                s_fontSize: '12px',
                s_color: '#666',
                s_marginBottom: '8px',
                childrenType: 'text',
                children: '圆角方形',
              });

              Image({
                className: 'image-container',
                s_width: '72px',
                s_height: '72px',
                src: imageSrc,
                shape: 'round',
              });
            },
          });

          // 圆形
          fdom.div({
            className: 'image-demo',
            s_textAlign: 'center',
            children() {
              fdom.p({
                className: 'image-demo-tip',
                s_fontSize: '12px',
                s_color: '#666',
                s_marginBottom: '8px',
                childrenType: 'text',
                children: '圆形',
              });

              Image({
                className: 'image-container',
                s_width: '72px',
                s_height: '72px',
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
