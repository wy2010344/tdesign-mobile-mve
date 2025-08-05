import { fdom } from 'mve-dom';
import { Badge } from '../index';
import { Avatar } from '../../avatar';
import { TdUser } from 'mve-icons/td';
import { TSvg } from '../../../svg';

export default function SizeDemo() {
  fdom.div({
    className: 'badge-demo-container',
    children() {
      // Large 尺寸
      fdom.div({
        className: 'summary',
        s_fontSize: '14px',
        s_color: '#666',
        s_marginBottom: '12px',
        childrenType: 'text',
        children: 'Large',
      });

      fdom.div({
        className: 'block',
        s_display: 'flex',
        s_gap: '20px',
        s_alignItems: 'center',
        s_marginBottom: '24px',
        children() {
          // 使用Badge包装Avatar
          Badge({
            count: '8',
            size: 'large',
            offset: [7, 7],
            children() {
              Avatar({
                size: 'large',
                icon() {
                  TdUser(TSvg, {
                    className: 't-icon',
                  });
                },
              });
            },
          });
        },
      });

      // Medium 尺寸
      fdom.div({
        className: 'summary',
        s_fontSize: '14px',
        s_color: '#666',
        s_marginBottom: '12px',
        childrenType: 'text',
        children: 'Medium',
      });

      fdom.div({
        className: 'block',
        s_display: 'flex',
        s_gap: '20px',
        s_alignItems: 'center',
        children() {
          Badge({
            count: '8',
            offset: [5, 5],
            children() {
              Avatar({
                icon() {
                  TdUser(TSvg, {
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
