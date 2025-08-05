import { fdom } from 'mve-dom';
import { Image } from '../index';
import { Property } from 'csstype';
const imageSrc = 'https://tdesign.gtimg.com/demo/demo-image-1.png';

export default function BaseDemo() {
  fdom.div({
    className: 'image-example',
    s_marginBottom: '24px',
    s_color: 'var(--td-text-color-secondary, rgba(0, 0, 0, 0.6))',
    children() {
      fdom.div({
        className: 'image-example-title',
        s_fontSize: '14px',
        s_lineHeight: '22px',
        children: '不同填充模式的图片',
      });

      fdom.div({
        className: 'image-example-desc',
        s_fontSize: '12px',
        s_lineHeight: '20px',
        children: '提供 fill、contain、cover、none、scale-down 5 种填充类型。',
      });

      function ImageDemo(fit: Property.ObjectFit) {
        fdom.div({
          className: 'image-demo',
          s_marginRight: '24px',
          children() {
            fdom.p({
              className: 'image-demo-tip',
              s_fontSize: '14px',
              s_color: 'var(--td-text-color-secondary, rgba(0, 0, 0, 0.6))',
              s_margin: '16px 0',
              s_whiteSpace: 'nowrap',
              children: fit,
            });

            Image({
              className: 'image-container',
              s_width: '72px',
              s_height: '72px',
              fit,
              src: imageSrc,
            });
          },
        });
      }
      fdom.div({
        className: 'image-group',
        s_display: 'flex',
        s_flexWrap: 'wrap',
        children() {
          // fill
          ImageDemo('fill');
          // contain
          ImageDemo('contain');
          // cover
          ImageDemo('cover');
          // none
          ImageDemo('none');
          // scale-down
          ImageDemo('scale-down');
        },
      });
    },
  });
}
