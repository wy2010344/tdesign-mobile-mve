import { fdom } from 'mve-dom';
import { valueOrGetToGet, createSignal, storeRef, batchSignalEnd } from 'wy-helper';
import {
  FormProps,
  Data,
  FormValidateParams,
  FormValidateResult,
  FormResetParams,
  FormValidateMessage,
  ValidateResultList,
} from './type';
import { usePrefixClass } from '../hooks/useClass';
import { formContext, formDisabledContext, FormItemContext, FormItemValidateResult } from './hooks';
import { isArray, isBoolean, isEmpty, isFunction } from 'lodash-es';
export const requestSubmit = (target: HTMLFormElement) => {
  if (!(target instanceof HTMLFormElement)) {
    throw new Error('target must be HTMLFormElement');
  }
  const submitter = document.createElement('input');
  submitter.type = 'submit';
  submitter.hidden = true;
  target.appendChild(submitter);
  submitter.click();
  target.removeChild(submitter);
};

/**
 * Form 表单组件
 * 具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素
 *
 * 这是按照MVE思维模式的实现，更接近Vue的响应式模式
 */
export function Form<FormData extends Data = Data>({
  colon: _colon = false,
  contentAlign: _contentAlign = 'left',
  data: _data = {} as FormData,
  disabled: _disabled,
  errorMessage,
  labelAlign: _labelAlign = 'right',
  labelWidth: _labelWidth = '81px',
  preventSubmitDefault: _preventSubmitDefault = true,
  requiredMark: _requiredMark,
  resetType: _resetType = 'empty',
  rules,
  onSubmitFirstError = (e) => {
    e.scrollIntoView({
      behavior: 'smooth',
    });
  },
  showErrorMessage: _showErrorMessage = true,
  submitWithWarningMessage: _submitWithWarningMessage = false,
  onReset,
  onSubmit,
  children,
  ...args
}: FormProps<FormData>) {
  type Result = FormValidateResult<FormData>;

  const formClass = usePrefixClass('form');

  // 转换为响应式getter函数
  const colon = valueOrGetToGet(_colon);
  const contentAlign = valueOrGetToGet(_contentAlign);
  const disabled = valueOrGetToGet(_disabled);
  const labelAlign = valueOrGetToGet(_labelAlign);
  const labelWidth = valueOrGetToGet(_labelWidth);
  const preventSubmitDefault = valueOrGetToGet(_preventSubmitDefault);
  const requiredMark = valueOrGetToGet(_requiredMark);
  const showErrorMessage = valueOrGetToGet(_showErrorMessage);
  // 表单项集合
  const formItems: FormItemContext[] = [];
  formDisabledContext.provide(disabled);
  formContext.provide({
    showErrorMessage,
    labelWidth,
    labelAlign,
    contentAlign,
    colon,
    requiredMark,
    disabled,
    formItems,
  });
  const form = fdom.form({
    ...args,
    className: formClass,
    onSubmit(e) {
      if (preventSubmitDefault()) {
        e.preventDefault();
      }
      formItems.forEach((item) => item.showError.set(true));
      batchSignalEnd();
      const error = formItems.find((v) => {
        const x = v.validate();
        if (x) {
          if (typeof x == 'object' && x.type == 'warninig') {
            return;
          }
          return v;
        }
      });
      if (error) {
        onSubmitFirstError(error.element);
      } else {
        onSubmit?.();
      }
    },
    onReset(e) {
      if (preventSubmitDefault()) {
        e.preventDefault();
      }
      onReset?.();
    },
    children,
  });

  return {
    submit() {
      requestSubmit(form);
    },
    reset() {
      form.reset();
    },
    clearValidate() {
      formItems.forEach((child) => {
        child.showError.set(false);
      });
    },
  };
}
