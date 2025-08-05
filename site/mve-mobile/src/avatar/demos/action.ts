import { fdom } from 'mve-dom';
import { Avatar, AvatarGroup } from '../index';
import { TdUserAdd } from 'mve-icons/td';
import { TSvg } from '../../../svg';

export default function ActionDemo() {
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
      // 带自定义折叠图标的头像组
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
            children: '添加图标:',
          });

          AvatarGroup({
            max: 5,
            collapseAvatar() {
              TdUserAdd(TSvg, {
                className: 't-icon',
                s_fontSize: '20px',
              });
            },
            onCollapsedItemClick(context) {
              console.log('点击了折叠头像', context);
              alert('点击了添加用户按钮');
            },
            children: imageList.map((url, index) => () => {
              Avatar({
                shape: 'circle',
                image: url,
                alt: `头像${index + 1}`,
              });
            }),
          });
        },
      });

      // 带自定义文字的头像组
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
            children: '自定义文字:',
          });

          AvatarGroup({
            max: 3,
            collapseAvatar: '更多',
            onCollapsedItemClick(context) {
              console.log('点击了更多按钮', context);
              alert('查看更多用户');
            },
            children: imageList.slice(0, 8).map((url, index) => () => {
              Avatar({
                key: `action-text-${index}`,
                shape: 'circle',
                image: url,
                alt: `头像${index + 1}`,
              });
            }),
          });
        },
      });

      // 混合内容的头像组
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
            children: '混合内容:',
          });

          AvatarGroup({
            max: 4,
            shape: 'round',
            onCollapsedItemClick(context) {
              console.log('点击了折叠头像', context);
            },
            children: [
              () =>
                Avatar({
                  image: imageList[0],
                  alt: '头像1',
                }),
              () =>
                Avatar({
                  children: 'A',
                }),
              () =>
                Avatar({
                  icon() {
                    TdUserAdd(TSvg, { className: 't-icon' });
                  },
                }),
              () =>
                Avatar({
                  image: imageList[1],
                  alt: '头像2',
                }),
              () =>
                Avatar({
                  children: 'B',
                }),
              () =>
                Avatar({
                  image: imageList[2],
                  alt: '头像3',
                }),
            ],
          });
        },
      });
    },
  });
}
