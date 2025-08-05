import { fdom } from 'mve-dom';
import { Loading } from '../index';

export default function HorzDemo() {
  fdom.div({
    className: 'loading-demo--flex',
    s_display: 'flex',
    s_gap: '20px',
    s_alignItems: 'center',
    children() {
      // 横向布局 - circular
      Loading({
        layout: 'horizontal',
        text: '加载中...',
      });

      // 横向布局 - spinner
      Loading({
        theme: 'spinner',
        layout: 'horizontal',
        text: '请稍候...',
      });

      // 横向布局 - dots
      Loading({
        theme: 'dots',
        layout: 'horizontal',
        text: '处理中...',
      });
    },
  });
}
