import { fdom } from 'mve-dom';
import ImageAvatarDemo from './image-avatar';
import CharacterAvatarDemo from './character-avatar';
import IconAvatarDemo from './icon-avatar';
import BadgeAvatarDemo from './badge-avatar';
import ExhibitionDemo from './exhibition';
import ActionDemo from './action';
import SizeDemo from './size';

export default function AvatarDemos() {
  fdom.div({
    className: 'tdesign-mobile-demo',
    children() {
      // 页面标题
      fdom.div({
        className: 'demo-header',
        s_padding: '20px',
        s_textAlign: 'center',
        children() {
          fdom.h1({
            className: 'demo-title',
            s_fontSize: '24px',
            s_fontWeight: '600',
            s_color: '#000000d9',
            s_margin: '0 0 8px 0',
            childrenType: 'text',
            children: 'Avatar 头像',
          });

          fdom.p({
            className: 'demo-summary',
            s_fontSize: '14px',
            s_color: '#00000073',
            s_margin: '0',
            s_lineHeight: '1.5',
            childrenType: 'text',
            children: '用于展示用户头像信息，除了纯展示也可点击进入个人详情等操作。',
          });
        },
      });

      // 01 头像类型
      fdom.div({
        className: 'demo-block',
        s_backgroundColor: '#ffffff',
        s_borderRadius: '8px',
        s_margin: '0 16px 16px 16px',
        s_overflow: 'hidden',
        children() {
          fdom.h2({
            className: 'demo-block-title',
            s_fontSize: '16px',
            s_fontWeight: '600',
            s_color: '#000000d9',
            s_margin: '0',
            s_padding: '16px 16px 0 16px',
            childrenType: 'text',
            children: '01 头像类型',
          });

          // 图片头像
          fdom.div({
            className: 'demo-block-content',
            s_padding: '16px',
            children() {
              fdom.h3({
                className: 'demo-block-subtitle',
                s_fontSize: '14px',
                s_fontWeight: '500',
                s_color: '#000000d9',
                s_margin: '0 0 12px 0',
                childrenType: 'text',
                children: '图片头像',
              });
              ImageAvatarDemo();
            },
          });

          // 字符头像
          fdom.div({
            className: 'demo-block-content',
            s_padding: '0 16px 16px 16px',
            children() {
              fdom.h3({
                className: 'demo-block-subtitle',
                s_fontSize: '14px',
                s_fontWeight: '500',
                s_color: '#000000d9',
                s_margin: '16px 0 12px 0',
                childrenType: 'text',
                children: '字符头像',
              });
              CharacterAvatarDemo();
            },
          });

          // 图标头像
          fdom.div({
            className: 'demo-block-content',
            s_padding: '0 16px 16px 16px',
            children() {
              fdom.h3({
                className: 'demo-block-subtitle',
                s_fontSize: '14px',
                s_fontWeight: '500',
                s_color: '#000000d9',
                s_margin: '16px 0 12px 0',
                childrenType: 'text',
                children: '图标头像',
              });
              IconAvatarDemo();
            },
          });

          // 徽标头像
          fdom.div({
            className: 'demo-block-content',
            s_padding: '0 16px 16px 16px',
            children() {
              fdom.h3({
                className: 'demo-block-subtitle',
                s_fontSize: '14px',
                s_fontWeight: '500',
                s_color: '#000000d9',
                s_margin: '16px 0 12px 0',
                childrenType: 'text',
                children: '徽标头像',
              });
              BadgeAvatarDemo();
            },
          });
        },
      });

      // 02 特殊类型
      fdom.div({
        className: 'demo-block',
        s_backgroundColor: '#ffffff',
        s_borderRadius: '8px',
        s_margin: '0 16px 16px 16px',
        s_overflow: 'hidden',
        children() {
          fdom.h2({
            className: 'demo-block-title',
            s_fontSize: '16px',
            s_fontWeight: '600',
            s_color: '#000000d9',
            s_margin: '0',
            s_padding: '16px 16px 0 16px',
            childrenType: 'text',
            children: '02 特殊类型',
          });

          // 纯展示的头像组
          fdom.div({
            className: 'demo-block-content',
            s_padding: '16px',
            children() {
              fdom.h3({
                className: 'demo-block-subtitle',
                s_fontSize: '14px',
                s_fontWeight: '500',
                s_color: '#000000d9',
                s_margin: '0 0 12px 0',
                childrenType: 'text',
                children: '纯展示的头像组',
              });
              ExhibitionDemo();
            },
          });

          // 带操作的头像组
          fdom.div({
            className: 'demo-block-content',
            s_padding: '0 16px 16px 16px',
            children() {
              fdom.h3({
                className: 'demo-block-subtitle',
                s_fontSize: '14px',
                s_fontWeight: '500',
                s_color: '#000000d9',
                s_margin: '16px 0 12px 0',
                childrenType: 'text',
                children: '带操作的头像组',
              });
              ActionDemo();
            },
          });
        },
      });

      // 03 组件尺寸
      fdom.div({
        className: 'demo-block',
        s_backgroundColor: '#ffffff',
        s_borderRadius: '8px',
        s_margin: '0 16px 16px 16px',
        s_overflow: 'hidden',
        children() {
          fdom.h2({
            className: 'demo-block-title',
            s_fontSize: '16px',
            s_fontWeight: '600',
            s_color: '#000000d9',
            s_margin: '0',
            s_padding: '16px 16px 0 16px',
            childrenType: 'text',
            children: '03 组件尺寸',
          });

          fdom.div({
            className: 'demo-block-content',
            s_padding: '16px',
            children() {
              SizeDemo();
            },
          });
        },
      });
    },
  });
}
