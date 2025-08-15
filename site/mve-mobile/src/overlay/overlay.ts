import { fdom } from 'mve-dom';
import { valueOrGetToGet } from 'wy-helper';
import { OverlayProps } from './type';
import { usePrefixClass } from '../hooks/useClass';
import { hookTransition } from 'mve-dom-helper';
/**
 * Overlay 遮罩层组件
 * 创建一个遮罩层，用于强调特定的页面元素，并阻挡用户对其他页面元素进行操作
 *
 * 这是按照MVE思维模式的实现，更接近Vue的响应式模式
 */
export function Overlay({
  visible: _visible = false,
  duration: _duration = 300,
  preventScrollThrough: _preventScrollThrough = true,
  s_zIndex = 1000,
  className: _className,
  ...args
}: OverlayProps) {
  const overlayClass = usePrefixClass('overlay');

  // 转换为响应式getter函数
  const visible = valueOrGetToGet(_visible);
  const duration = valueOrGetToGet(_duration);
  const preventScrollThrough = valueOrGetToGet(_preventScrollThrough);
  const className = valueOrGetToGet(_className);
  const display = valueOrGetToGet(args.s_display);

  const t = hookTransition(visible, (afterCall) => {
    setTimeout(afterCall, duration());
  });
  const div = fdom.div({
    ...args,
    s_zIndex,
    className() {
      const classes = [overlayClass];
      classes.push(t.className(overlayClass));
      if (visible()) {
        classes.push(`${overlayClass}--active`);
      }
      const n = className();
      if (n) classes.push(n);
      return classes.join(' ');
    },
    s_display() {
      return t.didShow() ? display() : 'none';
    },
    s_transitionDuration() {
      return duration() + 'ms';
    },
    onTouchMove(e) {
      if (preventScrollThrough()) {
        e.preventDefault();
        e.stopPropagation();
      }
      args.onTouchMove?.(e);
    },
  });
  t.set.add(div);
  return div;
}
