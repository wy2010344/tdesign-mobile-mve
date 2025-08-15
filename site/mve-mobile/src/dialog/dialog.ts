import { fdom } from 'mve-dom';
import { valueOrGetToGet, createSignal, emptyFun } from 'wy-helper';
import { DialogProps, DialogCloseContext } from './type';
import { renderTNode } from '../_util/parseTNode';
import { usePrefixClass } from '../hooks/useClass';
import { renderIfP } from 'mve-helper';
import { Popup } from '../popup';
import { Button } from '../button';
import { TdClose } from 'mve-icons/td';
import { TSvg } from '../../svg';
import { cns } from 'mve-dom-helper';

/**
 * Dialog 对话框组件
 * 在保留当前页面状态的情况下，告知用户并承载相关操作
 *
 * 这是按照MVE思维模式的实现，更接近Vue的响应式模式
 */
export function Dialog({
  title,
  buttonLayout: _buttonLayout = 'horizontal',
  dialogCloseBtn,
  middle,
  top,
  width: _width,
  footerFull: _footerFull,
  children,
  renderActions,
  textButton: _textButton = false,
  onCloseBtnClick,
  contentProps,
  ...args
}: DialogProps) {
  const dialogClass = usePrefixClass('dialog');

  // 转换为响应式getter函数
  const buttonLayout = valueOrGetToGet(_buttonLayout);
  const textButton = valueOrGetToGet(_textButton);
  const footerFull = valueOrGetToGet(_footerFull);
  return Popup({
    placement: 'center',
    ...args,
    overlayProps: {
      onClick: emptyFun,
      ...args.overlayProps,
    },
    className: cns(`${dialogClass}__wrapper`, args.className),
    children() {
      fdom.div({
        ...contentProps,
        className: cns(dialogClass, contentProps?.className),
        children() {
          // 渲染顶部自定义内容
          renderTNode(top);
          // 渲染关闭按钮
          renderIfP(dialogCloseBtn, () => {
            fdom.div({
              className: `${dialogClass}__close-btn`,
              children() {
                TdClose(TSvg, {
                  onClick: onCloseBtnClick || args.onClose,
                });
              },
            });
          });

          // 渲染内容区域
          fdom.div({
            className: `${dialogClass}__content`,
            children() {
              // 渲染标题
              if (typeof title != 'undefined') {
                fdom.div({
                  className: `${dialogClass}__header`,
                  children: title,
                });
              }

              // 渲染内容
              if (typeof children != 'undefined') {
                fdom.div({
                  className: `${dialogClass}__body`,
                  children() {
                    fdom.div({
                      className: `${dialogClass}__body-text`,
                      children,
                    });
                  },
                });
              }
            },
          });

          // 渲染中间自定义内容
          renderTNode(middle);
          // 渲染底部按钮区域
          fdom.div({
            className() {
              const classes = [`${dialogClass}__footer`];
              if (buttonLayout() === 'vertical') {
                classes.push(`${dialogClass}__footer--column`);
              }
              if (footerFull()) {
                classes.push(`${dialogClass}__footer--full`);
              }
              return classes.join(' ');
            },
            children() {
              renderActions?.(function (props) {
                Button({
                  ...props,
                  className: cns(props.className, `${dialogClass}__button`, function () {
                    return textButton() ? `${dialogClass}__button--text` : `${dialogClass}__button--${buttonLayout()}`;
                  }),
                });
              });
            },
          });
        },
      });
    },
  });
}
