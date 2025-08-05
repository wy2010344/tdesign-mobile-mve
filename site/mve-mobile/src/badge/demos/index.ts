import { fdom } from 'mve-dom';
import BaseDemo from './base';
import ThemeDemo from './theme';
import SizeDemo from './size';

export default function BadgeDemos() {
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
            children: 'Badge 徽标',
          });

          fdom.p({
            className: 'demo-summary',
            s_fontSize: '14px',
            s_color: '#00000073',
            s_margin: '0',
            s_lineHeight: '1.5',
            childrenType: 'text',
            children: '用于告知用户，该区域的状态变化或者待处理任务的数量。',
          });
        },
      });

      // 01 组件类型
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
            children: '01 组件类型',
          });

          fdom.div({
            className: 'demo-block-content',
            s_padding: '16px',
            children() {
              BaseDemo();
            },
          });
        },
      });

      // 02 组件样式
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
            children: '02 组件样式',
          });

          fdom.div({
            className: 'demo-block-content',
            s_padding: '16px',
            children() {
              ThemeDemo();
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
