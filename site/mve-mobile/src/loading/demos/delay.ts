import { fdom } from 'mve-dom';
import { createSignal } from 'wy-helper';
import { Loading } from '../index';

export default function DelayDemo() {
  const showLoading = createSignal(false);

  fdom.div({
    className: 'demo-content demo-content--column',
    s_display: 'flex',
    s_flexDirection: 'column',
    s_gap: '20px',
    children() {
      // 控制开关
      fdom.div({
        className: 'demo-switch',
        s_display: 'flex',
        s_alignItems: 'center',
        s_gap: '12px',
        children() {
          fdom.button({
            onClick() {
              showLoading.set(!showLoading.get());
            },
            s_padding: '8px 16px',
            s_backgroundColor: '#0052d9',
            s_color: 'white',
            s_border: 'none',
            s_borderRadius: '4px',
            s_cursor: 'pointer',
            childrenType: 'text',
            children() {
              return showLoading.get() ? '停止加载' : '开始加载';
            },
          });

          fdom.span({
            s_fontSize: '14px',
            s_color: '#666',
            childrenType: 'text',
            children() {
              return showLoading.get() ? '请求发起，延迟显示loading' : '请求结束，隐藏loading';
            },
          });
        },
      });

      // 加载演示区域
      fdom.div({
        className: 'demo-loading',
        s_height: '60px',
        s_display: 'flex',
        s_alignItems: 'center',
        s_justifyContent: 'center',
        s_border: '1px dashed #ddd',
        s_borderRadius: '4px',
        children() {
          Loading({
            delay: 1000, // 延迟1秒显示
            loading() {
              return showLoading.get();
            },
            text: '加载中...',
          });
        },
      });

      fdom.div({
        s_fontSize: '12px',
        s_color: '#999',
        s_textAlign: 'center',
        childrenType: 'text',
        children: '延迟1秒显示加载状态，防止闪烁',
      });
    },
  });
}
