import { fdom } from 'mve-dom';
import { Avatar } from '../avatar';

export default function BadgeAvatarDemo() {
  fdom.div({
    className: 'avatar-demo',
    s_display: 'flex',
    s_gap: '20px',
    s_alignItems: 'center',
    children() {
      // 带红点徽标的头像
      fdom.div({
        s_position: 'relative',
        children() {
          Avatar({
            className: 'avatar-example',
            image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
            alt: '头像',
          });

          // 简化的徽标实现
          fdom.div({
            s_position: 'absolute',
            s_top: '0',
            s_right: '0',
            s_width: '8px',
            s_height: '8px',
            s_backgroundColor: '#e34d59',
            s_borderRadius: '50%',
            s_border: '2px solid #fff',
          });
        },
      });

      // 带数字徽标的头像
      fdom.div({
        s_position: 'relative',
        children() {
          Avatar({
            className: 'avatar-example',
            children: 'A',
          });

          // 数字徽标
          fdom.div({
            s_position: 'absolute',
            s_top: '-2px',
            s_right: '-2px',
            s_minWidth: '16px',
            s_height: '16px',
            s_backgroundColor: '#e34d59',
            s_color: '#fff',
            s_borderRadius: '8px',
            s_border: '2px solid #fff',
            s_fontSize: '10px',
            s_lineHeight: '12px',
            s_textAlign: 'center',
            s_padding: '0 4px',
            childrenType: 'text',
            children: '5',
          });
        },
      });

      // 带状态徽标的头像
      fdom.div({
        s_position: 'relative',
        children() {
          Avatar({
            className: 'avatar-example',
            shape: 'round',
            image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
            alt: '头像',
          });

          // 在线状态徽标
          fdom.div({
            s_position: 'absolute',
            s_bottom: '2px',
            s_right: '2px',
            s_width: '10px',
            s_height: '10px',
            s_backgroundColor: '#00a870',
            s_borderRadius: '50%',
            s_border: '2px solid #fff',
          });
        },
      });
    },
  });
}
