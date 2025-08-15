import { fdom } from 'mve-dom';
import { createSignal } from 'wy-helper';
import { Button } from '../../button';
import { Popup } from '../index';
import { css } from 'wy-dom-helper';

export default function CustomCloseDemo() {
  const visible = createSignal(false);

  const onClose = () => visible.set(false);

  fdom.div({
    className: s,
    children() {
      Button({
        block: true,
        variant: 'outline',
        theme: 'primary',
        size: 'large',
        children: '居中弹出层-带自定义关闭按钮',
        onClick: () => visible.set(true),
      });

      Popup({
        visible: visible.get,
        placement: 'center',
        onClose,
        s_width: '240px',
        s_height: '240px',
        children() {
          fdom.div({
            s_position: 'relative',
            s_width: '100%',
            s_height: '100%',
            s_backgroundColor: '#0052d9',
            s_borderRadius: '8px',
            s_display: 'flex',
            s_alignItems: 'center',
            s_justifyContent: 'center',
            s_color: '#fff',
            children: '弹出层内容',
          });

          // 自定义关闭按钮
          fdom.div({
            className: 'close-btn',
            s_position: 'absolute',
            s_left: '50%',
            s_bottom: 'calc(-1 * (24px + 32px))',
            s_marginLeft: '-16px',
            s_width: '32px',
            s_height: '32px',
            s_borderRadius: '50%',
            s_backgroundColor: '#fff',
            s_display: 'flex',
            s_alignItems: 'center',
            s_justifyContent: 'center',
            s_cursor: 'pointer',
            s_boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            onClick: onClose,
            children() {
              fdom.span({
                children: '×',
                s_fontSize: '20px',
                s_color: '#666',
              });
            },
          });
        },
      });
    },
  });
}

const s = css`
  padding: 16px;
`;
