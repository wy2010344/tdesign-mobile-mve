import { fdom, FPDomAttributes } from 'mve-dom';
import { createSignal, mergeSet, valueOrGetToGet } from 'wy-helper';
import pluginHover from '../hooks/useHover';
import { getFormIsDisabled } from '../form';
import { renderIf } from 'mve-helper';
import { ButtonProps } from './type';
import { Loading } from '../loading';
/**
 * Button 按钮组件
 * 按钮用于开启一个闭环的操作任务，如"删除"对象、"购买"商品等。
 *
 * 这是按照MVE思维模式的实现，更接近Vue的响应式模式
 */
export function Button(props: ButtonProps) {
  // 设置默认值 - 直接在解构中设置，类似Vue的props默认值
  const { icon, loadingProps, suffix, onClick, ...args } = props;
  // 类名前缀 - 在MVE中直接使用字符串，类似Vue
  const buttonClass = 't-button';

  const hover = createSignal(false);
  const disabled = getFormIsDisabled(props.disabled);
  const loading = valueOrGetToGet(props.loading || false);
  const size = valueOrGetToGet(props.size || 'medium');
  const shape = valueOrGetToGet(props.shape || 'rectangle');
  const theme = valueOrGetToGet(props.theme || 'default');
  const variant = valueOrGetToGet(props.variant || 'base');
  const block = valueOrGetToGet(props.block || false);
  const ghost = valueOrGetToGet(props.ghost || false);
  const className = valueOrGetToGet(props.className);
  return fdom.button({
    ...(args as FPDomAttributes<'button'>),
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
    disabled,
    children() {
      renderIf(
        props.loading,
        function () {
          Loading({
            inheritColor: true,
            ...loadingProps,
          });
        },
        icon,
      );
      // 渲染按钮内容
      if (props.children) {
        fdom.span({
          className: `${buttonClass}__content`,
          childrenType: props.childrenType,
          children: props.children,
        } as any);
      }

      // 渲染后缀图标
      suffix?.();
    },
  });
}
