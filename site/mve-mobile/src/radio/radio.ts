import { fdom } from 'mve-dom';
import { usePrefixClass } from '../hooks/useClass';
import { RadioGroupContext } from './radio-group';
import { getFormIsDisabled } from '../form';
import { createSignal, emptyFun, EmptyFun, GetValue, ValueOrGet, valueOrGetToGet } from 'wy-helper';
import { renderIf } from 'mve-helper';
import { TdCheckCircleFilled, TdCheck } from 'mve-icons/td';
import { TSvg } from '../../svg';
import { TNode } from 'mve-dom-helper';
import { renderTNode } from '../_util/parseTNode';

export type RadioPlacement = 'left' | 'right';

export type RadioProps = {
  borderless?: boolean;
  block?: boolean;
  icon?: 'circle' | 'line' | 'dot' | 'none' | [EmptyFun, EmptyFun];
  label?: TNode;
  maxLabelRow?: number;
  content?: TNode;
  maxContentRow?: number;
  contentDisabled?: boolean;
  disabled?: ValueOrGet<boolean>;
  checked?: ValueOrGet<boolean>;
  placement?: RadioPlacement;
  onClick?(): void;
  allowUncheck?: boolean;
  _inject?: TNode;
};
/**
 * 不作为input控件时,只起单纯的展示
 * @param param0
 */
export function Radio({
  allowUncheck = true,
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
  placement = 'left',
  onClick,
  _inject,
}: RadioProps) {
  const radioClass = usePrefixClass('radio');
  const isDisabled = valueOrGetToGet(disabled);
  let checked: GetValue<boolean>;
  let didClick: EmptyFun;
  if (typeof _checked == 'undefined') {
    const value = createSignal(false);
    checked = value.get;
    didClick = () => {
      value.set(!value.get());
      console.log('v', value.get());
      onClick?.();
    };
  } else {
    checked = valueOrGetToGet(_checked);
    didClick = onClick || emptyFun;
  }

  function toEmptyIcon(icon: string) {
    return function () {
      fdom.div({
        className() {
          const vs = [`${radioClass}__icon-${icon}`];
          if (isDisabled()) {
            vs.push(`${radioClass}__icon-${icon}--disabled`);
          }
          return vs.join(' ');
        },
      });
    };
  }

  function radioOrgChange(e: MouseEvent) {
    if (isDisabled()) {
      return;
    }
    if (checked()) {
      if (allowUncheck) {
        didClick();
      }
    } else {
      didClick();
    }
  }
  fdom.div({
    className() {
      const vs = [radioClass, `${radioClass}--${placement}`];
      if (block) {
        vs.push(`${radioClass}--block`);
      }
      return vs.join(' ');
    },
    onClick: radioOrgChange,
    children() {
      renderTNode(_inject);
      //只需要这个input起屏幕阅读器的阅读作用
      fdom.div({
        className() {
          const vs = [`${radioClass}__icon`, `${radioClass}__icon--${placement}`];
          if (checked()) {
            vs.push(`${radioClass}__icon--checked`);
          }
          if (isDisabled()) {
            vs.push(`${radioClass}__icon--disabled`);
          }
          return vs.join(' ');
        },
        children() {
          if (icon == 'circle') {
            renderIf(
              checked,
              function () {
                TdCheckCircleFilled(TSvg, {
                  className: `${radioClass}__icon-wrap`,
                });
              },
              toEmptyIcon(icon),
            );
          } else if (icon == 'line') {
            renderIf(
              checked,
              function () {
                TdCheck(TSvg, {
                  className: `${radioClass}__icon-wrap`,
                });
              },
              function () {
                fdom.div({
                  className: 'placeholder',
                });
              },
            );
          } else if (icon == 'dot') {
            renderIf(checked, toEmptyIcon(icon), toEmptyIcon('circle'));
          } else if (icon == 'none') {
          } else {
            renderIf(checked, icon[0], icon[1]);
          }
        },
      });
      fdom.div({
        className: `${radioClass}__content`,
        onClick(e) {
          e.stopPropagation();
          if (contentDisabled) {
            return;
          }
          radioOrgChange(e);
        },
        children() {
          if (typeof label != 'undefined') {
            fdom.span({
              className() {
                const vs = [`${radioClass}__title`];
                if (isDisabled()) {
                  vs.push(`${radioClass}__title--disabled`);
                }
                return vs.join(' ');
              },
              s_WebkitLineClamp: maxLabelRow,
              children: label,
            });
          }
          if (typeof content != 'undefined') {
            fdom.div({
              s_WebkitLineClamp: maxContentRow,
              children: content,
            });
          }
          if (!borderless) {
            fdom.div({
              className: `${radioClass}__border ${radioClass}__border--${placement}`,
            });
          }
        },
      });
    },
  });
}

export function RadioInput({
  value,
  readonly: _readonly,
  ...args
}: Omit<RadioProps, 'onClick'> & {
  readonly?: ValueOrGet<boolean>;
  value: string;
}) {
  const groupProps = RadioGroupContext.consume();
  if (!groupProps) {
    throw 'should render in radio group';
  }
  const radioClass = usePrefixClass('radio');
  const isDisabled = getFormIsDisabled(groupProps.disabled);
  const finalReadonly = () => readonly() || groupProps?.readonly();
  const radioChecked = () => groupProps.model.get() == value;
  const finalAllowUncheck = args.allowUncheck ?? groupProps.allowUncheck;
  const readonly = valueOrGetToGet(_readonly);
  Radio({
    ...args,
    placement: args.placement ?? groupProps.placement,
    checked: radioChecked,
    onClick() {
      if (readonly()) {
        return;
      }
      groupProps?.model.set(finalAllowUncheck && radioChecked() ? undefined : value);
    },
    _inject() {
      fdom.input({
        type: 'radio',
        className: `${radioClass}__original`,
        value,
        name: groupProps.name,
        disabled: isDisabled,
        readOnly: finalReadonly,
        checked: radioChecked,
      });
    },
  });
}
