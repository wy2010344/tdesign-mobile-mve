import { createRoot, fdom } from 'mve-dom';
import { createSignal } from 'wy-helper';
import { Loading } from '../index';
export default function () {
  // 创建一些响应式状态来演示MVE的响应式特性
  const loadingState = createSignal(false);
  const themeState = createSignal<'circular' | 'spinner' | 'dots'>('circular');
  const sizeState = createSignal('20px');

  fdom.div({
    className: 'demo-container',
    s_fontFamily: 'system-ui, sans-serif',
    children() {
      fdom.div({
        s_padding: '20px',
        s_backgroundColor: '#fff',
        s_marginBottom: '20px',
        children() {
          fdom.h1({
            childrenType: 'text',
            children: 'Loading 组件测试 - MVE响应式演示',
          });

          // 响应式控制面板
          fdom.div({
            className: 'demo-controls',
            s_marginBottom: '30px',
            s_padding: '15px',
            s_backgroundColor: '#f5f5f5',
            s_borderRadius: '8px',
            children() {
              fdom.h3({
                childrenType: 'text',
                children: '响应式控制面板',
              });

              fdom.div({
                s_display: 'flex',
                s_gap: '12px',
                s_marginTop: '10px',
                s_flexWrap: 'wrap',
                children() {
                  // 切换加载状态
                  fdom.button({
                    onClick() {
                      loadingState.set(!loadingState.get());
                    },
                    s_padding: '8px 16px',
                    s_backgroundColor: '#007bff',
                    s_color: 'white',
                    s_border: 'none',
                    s_borderRadius: '4px',
                    s_cursor: 'pointer',
                    childrenType: 'text',
                    children() {
                      return `切换加载状态 (${loadingState.get() ? '加载中' : '已停止'})`;
                    },
                  });

                  // 切换主题
                  fdom.button({
                    onClick() {
                      const themes: Array<'circular' | 'spinner' | 'dots'> = ['circular', 'spinner', 'dots'];
                      const currentIndex = themes.indexOf(themeState.get());
                      const nextIndex = (currentIndex + 1) % themes.length;
                      themeState.set(themes[nextIndex]);
                    },
                    s_padding: '8px 16px',
                    s_backgroundColor: '#28a745',
                    s_color: 'white',
                    s_border: 'none',
                    s_borderRadius: '4px',
                    s_cursor: 'pointer',
                    childrenType: 'text',
                    children() {
                      return `切换主题 (${themeState.get()})`;
                    },
                  });

                  // 切换尺寸
                  fdom.button({
                    onClick() {
                      const sizes = ['16px', '20px', '24px', '32px'];
                      const currentIndex = sizes.indexOf(sizeState.get());
                      const nextIndex = (currentIndex + 1) % sizes.length;
                      sizeState.set(sizes[nextIndex]);
                    },
                    s_padding: '8px 16px',
                    s_backgroundColor: '#ffc107',
                    s_color: 'black',
                    s_border: 'none',
                    s_borderRadius: '4px',
                    s_cursor: 'pointer',
                    childrenType: 'text',
                    children() {
                      return `切换尺寸 (${sizeState.get()})`;
                    },
                  });
                },
              });
            },
          });

          // 响应式Loading演示
          fdom.div({
            className: 'demo-section',
            s_marginBottom: '30px',
            children() {
              fdom.h2({
                childrenType: 'text',
                children: '响应式Loading演示',
              });

              fdom.div({
                s_display: 'flex',
                s_gap: '20px',
                s_alignItems: 'center',
                s_padding: '20px',
                s_border: '1px dashed #ddd',
                s_borderRadius: '8px',
                s_backgroundColor: '#fafafa',
                children() {
                  // 基础响应式Loading
                  Loading({
                    loading() {
                      return loadingState.get();
                    },
                    theme() {
                      return themeState.get();
                    },
                    size() {
                      return sizeState.get();
                    },
                    text() {
                      return loadingState.get() ? '响应式加载中...' : '';
                    },
                  });

                  // 带文字的竖向Loading
                  Loading({
                    loading() {
                      return loadingState.get();
                    },
                    theme() {
                      return themeState.get();
                    },
                    size() {
                      return sizeState.get();
                    },
                    layout: 'vertical',
                    text() {
                      const theme = themeState.get();
                      const size = sizeState.get();
                      return loadingState.get() ? `${theme} - ${size}` : '';
                    },
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
