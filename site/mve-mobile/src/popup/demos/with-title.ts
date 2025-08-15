import { fdom } from 'mve-dom';
import { createSignal } from 'wy-helper';
import { Button } from '../../button';
import { Popup } from '../index';
import { css } from 'wy-dom-helper';

export default function WithTitleDemo() {
  const visible = createSignal(false);

  const onHide = () => visible.set(false);

  fdom.div({
    className: 'popup-demo',
    s_padding: '0 16px',
    children() {
      Button({
        block: true,
        variant: 'outline',
        theme: 'primary',
        size: 'large',
        children: '底部弹出层-带标题及操作',
        onClick: () => visible.set(true),
      });

      Popup({
        visible: visible.get,
        placement: 'bottom',
        className: s,
        onClose: onHide,
        s_height: '259px',
        children() {
          fdom.div({
            className: 'header',
            children() {
              // 取消按钮
              fdom.div({
                className: 'btn btn--cancel',
                children: '取消',
                onClick: onHide,
              });

              // 标题
              fdom.div({
                className: 'title',
                children: '标题文字',
              });

              // 确定按钮
              fdom.div({
                className: 'btn btn--confirm',
                children: '确定',
                onClick: onHide,
              });
            },
          });
        },
      });
    },
  });
}

const s = css`
  .header {
    display: flex;
    align-items: center;
    height: 58px;
    background: #fff;
  }

  .title {
    flex: 1;
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    color: var(--td-text-color-primary, rgba(0, 0, 0, 0.9));
  }

  .btn {
    font-size: 16px;
    padding: 16px;
    cursor: pointer;
  }

  .btn--cancel {
    color: var(--td-text-color-secondary, rgba(0, 0, 0, 0.6));
  }

  .btn--confirm {
    color: #0052d9;
  }
`;
