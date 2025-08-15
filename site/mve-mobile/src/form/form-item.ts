import { fdom } from 'mve-dom';
import { valueOrGetToGet, createSignal, removeEqual, memo, GetValue, emptyFun, storeRef } from 'wy-helper';
import { FormItemProps } from './type';
import { renderTNode } from '../_util/parseTNode';
import { usePrefixClass } from '../hooks/useClass';
import { TdChevronRight } from 'mve-icons/td';
import { TSvg } from '../../svg';
import { cns } from 'mve-dom-helper';
import { hookDestroy, renderIf, renderIfP, renderOneKey } from 'mve-helper';
import { formContext, FormItemContext } from './hooks';

/**
 * FormItem 表单项组件
 * 表单中的单个字段项
 *
 * 这是按照MVE思维模式的实现，更接近Vue的响应式模式
 */
export function FormItem({
  arrow,
  contentAlign: _contentAlign,
  htmlFor: _for = '',
  help,
  label,
  labelAlign: _labelAlign,
  labelWidth: _labelWidth,
  requiredMark: _requiredMark,
  validate,
  showErrorMessage: _showErrorMessage,
  children,
  ...args
}: FormItemProps) {
  const formClass = usePrefixClass('form');
  const formItemClass = usePrefixClass('form__item');
  // 转换为响应式getter函数
  const contentAlign = valueOrGetToGet(_contentAlign);
  const forAttr = valueOrGetToGet(_for);
  const labelAlign = valueOrGetToGet(_labelAlign);
  const labelWidth = valueOrGetToGet(_labelWidth);
  const requiredMark = valueOrGetToGet(_requiredMark);
  const showErrorMessage = valueOrGetToGet(_showErrorMessage);
  // 获取表单上下文
  const form = formContext.consume();
  let getErrorMessage: GetValue<
    | {
        type: 'error' | 'warninig';
        message: string;
      }
    | undefined
    | void
  > = emptyFun;
  let renderChildren = emptyFun;
  // 注册到表单
  const formItems = form.formItems;
  const itemContext: FormItemContext = {} as any;
  if (validate) {
    const showError = createSignal(false);
    itemContext.showError = showError;
    itemContext.validate = validate;
    formItems.push(itemContext);
    hookDestroy(() => {
      removeEqual(formItems, itemContext);
    });

    itemContext.showError = showError;
    renderChildren = () => {
      children({
        showError,
      });
    };
    getErrorMessage = memo(function () {
      const itemShow = showErrorMessage();
      const formShow = form.showErrorMessage();
      if ((itemShow !== undefined ? itemShow : formShow) && showError.get()) {
        const o = validate();
        if (o) {
          if (typeof o == 'object') {
            return o;
          }
          return {
            type: 'error',
            message: o,
          };
        }
      }
    });
  } else {
    itemContext.validate = emptyFun;
    const showError = storeRef(false);
    itemContext.showError = showError;
    renderChildren = () => {
      children({
        showError,
      });
    };
  }
  // 计算属性
  const getLabelAlign = () => {
    const itemAlign = labelAlign();
    const formAlign = form.labelAlign?.();
    return itemAlign || formAlign;
  };

  const getLabelWidth = () => {
    const itemWidth = labelWidth();
    const formWidth = form.labelWidth?.();
    return itemWidth || formWidth;
  };

  const getContentAlign = () => {
    const itemAlign = contentAlign();
    const formAlign = form.contentAlign?.();
    return itemAlign || formAlign || 'left';
  };
  const getNeedRequiredMark = () => {
    const itemMark = requiredMark();
    const formMark = form.requiredMark();
    return itemMark !== undefined ? itemMark : formMark !== undefined ? formMark : false;
  };

  const getHasColon = () => {
    const formColon = form.colon();
    return !!(formColon && typeof label !== 'undefined');
  };

  itemContext.element = fdom.div({
    ...args,
    className: cns(args.className, function () {
      const classes = [formItemClass, `${formItemClass}--bordered`, `${formClass}--${getLabelAlign()}`];
      if (typeof help != 'undefined') {
        classes.push(`${formClass}__item-with-help`);
      }
      return classes.join(' ');
    }),
    children() {
      fdom.div({
        className() {
          return `${formItemClass}-wrap ${formItemClass}--${getLabelAlign()}`;
        },
        children() {
          // 渲染标签
          fdom.div({
            className() {
              const currentLabelWidth = getLabelWidth();
              const classes = [`${formClass}__label`];
              if (getNeedRequiredMark()) classes.push(`${formClass}__label--required`);
              if (getHasColon()) classes.push(`${formClass}__label--colon`);
              const align = getLabelAlign();
              if (typeof label !== 'undefined' && (align === 'top' || !currentLabelWidth)) {
                classes.push(`${formClass}__label--top`);
              } else if (align === 'left' && currentLabelWidth) {
                classes.push(`${formClass}__label--left`);
              } else if (align === 'right' && currentLabelWidth) {
                classes.push(`${formClass}__label--right`);
              }
              return classes.join(' ');
            },
            s_width: () => {
              const currentLabelWidth = getLabelWidth();
              const width = currentLabelWidth;
              if (width && getLabelAlign() !== 'top') {
                return typeof width === 'number' ? `${width}px` : width;
              }
              return undefined;
            },
            children() {
              fdom.label({
                htmlFor: forAttr,
                children() {
                  renderIf(getLabelWidth, function () {
                    renderTNode(label);
                  });
                },
              });
            },
          });
          // 渲染内容区域
          fdom.div({
            className() {
              const classes = [`${formClass}__controls`];

              // 添加错误状态类名
              const error = getErrorMessage();
              if (error) {
                console.log('err', error);
                const type = error.type || 'error';
                classes.push(type === 'error' ? `${formItemClass}--error` : `${formItemClass}--warning`);
              }

              return classes.join(' ');
            },
            s_marginLeft: () => {
              const width = getLabelWidth();
              if (width && getLabelAlign() !== 'top') {
                return typeof width === 'number' ? `${width}px` : width;
              }
              return undefined;
            },
            children() {
              // 渲染内容插槽
              fdom.div({
                className() {
                  return `${formClass}__controls-content ${formClass}__controls--${getContentAlign()}`;
                },
                children: renderChildren,
              });

              // 渲染帮助信息
              if (typeof help !== 'undefined') {
                fdom.div({
                  className() {
                    return `${formItemClass}-help ${formClass}__controls--${getContentAlign()}`;
                  },
                  children: help,
                });
              }

              renderIf(getErrorMessage, function () {
                fdom.div({
                  className() {
                    return `${formItemClass}-extra ${formClass}__controls--${getContentAlign()}`;
                  },
                  childrenType: 'text',
                  children() {
                    return getErrorMessage()?.message || '';
                  },
                });
              });
            },
          });
        },
      });

      // 渲染右侧箭头
      renderIfP(arrow, function () {
        TdChevronRight(TSvg, {
          size: '24px',
          style: { color: 'rgba(0, 0, 0, .4)' },
        });
      });
    },
  });
}
