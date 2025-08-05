import { fdom } from 'mve-dom';
import { Badge } from '../index';
import { Button } from '../../button';
import { TdNotification, TdShop } from 'mve-icons/td';
import { TSvg } from '../../../svg';

export default function ThemeDemo() {
  fdom.div({
    className: 'badge-demo-container',
    children() {
      // 圆形徽标
      fdom.div({
        className: 'summary',
        s_fontSize: '14px',
        s_color: '#666',
        s_marginBottom: '12px',
        childrenType: 'text',
        children: '圆形徽标',
      });

      fdom.div({
        className: 'badge-demo',
        s_display: 'flex',
        s_gap: '20px',
        s_alignItems: 'center',
        s_marginBottom: '24px',
        children() {
          Badge({
            count: '2',
            offset: [-2, -2],
            children() {
              TdNotification(TSvg, {
                s_width: '24px',
                s_height: '24px',
              });
            },
          });
        },
      });

      // 方形徽标
      fdom.div({
        className: 'summary',
        s_fontSize: '14px',
        s_color: '#666',
        s_marginBottom: '12px',
        childrenType: 'text',
        children: '方形徽标',
      });

      fdom.div({
        className: 'badge-demo',
        s_display: 'flex',
        s_gap: '20px',
        s_alignItems: 'center',
        s_marginBottom: '24px',
        children() {
          Badge({
            count: '2',
            shape: 'square',
            offset: [-2, -2],
            children() {
              TdNotification(TSvg, {
                s_width: '24px',
                s_height: '24px',
              });
            },
          });
        },
      });

      // 气泡徽标
      fdom.div({
        className: 'summary',
        s_fontSize: '14px',
        s_color: '#666',
        s_marginBottom: '12px',
        childrenType: 'text',
        children: '气泡徽标',
      });

      fdom.div({
        className: 'badge-demo',
        s_display: 'flex',
        s_gap: '20px',
        s_alignItems: 'center',
        s_marginBottom: '24px',
        children() {
          Badge({
            count: '领积分',
            shape: 'bubble',
            children() {
              Button({
                size: 'large',
                shape: 'square',
                icon() {
                  TdShop(TSvg, {
                    className: 't-icon',
                  });
                },
              });
            },
          });
        },
      });

      // 角标
      fdom.div({
        className: 'summary',
        s_fontSize: '14px',
        s_color: '#666',
        s_marginBottom: '12px',
        childrenType: 'text',
        children: '角标',
      });

      fdom.div({
        className: 'badge-demo',
        s_display: 'flex',
        s_gap: '20px',
        s_alignItems: 'center',
        children() {
          // 简化的Cell实现
          fdom.div({
            s_display: 'flex',
            s_alignItems: 'center',
            s_justifyContent: 'space-between',
            s_padding: '12px 16px',
            s_backgroundColor: '#fff',
            s_borderRadius: '8px',
            s_border: '1px solid #e7e7e7',
            s_minWidth: '200px',
            children() {
              fdom.span({
                childrenType: 'text',
                children: '单行标题',
              });

              Badge({
                count: 'New',
                offset: [0, 0],
                shape: 'ribbon',
              });
            },
          });
        },
      });
    },
  });
}
