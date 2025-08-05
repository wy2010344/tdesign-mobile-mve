import { fdom } from 'mve-dom';
import { Avatar, AvatarGroup } from '../index';

export default function ExhibitionDemo() {
  const imageList = [
    'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
    'https://tdesign.gtimg.com/mobile/demos/avatar2.png',
    'https://tdesign.gtimg.com/mobile/demos/avatar3.png',
    'https://tdesign.gtimg.com/mobile/demos/avatar4.png',
    'https://tdesign.gtimg.com/mobile/demos/avatar5.png',
    'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
    'https://tdesign.gtimg.com/mobile/demos/avatar2.png',
    'https://tdesign.gtimg.com/mobile/demos/avatar3.png',
    'https://tdesign.gtimg.com/mobile/demos/avatar4.png',
    'https://tdesign.gtimg.com/mobile/demos/avatar5.png',
  ];

  fdom.div({
    className: 'avatar-group-demo',
    s_display: 'flex',
    s_flexDirection: 'column',
    s_gap: '20px',
    children() {
      // 左侧层叠
      fdom.div({
        s_display: 'flex',
        s_alignItems: 'center',
        s_gap: '16px',
        children() {
          fdom.span({
            s_fontSize: '14px',
            s_color: '#666',
            s_minWidth: '80px',
            childrenType: 'text',
            children: '左侧层叠:',
          });

          AvatarGroup({
            cascading: 'left-up',
            max: 5,
            children: imageList.map((url, index) => () => {
              Avatar({
                key: `exhibition-left-${index}`,
                shape: 'circle',
                image: url,
                alt: `头像${index + 1}`,
              });
            }),
          });
        },
      });

      // 右侧层叠（默认）
      fdom.div({
        s_display: 'flex',
        s_alignItems: 'center',
        s_gap: '16px',
        children() {
          fdom.span({
            s_fontSize: '14px',
            s_color: '#666',
            s_minWidth: '80px',
            childrenType: 'text',
            children: '右侧层叠:',
          });

          AvatarGroup({
            cascading: 'right-up',
            max: 5,
            children: imageList.map((url, index) => () => {
              Avatar({
                key: `exhibition-right-${index}`,
                shape: 'circle',
                image: url,
                alt: `头像${index + 1}`,
              });
            }),
          });
        },
      });

      // 不同尺寸的头像组
      fdom.div({
        s_display: 'flex',
        s_alignItems: 'center',
        s_gap: '16px',
        children() {
          fdom.span({
            s_fontSize: '14px',
            s_color: '#666',
            s_minWidth: '80px',
            childrenType: 'text',
            children: '小尺寸:',
          });

          AvatarGroup({
            size: 'small',
            max: 4,
            children: imageList.slice(0, 6).map((url, index) => () => {
              Avatar({
                key: `exhibition-small-${index}`,
                shape: 'circle',
                image: url,
                alt: `头像${index + 1}`,
              });
            }),
          });
        },
      });
    },
  });
}
