import { fdom } from 'mve-dom';
import BaseDemo from './base';
import HorzDemo from './horz';
import VertDemo from './vert';
import PureTextDemo from './pure-text';
import SizeDemo from './size';
import SpeedDemo from './speed';
import DelayDemo from './delay';
import ext from './ext';

export default function LoadingDemos() {
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
            children: 'Loading 加载',
          });

          fdom.p({
            className: 'demo-summary',
            s_fontSize: '14px',
            s_color: '#00000073',
            s_margin: '0',
            s_lineHeight: '1.5',
            childrenType: 'text',
            children: '用于表示页面或操作的加载状态，给予用户反馈的同时减缓等待的焦虑感，由一个或一组反馈动效组成。',
          });
        },
      });

      // 01 类型
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
            children: '01 类型',
          });

          // 纯图标
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
                children: '纯图标',
              });
              BaseDemo();
            },
          });

          // 图标加文字横向
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
                children: '图标加文字横向',
              });
              HorzDemo();
            },
          });

          // 图标加文字竖向
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
                children: '图标加文字竖向',
              });
              VertDemo();
            },
          });

          // 纯文字
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
                children: '纯文字',
              });
              PureTextDemo();
            },
          });
        },
      });

      // 02 组件尺寸
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
            children: '02 组件尺寸',
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

      // 03 加载速度
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
            children: '03 加载速度',
          });

          fdom.div({
            className: 'demo-block-content',
            s_padding: '16px',
            children() {
              fdom.p({
                s_fontSize: '14px',
                s_color: '#666',
                s_margin: '0 0 16px 0',
                childrenType: 'text',
                children: '加载速度调整',
              });
              SpeedDemo();
            },
          });
        },
      });

      // 04 延迟加载
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
            children: '04 延迟加载',
          });

          fdom.div({
            className: 'demo-block-content',
            s_padding: '16px',
            children() {
              DelayDemo();
            },
          });
        },
      });

      // 04 延迟加载
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
            children: '04 延迟加载',
          });

          fdom.div({
            className: 'demo-block-content',
            s_padding: '16px',
            children() {
              ext();
            },
          });
        },
      });
    },
  });
}
