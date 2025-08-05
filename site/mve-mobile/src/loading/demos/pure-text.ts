import { fdom } from 'mve-dom';
import { Loading } from '../index';

export default function PureTextDemo() {
  fdom.div({
    className: 'loading-demo--flex',
    s_display: 'flex',
    s_gap: '20px',
    s_alignItems: 'center',
    children() {
      // 纯文字加载 - 不显示指示器
      Loading({
        indicator: false,
        text: '加载中...',
      });

      Loading({
        indicator: false,
        text: '请稍候...',
      });

      Loading({
        indicator: false,
        text: '数据处理中，请耐心等待...',
      });
    },
  });
}
