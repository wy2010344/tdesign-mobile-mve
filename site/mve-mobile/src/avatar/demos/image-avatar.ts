import { fdom } from 'mve-dom';
import { Avatar } from '../avatar';

export default function ImageAvatarDemo() {
  fdom.div({
    className: 'avatar-demo',
    s_display: 'flex',
    s_gap: '16px',
    s_alignItems: 'center',
    children() {
      // 圆形图片头像
      Avatar({
        className: 'avatar-example',
        image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
        alt: '头像',
      });

      // 圆角图片头像
      Avatar({
        className: 'avatar-example',
        image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
        shape: 'round',
        alt: '头像',
      });
    },
  });
}
