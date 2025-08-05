import { createRoot, fdom } from 'mve-dom';
import { createSignal } from 'wy-helper';
import { Button } from '../index';
export default function () {
  // 创建一些响应式状态来演示MVE的响应式特性
  const loadingState = createSignal(false);
  const disabledState = createSignal(false);

  fdom.div({
    className: 'demo-container',
    s_padding: '20px',
    s_fontFamily: 'system-ui, sans-serif',
    children() {
      fdom.h1({
        childrenType: 'text',
        children: 'Button 组件测试 - MVE响应式演示',
      });

      // 控制面板
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
            children() {
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
                  return `切换加载状态 (当前: ${loadingState.get() ? '加载中' : '正常'})`;
                },
              });

              fdom.button({
                onClick() {
                  disabledState.set(!disabledState.get());
                },
                s_padding: '8px 16px',
                s_backgroundColor: '#6c757d',
                s_color: 'white',
                s_border: 'none',
                s_borderRadius: '4px',
                s_cursor: 'pointer',
                childrenType: 'text',
                children() {
                  return `切换禁用状态 (当前: ${disabledState.get() ? '禁用' : '启用'})`;
                },
              });
            },
          });
        },
      });

      // 响应式按钮演示
      fdom.div({
        className: 'demo-section',
        s_marginBottom: '30px',
        children() {
          fdom.h2({
            childrenType: 'text',
            children: '响应式状态演示',
          });

          fdom.div({
            className: 'demo-row',
            s_display: 'flex',
            s_gap: '12px',
            s_marginBottom: '12px',
            children() {
              Button({
                theme: 'primary',
                loading() {
                  return loadingState.get(); // 响应式loading状态
                },
                disabled() {
                  return disabledState.get(); // 响应式disabled状态
                },
                onClick() {
                  console.log('响应式按钮被点击');
                },
                children() {
                  // 响应式文本内容
                  const loading = loadingState.get();
                  const disabled = disabledState.get();

                  if (loading) return '加载中...';
                  if (disabled) return '已禁用';
                  return '响应式按钮';
                },
              });
            },
          });
        },
      });

      // 基础按钮演示
      fdom.div({
        className: 'demo-section',
        s_marginBottom: '20px',
        children() {
          fdom.h2({
            childrenType: 'text',
            children: '基础按钮',
          });

          fdom.div({
            className: 'demo-row',
            s_display: 'flex',
            s_gap: '12px',
            s_marginBottom: '12px',
            children() {
              Button({
                theme: 'primary',
                onClick() {
                  console.log('主要按钮被点击');
                },
                children: '主要按钮',
              });

              Button({
                onClick() {
                  console.log('默认按钮被点击');
                },
                children: '默认按钮',
              });

              Button({
                theme: 'danger',
                onClick() {
                  console.log('危险按钮被点击');
                },
                children: '危险按钮',
              });
            },
          });
        },
      });

      // 按钮变体演示
      fdom.div({
        className: 'demo-section',
        s_marginBottom: '20px',
        children() {
          fdom.h2({
            childrenType: 'text',
            children: '按钮变体',
          });

          fdom.div({
            className: 'demo-row',
            s_display: 'flex',
            s_gap: '12px',
            s_marginBottom: '12px',
            children() {
              Button({
                theme: 'primary',
                variant: 'outline',
                children: '描边按钮',
              });

              Button({
                theme: 'primary',
                variant: 'dashed',
                children: '虚框按钮',
              });

              Button({
                theme: 'primary',
                variant: 'text',
                children: '文字按钮',
              });
            },
          });
        },
      });

      // 按钮尺寸演示
      fdom.div({
        className: 'demo-section',
        children() {
          fdom.h2({
            childrenType: 'text',
            children: '按钮尺寸',
          });

          fdom.div({
            className: 'demo-row',
            s_display: 'flex',
            s_gap: '12px',
            s_alignItems: 'center',
            children() {
              Button({
                theme: 'primary',
                size: 'large',
                children: '大按钮',
              });

              Button({
                theme: 'primary',
                size: 'medium',
                children: '中按钮',
              });

              Button({
                theme: 'primary',
                size: 'small',
                children: '小按钮',
              });

              Button({
                theme: 'primary',
                size: 'extra-small',
                children: '超小按钮',
              });
            },
          });
        },
      });
    },
  });
}
