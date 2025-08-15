import { fdom, renderPortal } from 'mve-dom';
import { valueOrGetToGet, EmptyFun, FalseType } from 'wy-helper';
import { PopupProps } from './type';
import { renderTNode } from '../_util/parseTNode';
import { usePrefixClass } from '../hooks/useClass';
import { renderIf, renderIfP, renderOneP } from 'mve-helper';
import { Overlay } from '../overlay';
import { cns, hookLockScroll, hookTransition } from 'mve-dom-helper';
import { TdClose } from 'mve-icons/td';
import { TSvg } from '../../svg';
function renderOrPortal(fun: EmptyFun, target?: HTMLElement | FalseType) {
  if (target) {
    return renderPortal(target, fun);
  }
  fun();
}
export function Popup({
  attach = document.body,
  visible: _visible = false,
  placement: _placement = 'center',
  showOverlay: _showOverlay = true,
  showCloseBtn,
  closeBtn = () => {
    TdClose(TSvg, {
      size: '20px',
    });
  },
  preventScrollThrough: _preventScrollThrough = true,
  destroyOnClose: _destroyOnClose = false,
  duration: _duration = 240,
  transitionName: _transitionName,
  onClose,
  onOpened,
  onClosed,
  children,
  overlayProps,
  s_display: _s_display,
  ...args
}: PopupProps) {
  const popupClass = usePrefixClass('popup');
  // 转换为响应式getter函数
  const visible = valueOrGetToGet(_visible);
  const placement = valueOrGetToGet(_placement);
  const showOverlay = valueOrGetToGet(_showOverlay);
  const preventScrollThrough = valueOrGetToGet(_preventScrollThrough);
  const destroyOnClose = valueOrGetToGet(_destroyOnClose);
  const duration = valueOrGetToGet(_duration);
  const transitionName = valueOrGetToGet(_transitionName);
  const s_display = valueOrGetToGet(_s_display);

  const t = hookTransition(visible, function (callback, show) {
    setTimeout(() => {
      callback();
      if (show) {
        onOpened?.();
      } else {
        onClosed?.();
      }
    }, duration());
  });
  // 处理关闭按钮点击
  renderIf(
    () => !destroyOnClose() || t.didShow(),
    () => {
      renderOneP(attach, function (attach) {
        renderOrPortal(function () {
          const overlayOnClick = overlayProps?.onClick || onClose;
          Overlay({
            ...overlayProps,
            visible() {
              return visible() && showOverlay();
            },
            onClick: overlayOnClick,
          });

          const div = fdom.div({
            s_zIndex: 1500,
            ...args,
            s_display() {
              return t.didShow() ? s_display() : 'none';
            },
            className: cns(args.className, function () {
              const classes = [popupClass, `${popupClass}--${placement()}`];
              const tn = transitionName();
              if (tn) {
                classes.push(t.className(tn));
              } else {
                let prefix = '';
                if (placement() === 'center') prefix = 'fade-zoom';
                else prefix = `slide-${placement()}`;
                classes.push(t.className(prefix));
              }
              return classes.join(' ');
            }),
            children() {
              // 渲染关闭按钮
              renderIfP(showCloseBtn, () => {
                fdom.div({
                  className: `${popupClass}__close`,
                  onClick: onClose,
                  children: closeBtn,
                });
              });
              renderTNode(children);
            },
          });
          hookLockScroll(
            () => {
              return t.didShow() && preventScrollThrough();
            },
            popupClass,
            div,
          );
        }, attach);
      });
    },
  );
}
