import { createSignal, emptyFun, EmptyFun, GetValue, ValueOrGet, valueOrGetToGet } from 'wy-helper';
import { renderIf } from 'mve-helper';
import {
  TdCheckCircleFilled,
  TdCircle,
  TdCheck,
  TdMinus,
  TdMinusCircleFilled,
  TdMinusRectangleFilled,
  TdCheckRectangleFilled,
} from 'mve-icons/td';
import { TNode } from 'mve-dom-helper';
import { fdom } from 'mve-dom';
import { usePrefixClass } from '../hooks/useClass';
import { CheckboxGroupContext } from './checkbox-group';
import { getFormIsDisabled } from '../form';
import { TSvg } from '../../svg';
import { renderTNode } from '../_util/parseTNode';

export type CheckboxPlacement = 'left' | 'right';
export type CheckboxIcon = 'circle' | 'line' | 'rectangle' | 'none' | [EmptyFun, EmptyFun];

export type CheckboxProps = {
  borderless?: boolean;
  block?: boolean;
  icon?: CheckboxIcon;
  label?: TNode;
  maxLabelRow?: number;
  content?: TNode;
  maxContentRow?: number;
  contentDisabled?: boolean;
  disabled?: ValueOrGet<boolean>;
  checked?: ValueOrGet<boolean>;
  indeterminate?: ValueOrGet<boolean>;
  placement?: CheckboxPlacement;
  onClick?(): void;
  _inject?: TNode;
};

/**
 * 不作为input控件时,只起单纯的展示
 */
export function Checkbox({
  borderless,
  block = true,
  icon = 'circle',
  label,
  maxLabelRow = 3,
  content,
  maxContentRow = 5,
  contentDisabled,
  disabled = false,
  checked: _checked,
  indeterminate: _indeterminate = false,
  placement = 'left',
  onClick,
  _inject,
}: CheckboxProps) {
  const checkboxClass = usePrefixClass('checkbox');
  const isDisabled = valueOrGetToGet(disabled);
  const isIndeterminate = valueOrGetToGet(_indeterminate);

  let checked: GetValue<boolean>;
  let didClick: EmptyFun;

  if (typeof _checked === 'undefined') {
    const value = createSignal(false);
    checked = value.get;
    didClick = () => {
      value.set(!value.get());
      onClick?.();
    };
  } else {
    checked = valueOrGetToGet(_checked);
    didClick = onClick || emptyFun;
  }

  function toEmptyIcon(iconType: string) {
    return function () {
      fdom.div({
        className() {
          const vs = [`${checkboxClass}__icon-${iconType}`];
          if (isDisabled()) {
            vs.push(`${checkboxClass}__icon-${iconType}--disabled`);
          }
          return vs.join(' ');
        },
      });
    };
  }

  function checkboxOrgChange(e: MouseEvent) {
    if (isDisabled()) {
      return;
    }
    didClick();
  }

  fdom.div({
    className() {
      const vs = [checkboxClass, `${checkboxClass}--${placement}`];
      if (block) {
        vs.push(`${checkboxClass}--block`);
      }
      if (checked()) {
        vs.push(`${checkboxClass}--checked`);
      }
      return vs.join(' ');
    },
    onClick: checkboxOrgChange,
    children() {
      renderTNode(_inject);

      // 图标区域
      fdom.div({
        className() {
          const vs = [`${checkboxClass}__icon`, `${checkboxClass}__icon--${placement}`];
          if (checked()) {
            vs.push(`${checkboxClass}__icon--checked`);
          }
          if (isDisabled()) {
            vs.push(`${checkboxClass}__icon--disabled`);
          }
          return vs.join(' ');
        },
        children() {
          if (icon === 'circle' || icon === true) {
            renderIf(
              () => checked() || isIndeterminate(),
              function () {
                if (isIndeterminate()) {
                  TdMinusCircleFilled(TSvg, {
                    className: `${checkboxClass}__icon-wrapper`,
                  });
                } else {
                  TdCheckCircleFilled(TSvg, {
                    className: `${checkboxClass}__icon-wrapper`,
                  });
                }
              },
              function () {
                TdCircle(TSvg, {
                  className: `${checkboxClass}__icon-wrapper`,
                });
              },
            );
          } else if (icon === 'rectangle') {
            renderIf(
              () => checked() || isIndeterminate(),
              function () {
                if (isIndeterminate()) {
                  TdMinusRectangleFilled(TSvg, {
                    className: `${checkboxClass}__icon-wrapper`,
                  });
                } else {
                  TdCheckRectangleFilled(TSvg, {
                    className: `${checkboxClass}__icon-wrapper`,
                  });
                }
              },
              toEmptyIcon('rectangle'),
            );
          } else if (icon === 'line') {
            renderIf(
              () => checked() || isIndeterminate(),
              function () {
                if (isIndeterminate()) {
                  TdMinus(TSvg, {
                    className: `${checkboxClass}__icon-wrapper`,
                  });
                } else {
                  TdCheck(TSvg, {
                    className: `${checkboxClass}__icon-wrapper`,
                  });
                }
              },
              function () {
                fdom.div({
                  className: 'placeholder',
                });
              },
            );
          } else if (icon === 'none') {
            // 不显示图标
          } else if (Array.isArray(icon)) {
            renderIf(() => checked(), icon[0], icon[1]);
          }
        },
      });

      // 内容区域
      fdom.div({
        className: `${checkboxClass}__content`,
        onClick(e) {
          e.stopPropagation();
          if (contentDisabled) {
            return;
          }
          checkboxOrgChange(e);
        },
        children() {
          if (typeof label !== 'undefined') {
            fdom.div({
              className() {
                const vs = [`${checkboxClass}__title`];
                if (checked()) {
                  vs.push(`${checkboxClass}__title--checked`);
                }
                if (isDisabled()) {
                  vs.push(`${checkboxClass}__title--disabled`);
                }
                return vs.join(' ');
              },
              s_WebkitLineClamp: maxLabelRow,
              children: label,
            });
          }
          if (typeof content !== 'undefined') {
            fdom.div({
              className() {
                const vs = [`${checkboxClass}__description`];
                if (isDisabled()) {
                  vs.push(`${checkboxClass}__description--disabled`);
                }
                return vs.join(' ');
              },
              s_WebkitLineClamp: maxContentRow,
              children: content,
            });
          }
          if (!borderless) {
            fdom.div({
              className: `${checkboxClass}__border ${checkboxClass}__border--${placement}`,
            });
          }
        },
      });
    },
  });
}

export function CheckboxInput({
  value,
  readonly: _readonly,
  ...args
}: Omit<CheckboxProps, 'onClick'> & {
  readonly?: ValueOrGet<boolean>;
  value: string | number | boolean;
}) {
  const groupProps = CheckboxGroupContext.consume();
  if (!groupProps) {
    throw new Error('should render in checkbox group');
  }

  const checkboxClass = usePrefixClass('checkbox');
  const isDisabled = getFormIsDisabled(groupProps.disabled);
  const finalReadonly = () => readonly() || groupProps?.readonly();
  const checkboxChecked = () => groupProps.checkedSet.get().has(value);
  const readonly = valueOrGetToGet(_readonly);

  Checkbox({
    ...args,
    placement: args.placement ?? groupProps.placement,
    checked: checkboxChecked,
    onClick() {
      if (readonly()) {
        return;
      }

      const currentSet = new Set(groupProps.checkedSet.get());
      if (checkboxChecked()) {
        currentSet.delete(value);
      } else {
        // 检查是否超过最大选择数量
        if (groupProps.max && currentSet.size >= groupProps.max) {
          return;
        }
        currentSet.add(value);
      }
      groupProps.checkedSet.set(currentSet);
    },
    _inject() {
      fdom.input({
        type: 'checkbox',
        className: `${checkboxClass}__original`,
        value: String(value),
        name: groupProps.name,
        disabled: isDisabled,
        readOnly: finalReadonly,
        checked: checkboxChecked,
      });
    },
  });
}
