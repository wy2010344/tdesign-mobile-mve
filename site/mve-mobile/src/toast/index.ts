import { isFunction, isObject, isString } from 'lodash-es';
import './style';
export * from './type';
import { Toast as TToast } from './toast';
import { ToastProps } from './type';
import { createRoot, renderPortal } from 'mve-dom';
import { createPop } from 'mve-dom-helper';
import { ValueOrGet } from 'wy-helper';
import { renderOneP } from 'mve-helper';

function parseOptions(message?: Partial<ToastParams> | string) {
  if (typeof message === 'string') {
    return { children: message };
  }
  return message;
}
type ToastParams = ToastProps & {
  attach?: ValueOrGet<HTMLElement>;
  /**
   * 弹窗显示毫秒数
   * @default 2000
   */
  duration?: number;
  /**
   * 轻提示隐藏的时候触发
   */
  onClose?: () => void;
  /**
   * 轻提示销毁的时候触发
   */
  onDestroy?: () => void;
};
let instance: any = null;
export const Toast: {
  /** 展示提示 */
  (options?: Partial<ToastParams> | string): void;
  /** 展示加载提示 */
  loading: (options?: Partial<ToastParams> | string) => void;
  /** 展示成功提示 */
  success: (options?: Partial<ToastParams> | string) => void;
  /** 展示警告提示 */
  warning: (options?: Partial<ToastParams> | string) => void;
  /** 展示失败提示 */
  error: (options?: Partial<ToastParams> | string) => void;
  /** 关闭提示 */
  clear: () => void;
} = function (props: Partial<ToastParams> | string) {
  const container = typeof props == 'string' ? document.body : props.attach;
  const propsObject = {
    duration: 2000,
    ...parseOptions(props),
  };
  if (instance) {
    instance.clear();
  }
  instance = {
    clear() {
      clearTimeout(instance.timer);
      destroy(null);
      if (propsObject.onClose) {
        propsObject.onClose();
      }
      instance = null;
    },
  };

  const destroy = createPop(function () {
    renderOneP(container, function (div) {
      renderPortal(div || document.body, function () {
        TToast(propsObject);
      });
    });
  });

  if (propsObject.duration && propsObject.duration > 0) {
    instance.timer = setTimeout(() => {
      instance.clear();
      if (propsObject.onDestroy) {
        propsObject.onDestroy();
      }
    }, propsObject.duration);
  }
} as any;

Toast.clear = () => {
  if (instance) {
    instance.clear();
  }
};
(['loading', 'success', 'warning', 'error'] as const).forEach((type): void => {
  Toast[type] = (options) => {
    let props = { message: '', theme: type } as unknown as ToastParams;

    if (typeof options === 'string') {
      props.children = options;
    } else {
      props = { ...props, ...options };
    }

    Toast(props);
  };
});
