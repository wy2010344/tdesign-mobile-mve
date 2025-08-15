import { fdom } from 'mve-dom';
import { valueOrGetToGet, createSignal, mergeSet, addEffect } from 'wy-helper';
import { InputProps } from './type';
import { renderTNode } from '../_util/parseTNode';
import { usePrefixClass } from '../hooks/useClass';
import { renderIf, renderIfP, renderOne, renderOneP } from 'mve-helper';
import { getFormIsDisabled } from '../form';
import { TdBrowse, TdBrowseOff, TdCloseCircleFilled, TdFlipToBack } from 'mve-icons/td';
import { TSvg } from '../../svg';
import { renderInput } from 'mve-dom-helper';
import getLengthLimit from '../hooks/useLengthLimit';
/**
 * Input 输入框组件
 * 用户可以在文本框内输入或编辑文字
 *
 * 这是按照MVE思维模式的实现，更接近Vue的响应式模式
 */
export function Input({
  model = createSignal(''),
  max: _max = 0,
  maxAsLength = false,
  type: _type = 'text',
  disabled: _disabled,
  clearable: _clearable = false,
  clearTrigger: _clearTrigger = 'always',
  allowInputOverMax = false,
  align: _align = 'left',
  layout: _layout = 'horizontal',
  borderless: _borderless = false,
  status: _status = 'default',
  autofocus,
  cursorColor = '#0052d9',
  label,
  prefixIcon,
  suffix,
  suffixIcon,
  tips,
  extra,
  format,
  inputProps,
  className: _className,
  triggerTime,
  ...args
}: InputProps) {
  const inputClass = usePrefixClass('input');

  // 转换为响应式getter函数
  const type = valueOrGetToGet(_type);
  const disabled = getFormIsDisabled(_disabled);
  const clearable = valueOrGetToGet(_clearable);
  const clearTrigger = valueOrGetToGet(_clearTrigger);
  const max = valueOrGetToGet(_max);
  const align = valueOrGetToGet(_align);
  const layout = valueOrGetToGet(_layout);
  const borderless = valueOrGetToGet(_borderless);
  const status = valueOrGetToGet(_status);
  const className = valueOrGetToGet(_className);

  const { getValueByLimitNumber } = getLengthLimit({
    value: model.get,
    max,
    asLength: maxAsLength,
    allowInputOverMax,
  });
  // 内部状态
  const focused = createSignal(false);
  const renderType = createSignal(type());

  const readonly = valueOrGetToGet(inputProps?.readOnly || false);

  // 计算是否显示清除按钮
  const showClear = () => {
    if (disabled() || readonly()) return false;
    if (clearable() && model.get() && String(model.get()).length > 0) {
      return clearTrigger() === 'always' || (clearTrigger() === 'focus' && focused.get());
    }
    return false;
  };

  // 处理清除
  const handleClear = (e: TouchEvent) => {
    e.preventDefault();
    model.set('');
  };

  // 处理密码显示切换
  const handlePwdIconClick = () => {
    if (disabled()) return;
    renderType.set(renderType.get() === 'password' ? 'text' : 'password');
  };

  return fdom.div({
    ...args,
    className() {
      const classes = [inputClass, `${inputClass}--layout-${layout()}`];
      if (!borderless()) {
        classes.push(`${inputClass}--border`);
      }
      const n = className();
      if (n) classes.push(n);
      return classes.join(' ');
    },
    children() {
      // 渲染前缀
      fdom.div({
        className: `${inputClass}__wrap--prefix`,
        children() {
          if (typeof prefixIcon != 'undefined') {
            fdom.div({
              className: `${inputClass}__icon--prefix`,
              children: prefixIcon,
            });
          }
          fdom.div({
            className: `${inputClass}__label`,
            children: label,
          });
        },
      });

      // 渲染输入框包装器
      fdom.div({
        className: `${inputClass}__wrap`,
        children() {
          // 渲染输入框内容
          fdom.div({
            className() {
              return `${inputClass}__content ${inputClass}--${status()}`;
            },
            children() {
              // 渲染输入框
              renderInput(
                model.get,
                (value) => {
                  model.set(getValueByLimitNumber(value));
                },

                fdom.input({
                  type: renderType.get,
                  ...inputProps,
                  'css_td-input-cursor-color': cursorColor,
                  className() {
                    const classes = [
                      `${inputClass}__control`,
                      `${inputClass}--${align()}`,
                      `${inputClass}--${status()}`,
                    ];
                    if (disabled()) classes.push(`${inputClass}__control--disabled`);
                    return classes.join(' ');
                  },
                  onFocus(e) {
                    focused.set(true);
                    inputProps?.onFocus?.(e);
                  },
                  onBlur(e) {
                    focused.set(false);
                    inputProps?.onBlur?.(e);
                  },
                  plugin: (el: HTMLInputElement) => {
                    inputProps?.plugin?.(el);
                    // 自动聚焦
                    if (autofocus) {
                      addEffect(() => {
                        el.focus();
                      });
                    }
                  },
                }),
                triggerTime,
              );

              // 渲染清除按钮
              renderIf(showClear, () => {
                fdom.div({
                  className: `${inputClass}__wrap--clearable-icon`,
                  onTouchEnd: handleClear,
                  children() {
                    TdCloseCircleFilled(TSvg);
                  },
                });
              });

              // 渲染后缀内容
              if (typeof suffix != 'undefined') {
                fdom.div({
                  className: `${inputClass}__wrap--suffix`,
                  children: suffix,
                });
              }
              // 渲染后缀图标
              const browseOff = () => {
                TdBrowseOff(TSvg, {
                  onClick: handlePwdIconClick,
                });
              };
              const browseOn = () => {
                TdBrowse(TSvg, {
                  onClick: handlePwdIconClick,
                });
              };
              renderOne(
                () => {
                  let suffix = suffixIcon;
                  const t = type();
                  if (t == 'password') {
                    const rt = renderType.get();
                    if (rt == 'password') {
                      suffix = browseOff;
                    } else if (rt == 'text') {
                      suffix = browseOn;
                    }
                  }
                  return suffix;
                },
                (suffix) => {
                  if (typeof suffix != 'undefined') {
                    fdom.div({
                      className: `${inputClass}__wrap--suffix-icon`,
                      children: suffix,
                    });
                  }
                },
              );
            },
          });

          // 渲染提示信息
          if (typeof tips != 'undefined') {
            fdom.div({
              className: `${inputClass}__tips ${inputClass}--${align()}`,
              children: tips,
            });
          }
        },
      });

      // 渲染额外内容
      renderTNode(extra);
    },
  });
}
