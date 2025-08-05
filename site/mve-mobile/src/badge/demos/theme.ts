import { fdom } from 'mve-dom';
import { Badge } from '../index';
import { Button } from '../../button';
// import { Cell } from '../../cell';
import { TdNotification, TdShop } from 'mve-icons/td';
import { TSvg } from '../../../svg';
import { css } from 'wy-dom-helper';

const NotificationIcon = () => TdNotification(TSvg, { size: '24px' });
const ShopIcon = () => TdShop(TSvg, { size: '24px' });

export default function ThemeDemo() {
  fdom.div({
    children() {
      fdom.div({
        className: 'summary',
        children: '圆形徽标',
      });
      fdom.div({
        className: 'badge-demo',
        children() {
          Badge({
            count: '2',
            offset: [-2, -2],
            children() {
              NotificationIcon();
            },
          });
        },
      });

      fdom.div({
        className: 'summary',
        children: '方形徽标',
      });
      fdom.div({
        className: 'badge-demo',
        children() {
          Badge({
            count: '2',
            shape: 'square',
            offset: [-2, -2],
            children() {
              NotificationIcon();
            },
          });
        },
      });

      fdom.div({
        className: 'summary',
        children: '气泡徽标',
      });
      fdom.div({
        className: 'badge-demo',
        children() {
          Badge({
            count: '领积分',
            shape: 'bubble',
            aria_role: 'button',
            children() {
              Button({
                icon: ShopIcon,
                aria_label: '商店',
                shape: 'square',
                size: 'large',
              });
            },
          });
        },
      });

      fdom.div({
        className: 'summary',
        s_marginBottom: '16px',
        children: '角标',
      });
      //   Cell({
      //     title: '单行标题',
      //     note: () =>
      //       Badge({
      //         count: 'New',
      //         offset: [0, 0],
      //         shape: 'ribbon',
      //       }),
      //   });
    },
  });
}
