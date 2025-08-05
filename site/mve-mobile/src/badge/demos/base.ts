import { fdom } from 'mve-dom';
import { Badge } from '../index';
import { Button } from '../../button';
import { TdNotification } from 'mve-icons/td';
import { TSvg } from '../../../svg';
import { css } from 'wy-dom-helper';

const NotificationIcon = () => TdNotification(TSvg, { size: '24px' });

export default function BaseDemo() {
  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'summary',
        children: '红点徽标',
      });
      fdom.div({
        className: 'badge-demo',
        children() {
          Badge({
            dot: true,
            offset: [-4, 4],
            className: 'badge-item',
            children: '消息',
          });
          Badge({
            dot: true,
            offset: [1, -1],
            className: 'badge-item',
            children() {
              NotificationIcon();
            },
          });
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

      fdom.div({
        className: 'summary',
        children: '数字徽标',
      });
      fdom.div({
        className: 'badge-demo',
        children() {
          Badge({
            count: '8',
            children: '消息',
            offset: [-8, 0],
            className: 'badge-item',
          });
          Badge({
            count: '2',
            offset: [-2, -2],
            className: 'badge-item',
            children() {
              NotificationIcon();
            },
          });
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

      fdom.div({
        className: 'summary',
        children: '自定义徽标',
      });
      fdom.div({
        className: 'badge-demo',
        children() {
          Badge({
            count: 'NEW',
            offset: [0, 2],
            aria_role: 'button',
            children() {
              Button({
                icon: NotificationIcon,
                aria_label: '通知',
                shape: 'square',
                size: 'large',
              });
            },
          });
        },
      });
    },
  });
}

const s = css`
  .badge-demo {
    color: var(--td-text-color-primary, rgba(0, 0, 0, 0.9));
  }
`;
