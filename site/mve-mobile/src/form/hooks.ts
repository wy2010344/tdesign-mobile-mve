import { alawaysFalse, createSignal, GetValue, StoreRef, ValueOrGet, valueOrGetToGet } from 'wy-helper';
import { createContext } from 'mve-core';
import {
  AllValidateResult,
  Data,
  FormErrorMessage,
  FormItemProps,
  FormItemValidateMessage,
  FormRule,
  FormRules,
  ValidateFun,
  ValidateResultType,
  ValidateTriggerType,
} from './type';
import { isBoolean } from 'lodash-es';
export const enum ValidateStatus {
  TO_BE_VALIDATED = 'not',
  SUCCESS = 'success',
  FAIL = 'fail',
}

/**
 * 获取表单禁用状态的hook
 * 禁用优先级: 组件 > 表单
 */
export function getFormIsDisabled(componentDisabled?: ValueOrGet<boolean | undefined>) {
  const formDisabled = formDisabledContext.consume();
  if (componentDisabled !== undefined) {
    const disabled = valueOrGetToGet(componentDisabled);
    if (formDisabled) {
      return function () {
        const n = disabled();
        if (isBoolean(n)) {
          return n;
        }
        const fd = formDisabled();
        return fd;
      };
    }
    return disabled;
  }

  if (formDisabled) {
    return formDisabled;
  }

  return alawaysFalse;
}

export const formContext = createContext<{
  showErrorMessage: GetValue<boolean>;
  labelWidth: GetValue<string | number>;
  labelAlign: GetValue<'left' | 'right' | 'top'>;
  contentAlign: GetValue<'left' | 'right'>;
  colon: GetValue<boolean>;
  requiredMark: GetValue<boolean | undefined>;
  disabled: GetValue<boolean | undefined>;
  // errorMessage: FormErrorMessage | undefined;
  formItems: FormItemContext[];
}>(undefined!);

export const formDisabledContext = createContext<GetValue<boolean | undefined> | undefined>(undefined!);
export type FormItemValidateResult<T extends Data = Data> = { [key in keyof T]: boolean | AllValidateResult[] };

export interface FormItemContext {
  element: HTMLElement;
  validate: ValidateFun;
  showError: StoreRef<boolean>;
}

export interface AnalysisValidateResult {
  successList: SuccessListType[];
  errorList: ErrorListType[];
  rules: FormRule[];
  resultList: AllValidateResult[];
  allowSetValue: boolean;
}
export type ErrorListType =
  | {
      result: false;
      message: string;
      type: 'error' | 'warning';
    }
  | ValidateResultType;

export type SuccessListType =
  | {
      result: true;
      message: string;
      type: 'success';
    }
  | ValidateResultType;
