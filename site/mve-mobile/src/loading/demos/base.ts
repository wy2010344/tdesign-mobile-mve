import { fdom } from 'mve-dom';
import { Loading } from '../index';

export default function BaseDemo() {
  fdom.div({
    className: 'loading-demo--flex',
    s_display: 'flex',
    s_gap: '20px',
    s_alignItems: 'center',
    children() {
      // 默认circular主题
      Loading({});

      // spinner主题
      Loading({
        theme: 'spinner',
      });

      // dots主题，自定义尺寸
      Loading({
        theme: 'dots',
        size: '40px',
      });
    },
  });
}
