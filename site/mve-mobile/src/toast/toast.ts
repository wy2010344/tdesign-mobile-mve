import { fdom } from 'mve-dom';
import { valueOrGetToGet, createSignal, objectMap, memo } from 'wy-helper';
import { ToastProps } from './type';
import { renderTNode } from '../_util/parseTNode';
import { usePrefixClass } from '../hooks/useClass';
import { renderIf, renderIfP, renderOne } from 'mve-helper';
import { Overlay } from '../overlay';
import { TdCheckCircle, TdCloseCircle, TdErrorCircle, TdLoading } from 'mve-icons/td';
import { TSvg } from '../../svg';
import { hookLockScroll } from 'mve-dom-helper';
const topOptions = {
  top: '25%',
  bottom: '75%',
  middle: '50%',
};

const toastTypeIcon = objectMap(
  {
    loading: TdLoading,
    success: TdCheckCircle,
    warning: TdErrorCircle,
    error: TdCloseCircle,
  },
  function (Icon, key) {
    return function () {
      Icon(TSvg);
    };
  },
);

/**
 * Toast 轻提示组件
 * 用于轻量级反馈或提示，不会打断用户操作
 *
 * 这是按照MVE思维模式的实现，更接近Vue的响应式模式
 */
export function Toast({
  icon,
  theme: _theme,
  direction: _direction = 'row',
  placement: _placement = 'middle',
  // duration = 2000,
  showOverlay,
  preventScrollThrough = false,
  overlayProps,
  children,
  className: _className,
  ...args
}: ToastProps) {
  const toastClass = usePrefixClass('toast');
  // 转换为响应式getter函数
  const theme = valueOrGetToGet(_theme);
  const direction = valueOrGetToGet(_direction);
  const placement = valueOrGetToGet(_placement);
  const className = valueOrGetToGet(_className);

  hookLockScroll(valueOrGetToGet(preventScrollThrough), toastClass);
  return fdom.div({
    ...args,
    children() {
      // 渲染遮罩层
      Overlay({
        ...overlayProps,
        preventScrollThrough,
        visible: showOverlay,
      });
      // 渲染Toast内容
      fdom.div({
        className() {
          const classes = [
            toastClass,
            `${toastClass}__content`,
            `${toastClass}--${direction()}`,
            `${toastClass}__content--${direction()}`,
          ];

          const currentTheme = theme();
          if (currentTheme == 'loading') {
            classes.push(`${toastClass}--loading`);
          }

          const n = className();
          if (n) classes.push(n);
          return classes.join(' ');
        },
        s_top() {
          return topOptions[placement()];
        },
        children() {
          // 渲染图标
          const iconContent = memo(() => {
            if (icon !== undefined) {
              return icon;
            }
            const t = theme();
            if (t) {
              return toastTypeIcon[t];
            }
          });
          renderOne(iconContent, (node) => {
            if (node != undefined) {
              fdom.div({
                className() {
                  return `${toastClass}__icon ${toastClass}__icon--${direction()}`;
                },
                children: node,
              });
            }
          });

          // 渲染消息内容
          if (children !== undefined) {
            fdom.div({
              className() {
                const classes = [`${toastClass}__text--${direction()}`];
                if (iconContent() !== undefined) {
                  classes.push(`${toastClass}__text`);
                }
                return classes.join(' ');
              },
              children,
            });
          }
        },
      });
    },
  });
}
