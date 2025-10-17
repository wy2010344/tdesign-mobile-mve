import { fdom, zdom, renderTextContent } from 'mve-dom';
import { valueOrGetToGet, createSignal, addEffect, emptyFun } from 'wy-helper';
import { TextareaProps } from './type';
import { renderTNode } from '../_util/parseTNode';
import { usePrefixClass } from '../hooks/useClass';
import { hookTrackSignal, renderIf, renderIfP } from 'mve-helper';
import { getFormIsDisabled } from '../form';
import getLengthLimit from '../hooks/useLengthLimit';
import { renderInput } from 'mve-dom-helper';
import { cns } from 'wy-dom-helper';

/**
 * Textarea 多行文本框组件
 * 用于多行文本信息输入
 *
 * 这是按照MVE思维模式的实现，更接近Vue的响应式模式
 */
export function Textarea({
  model = createSignal(''),
  disabled: _disabled,
  max: _max = 0,
  maxAsLength = false,
  allowInputOverMax,
  layout: _layout = 'horizontal',
  bordered: _bordered = false,
  autofocus,
  autosize: _autosize = false,
  indicator: _indicator = false,
  wrapperProps,
  label,
  className: _className,
  ...textAreaProps
}: TextareaProps) {
  const textareaClass = usePrefixClass('textarea');
  // 转换为响应式getter函数
  const disabled = getFormIsDisabled(_disabled);
  const max = valueOrGetToGet(_max);
  const layout = valueOrGetToGet(_layout);
  const bordered = valueOrGetToGet(_bordered);
  const autosize = valueOrGetToGet(_autosize);
  const indicator = valueOrGetToGet(_indicator);
  const className = valueOrGetToGet(_className);
  // 计算字符限制
  const { getValueByLimitNumber, length } = getLengthLimit({
    value: model.get,
    max,
    asLength: maxAsLength,
    allowInputOverMax,
  });

  // 计算文本框高度
  const calcTextareaHeight = (textareaEl: HTMLTextAreaElement, minRows?: number, maxRows?: number) => {
    // 创建隐藏的测量元素
    const computedStyle = window.getComputedStyle(textareaEl);
    const scrollHeight = textareaEl.scrollHeight;
    const lineHeight = parseInt(computedStyle.lineHeight, 10) || 20;
    if (minRows) {
      const minHeight = lineHeight * minRows;
      textareaEl.style.minHeight = `${Math.max(scrollHeight, minHeight)}px`;
    }

    if (maxRows) {
      const maxHeight = lineHeight * maxRows;
      textareaEl.style.maxHeight = `${maxHeight}px`;
      textareaEl.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
    }

    if (!minRows && !maxRows) {
      textareaEl.style.height = `${scrollHeight}px`;
    }
  };

  // 调整文本框高度
  const adjustTextareaHeight = (textareaEl: HTMLTextAreaElement) => {
    const autosizeValue = autosize();
    if (autosizeValue === true) {
      calcTextareaHeight(textareaEl);
    } else if (autosizeValue === false) {
      calcTextareaHeight(textareaEl, 1, 1);
    } else if (typeof autosizeValue === 'object') {
      const { minRows, maxRows } = autosizeValue;
      calcTextareaHeight(textareaEl, minRows, maxRows);
    } else {
      textareaEl.style.height = 'auto';
      textareaEl.style.minHeight = 'auto';
    }
  };
  return fdom.div({
    ...wrapperProps,
    className() {
      const classes = [textareaClass, `${textareaClass}--layout-${layout()}`];
      if (bordered()) {
        classes.push(`${textareaClass}--border`);
      }
      const n = className();
      if (n) classes.push(n);
      return classes.join(' ');
    },
    children() {
      // 渲染标签
      if (label !== undefined) {
        fdom.div({
          className: `${textareaClass}__label`,
          children: label,
        });
      }
      // 渲染文本框包装器
      fdom.div({
        className: `${textareaClass}__wrapper`,
        children() {
          // 渲染文本框
          const node = renderInput(
            model.get,
            (value) => {
              model.set(getValueByLimitNumber(value));
            },
            zdom.textarea({
              ...textAreaProps,
              attrsNoObserver: false,
              attrs(m) {
                textAreaProps?.attrs?.(m);
                m.className = cns(
                  m.className,
                  `${textareaClass}__wrapper-inner`,
                  disabled() && `${textareaClass}--disabled`,
                  m.readOnly && `${textareaClass}--readonly`,
                );
                m.disabled = disabled();
                addEffect(() => {
                  adjustTextareaHeight(node as HTMLTextAreaElement);
                });
              },
            }),
          );
          // 初始化高度
          if (autofocus) {
            //这里会下一周期执行,感觉不美好...
            addEffect(() => {
              node.focus();
            });
          }
          hookTrackSignal(model.get, function (value) {
            addEffect(() => {
              adjustTextareaHeight(node as HTMLTextAreaElement);
            });
          });
          // 渲染字符计数器
          renderIfP(
            () => indicator() && max(),
            () => {
              fdom.div({
                className: `${textareaClass}__indicator`,
                childrenType: 'text',
                children() {
                  return `${length()}/${max()}`;
                },
              });
            },
          );
        },
      });
    },
  });
}
