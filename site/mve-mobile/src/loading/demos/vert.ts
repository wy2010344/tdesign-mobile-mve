import { fdom } from 'mve-dom';
import { Loading } from '../index';

export default function VertDemo() {
  fdom.div({
    className: 'loading-demo--flex',
    s_display: 'flex',
    s_gap: '40px',
    s_alignItems: 'center',
    children() {
      // 竖向布局 - circular
      Loading({
        layout: 'vertical',
        text: '加载中...',
      });

      // 竖向布局 - spinner
      Loading({
        theme: 'spinner',
        layout: 'vertical',
        text: '请稍候...',
      });

      // 竖向布局 - dots
      Loading({
        theme: 'dots',
        layout: 'vertical',
        text: '处理中...',
      });
    },
  });
}
