import { fdom } from 'mve-dom';
import { Image } from '../index';
import { Loading } from '../../loading';

export default function StatusDemo() {
  fdom.div({
    className: 'image-status-demo',
    children() {
      // 第一行：加载状态
      fdom.div({
        className: 'row',
        s_display: 'flex',
        s_gap: '20px',
        s_marginBottom: '24px',
        children() {
          // 加载默认提示
          fdom.div({
            className: 'col',
            s_textAlign: 'center',
            children() {
              fdom.p({
                className: 'tips',
                s_fontSize: '12px',
                s_color: '#666',
                s_marginBottom: '8px',
                childrenType: 'text',
                children: '加载默认提示',
              });

              Image({
                className: 'image-container',
                s_width: '72px',
                s_height: '72px',
                shape: 'round',
                // 没有src，会显示默认加载状态
              });
            },
          });

          // 加载自定义提示
          fdom.div({
            className: 'col',
            s_textAlign: 'center',
            children() {
              fdom.p({
                className: 'tips',
                s_fontSize: '12px',
                s_color: '#666',
                s_marginBottom: '8px',
                childrenType: 'text',
                children: '加载自定义提示',
              });

              Image({
                className: 'image-container',
                s_width: '72px',
                s_height: '72px',
                shape: 'round',
                loading() {
                  Loading({
                    theme: 'circular',
                    size: '20px',
                  });
                },
              });
            },
          });
        },
      });

      // 第二行：失败状态
      fdom.div({
        className: 'row',
        s_display: 'flex',
        s_gap: '20px',
        children() {
          // 失败默认提示
          fdom.div({
            className: 'col',
            s_textAlign: 'center',
            children() {
              fdom.p({
                className: 'tips',
                s_fontSize: '12px',
                s_color: '#666',
                s_marginBottom: '8px',
                childrenType: 'text',
                children: '失败默认提示',
              });

              Image({
                className: 'image-container',
                style: { width: '72px', height: '72px' },
                src: 'invalid-url',
                shape: 'round',
              });
            },
          });

          // 失败自定义提示
          fdom.div({
            className: 'col',
            s_textAlign: 'center',
            children() {
              fdom.p({
                className: 'tips',
                s_fontSize: '12px',
                s_color: '#666',
                s_marginBottom: '8px',
                childrenType: 'text',
                children: '失败自定义提示',
              });

              Image({
                className: 'image-container',
                s_width: '72px',
                s_height: '72px',
                src: 'invalid-url',
                shape: 'round',
                error() {
                  fdom.span({
                    s_fontSize: '12px',
                    s_color: '#999',
                    childrenType: 'text',
                    children: '加载失败',
                  });
                },
              });
            },
          });
        },
      });
    },
  });
}
