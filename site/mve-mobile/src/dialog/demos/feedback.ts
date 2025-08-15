import { fdom } from 'mve-dom';
import { createSignal } from 'wy-helper';
import { Button } from '../../button';
import { Dialog } from '../index';
import { css } from 'wy-dom-helper';

export default function FeedbackDemo() {
  const content =
    '这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案';

  const onConfirm = (e: any) => {
    console.log('dialog:confirm', e);
  };

  const onClickOverlay = () => {
    console.log('dialog:clickOverlay');
  };

  fdom.div({
    className: s,
    children() {
      Button({
        block: true,
        variant: 'outline',
        theme: 'primary',
        size: 'large',
        children: '反馈类-基础',
        onClick() {
          const close = Dialog({
            title: '对话框标题',
            children: '告知当前状态、信息等内容。描述文案尽可能控制在三行内',
            renderActions(callback) {
              callback({
                children: '知道了',
                onClick() {
                  close();
                },
              });
            },
          });
        },
      });

      fdom.div({ className: 'btn-gap' });

      Button({
        block: true,
        variant: 'outline',
        theme: 'primary',
        size: 'large',
        children: '反馈类-无标题',
        onClick() {
          const close = Dialog({
            children: '告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内',
            renderActions(callback) {
              callback({
                children: '知道了',
                onClick() {
                  close();
                },
              });
            },
            dialogCloseBtn: true,
          });
        },
      });

      fdom.div({ className: 'btn-gap' });

      Button({
        block: true,
        variant: 'outline',
        theme: 'primary',
        size: 'large',
        children: '反馈类-内容超长',
        onClick() {
          const close = Dialog({
            className: s,
            title: '对话框标题',
            renderActions(callback) {
              callback({
                children: '知道了',
                onClick(e) {
                  onConfirm(e);
                  close();
                },
              });
            },
            overlayProps: {
              onClick() {
                onClickOverlay();
                close();
              },
            },
            children() {
              fdom.div({
                className: 'content-container',
                children: content,
              });
            },
          });
        },
      });
    },
  });
}

const s = css`
  .btn-gap {
    height: 16px;
  }

  .t-button + .btn-gap {
    margin-top: 16px;
  }

  .content-container {
    height: 264px;
    overflow-y: auto;
    font-size: 16px;
    color: var(--td-font-gray-2);
    line-height: 24px;
    white-space: pre-line;
  }

  .content-container::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }
`;
