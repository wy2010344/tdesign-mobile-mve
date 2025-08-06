import { fdom } from 'mve-dom';
import { createSignal, mergeSet, valueOrGetToGet } from 'wy-helper';
import pluginHover from '../hooks/useHover';
import { getFormIsDisabled } from '../form';
import { renderIfP } from 'mve-helper';
import { ButtonProps } from './type';
import { Loading } from '../loading';
import { usePrefixClass } from '../hooks/useClass';
import { renderTNode } from '../_util/parseTNode';
/**
 * Button 按钮组件
 * 按钮用于开启一个闭环的操作任务，如"删除"对象、"购买"商品等。
 *
 * 这是按照MVE思维模式的实现，更接近Vue的响应式模式
 */
export function Button({
  icon,
  loadingProps,
  suffix,
  onClick,
  disabled: _disabled,
  loading: _loading = false,
  size: _size = 'medium',
  shape: _shape = 'rectangle',
  theme: _theme = 'default',
  variant: _variant = 'base',
  block: _block = false,
  ghost: _ghost = false,
  children,
  ...args
}: ButtonProps) {
  // 类名前缀 - 在MVE中直接使用字符串，类似Vue
  const buttonClass = usePrefixClass('button');

  const hover = createSignal(false);
  const disabled = getFormIsDisabled(_disabled);
  const loading = valueOrGetToGet(_loading);
  const size = valueOrGetToGet(_size);
  const shape = valueOrGetToGet(_shape);
  const theme = valueOrGetToGet(_theme);
  const variant = valueOrGetToGet(_variant);
  const block = valueOrGetToGet(_block);
  const ghost = valueOrGetToGet(_ghost);
  const className = valueOrGetToGet(args.className);
  return fdom.button({
    ...args,
    // type,
    // className必须是函数，这样才能建立响应式绑定 - 这是MVE的核心思维
    className() {
      // 在属性函数中获取动态值
      const classes = [
        buttonClass,
        `${buttonClass}--size-${size()}`,
        `${buttonClass}--${variant()}`,
        `${buttonClass}--${theme()}`,
        `${buttonClass}--${shape()}`,
      ];

      // 添加条件类名
      if (ghost()) classes.push(`${buttonClass}--ghost`);
      if (block()) classes.push(`${buttonClass}--block`);

      let canHover = true;
      if (loading()) {
        canHover = false;
        classes.push(`${buttonClass}--loading`);
      }
      if (disabled()) {
        canHover = false;
        classes.push(`${buttonClass}--disabled`);
      }
      if (canHover && hover.get()) {
        classes.push(`${buttonClass}--hover`);
      }
      const n = className();
      if (n) classes.push(n);
      return classes.join(' ');
    },
    plugin: mergeSet(pluginHover(hover), args.plugin),
    // 事件处理 - 在函数中检查状态，类似Vue的方法
    onClick(e) {
      if (!loading() && !disabled()) {
        onClick?.(e);
      } else {
        e.stopPropagation();
      }
    },
    aria_disabled: disabled,
    disabled,
    children() {
      renderIfP(
        _loading,
        function () {
          Loading({
            inheritColor: true,
            ...loadingProps,
          });
        },
        () => {
          renderTNode(icon);
        },
      );
      // 渲染按钮内容
      if (children) {
        fdom.span({
          className: `${buttonClass}__content`,
          children: children,
        });
      }

      // 渲染后缀图标
      renderTNode(suffix);
    },
  });
}
