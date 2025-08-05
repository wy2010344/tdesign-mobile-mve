import { fdom } from 'mve-dom';
import { Loading } from '../index';

export default function SizeDemo() {
  fdom.div({
    className: 'loading-demo',
    children() {
      // 大尺寸
      fdom.div({
        className: 'loading-demo__item',
        s_marginBottom: '24px',
        children() {
          fdom.div({
            className: 'loading-demo__summary',
            s_marginBottom: '16px',
            s_fontSize: '14px',
            s_color: '#666',
            childrenType: 'text',
            children: '大尺寸',
          });

          Loading({
            size: '26px',
            text: '加载中...',
          });
        },
      });

      // 中尺寸
      fdom.div({
        className: 'loading-demo__item',
        s_marginBottom: '24px',
        children() {
          fdom.div({
            className: 'loading-demo__summary',
            s_marginBottom: '16px',
            s_fontSize: '14px',
            s_color: '#666',
            childrenType: 'text',
            children: '中尺寸',
          });

          Loading({
            size: '22px',
            text: '加载中...',
          });
        },
      });

      // 小尺寸
      fdom.div({
        className: 'loading-demo__item',
        children() {
          fdom.div({
            className: 'loading-demo__summary',
            s_marginBottom: '16px',
            s_fontSize: '14px',
            s_color: '#666',
            childrenType: 'text',
            children: '小尺寸',
          });

          Loading({
            size: '20px',
            text: '加载中...',
          });
        },
      });
    },
  });
}
