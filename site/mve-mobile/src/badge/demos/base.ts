import { fdom } from 'mve-dom';
import { Badge } from '../index';
import { Button } from '../../button';
import { TdNotification } from 'mve-icons/td';
import { TSvg } from '../../../svg';
export default function BaseDemo() {
  fdom.div({
    className: 'badge-demo-container',
    children() {
      // 红点徽标
      fdom.div({
        className: 'summary',
        s_fontSize: '14px',
        s_color: '#666',
        s_marginBottom: '12px',
        childrenType: 'text',
        children: '红点徽标',
      });

      fdom.div({
        className: 'badge-demo',
        s_display: 'flex',
        s_gap: '20px',
        s_alignItems: 'center',
        s_marginBottom: '24px',
        children() {
          // 文字 + 红点
          Badge({
            dot: true,
            className: 'badge-item',
            content: '消息',
          });

          // 图标 + 红点
          Badge({
            dot: true,
            offset: [1, -1],
            className: 'badge-item',
            children() {
              TdNotification(TSvg, {
                s_width: '24px',
                s_height: '24px',
              });
            },
          });

          // 按钮 + 红点
          Badge({
            dot: true,
            offset: [1, 1],
            className: 'badge-item',
            children() {
              Button({
                children: '按钮',
              });
            },
          });
        },
      });

      // 数字徽标
      fdom.div({
        className: 'summary',
        s_fontSize: '14px',
        s_color: '#666',
        s_marginBottom: '12px',
        childrenType: 'text',
        children: '数字徽标',
      });

      fdom.div({
        className: 'badge-demo',
        s_display: 'flex',
        s_gap: '20px',
        s_alignItems: 'center',
        s_marginBottom: '24px',
        children() {
          // 文字 + 数字
          Badge({
            count: '8',
            content: '消息',
            offset: [-8, 0],
            className: 'badge-item',
          });

          // 图标 + 数字
          Badge({
            count: '2',
            offset: [-2, -2],
            className: 'badge-item',
            children() {
              TdNotification(TSvg, {
                s_width: '24px',
                s_height: '24px',
              });
            },
          });

          // 按钮 + 数字
          Badge({
            count: '8',
            offset: [2, 2],
            className: 'badge-item',
            children() {
              Button({
                children: '按钮',
              });
            },
          });
        },
      });

      // 自定义徽标
      fdom.div({
        className: 'summary',
        s_fontSize: '14px',
        s_color: '#666',
        s_marginBottom: '12px',
        childrenType: 'text',
        children: '自定义徽标',
      });

      fdom.div({
        className: 'badge-demo',
        s_display: 'flex',
        s_gap: '20px',
        s_alignItems: 'center',
        children() {
          Badge({
            count: 'NEW',
            offset: [0, 2],
            children() {
              Button({
                size: 'large',
                shape: 'square',
                icon() {
                  TdNotification(TSvg, {
                    className: 't-icon',
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
