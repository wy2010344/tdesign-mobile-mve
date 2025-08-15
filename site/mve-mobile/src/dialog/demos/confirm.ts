import { fdom } from 'mve-dom';
import { createSignal } from 'wy-helper';
import { Button } from '../../button';
import { Dialog } from '../index';
import { css } from 'wy-dom-helper';

export default function ConfirmDemo() {
  const onConfirm = () => {
    console.log('dialog:confirm');
  };

  const onCancel = () => {
    console.log('dialog: cancel');
  };

  const onClose = () => {
    console.log('dialog: close');
  };

  fdom.div({
    className: s,
    children() {
      Button({
        block: true,
        variant: 'outline',
        theme: 'primary',
        size: 'large',
        children: '确认类-带标题',
        onClick() {
          const close = Dialog({
            title: '对话框标题',
            children: '告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内',
            renderActions(callback) {
              callback({
                children: '取消',
                onClick() {
                  onCancel();
                  close();
                },
              });
              callback({
                theme: 'primary',
                children: '确认',
                onClick() {
                  onConfirm();
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
        children: '确认类-无标题',
        onClick() {
          const close = Dialog({
            children: '告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内',
            renderActions(callback) {
              callback({
                children: '取消',
                onClick() {
                  onCancel();
                  close();
                },
              });
              callback({
                children: '警示操作',
                theme: 'danger',
                onClick() {
                  onConfirm();
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
        children: '确认类-纯标题',
        onClick() {
          const close = Dialog({
            title: '对话框标题',
            renderActions(callback) {
              callback({
                children: '取消',
                onClick() {
                  onCancel();
                  close();
                },
              });
              callback({
                children: '确定',
                variant: 'base',
                theme: 'light',
                onClick() {
                  onConfirm();
                  close();
                },
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
`;
