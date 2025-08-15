/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { FDomAttributes, FPDomAttributes } from 'mve-dom';
import { ValueOrGet, StoreRef, GetValue, EmptyFun } from 'wy-helper';
import { TNode } from '../common';

export type FormProps<FormData extends Data = Data> = {
  /**
   * 是否在表单标签字段右侧显示冒号
   * @default false
   */
  colon?: ValueOrGet<boolean>;
  /**
   * 表单内容对齐方式：左对齐、右对齐
   * @default left
   */
  contentAlign?: ValueOrGet<'left' | 'right'>;
  /**
   * 表单数据
   * @default {}
   */
  data?: ValueOrGet<FormData>;
  /**
   * 是否禁用整个表单
   */
  disabled?: ValueOrGet<boolean>;
  /**
   * 表单错误信息配置，示例：`{ idcard: '请输入正确的身份证号码', max: '字符长度不能超过 ${max}' }`
   */
  errorMessage?: FormErrorMessage;
  /**
   * 表单字段标签对齐方式：左对齐、右对齐、顶部对齐
   * @default right
   */
  labelAlign?: ValueOrGet<'left' | 'right' | 'top'>;
  /**
   * 可以整体设置label标签宽度，默认为81px
   * @default '81px'
   */
  labelWidth?: ValueOrGet<string | number>;
  /**
   * 是否阻止表单提交默认事件（表单提交默认事件会刷新页面），设置为 `true` 可以避免刷新
   * @default true
   */
  preventSubmitDefault?: ValueOrGet<boolean>;
  /**
   * 是否显示必填符号（*），默认显示
   */
  requiredMark?: ValueOrGet<boolean>;
  /**
   * 重置表单的方式，值为 empty 表示重置表单为空，值为 initial 表示重置表单数据为初始值
   * @default empty
   */
  resetType?: ValueOrGet<'empty' | 'initial'>;
  /**
   * 表单校验不通过时，是否自动滚动到第一个校验不通过的字段，平滑滚动或是瞬间直达。值为空则表示不滚动
   */
  onSubmitFirstError?(e: HTMLElement): void;
  /**
   * 校验不通过时，是否显示错误提示信息，统一控制全部表单项。如果希望控制单个表单项，请给 FormItem 设置该属性
   * @default true
   */
  showErrorMessage?: ValueOrGet<boolean>;
  /**
   * 【讨论中】当校验结果只有告警信息时，是否触发 `submit` 提交事件
   * @default false
   */
  submitWithWarningMessage?: ValueOrGet<boolean>;
  /**
   * 表单重置时触发
   */
  onReset?: EmptyFun;
  /**
   * 表单提交时触发
   */
  onSubmit?: EmptyFun;
  children?: TNode;
} & FPDomAttributes<'form'>;

export type FormItemProps = {
  /**
   * 是否显示右侧箭头
   * @default false
   */
  arrow?: ValueOrGet<boolean>;
  /**
   * 表单内容对齐方式：左对齐、右对齐
   * @default left
   */
  contentAlign?: ValueOrGet<'left' | 'right'>;
  /**
   * label 原生属性
   * @default ''
   */
  htmlFor?: ValueOrGet<string>;
  /**
   * 表单项说明内容
   */
  help?: string | TNode;
  /**
   * 字段标签名称
   * @default ''
   */
  label?: string | TNode;
  /**
   * 表单字段标签对齐方式：左对齐、右对齐、顶部对齐。默认使用 Form 的对齐方式，优先级高于 Form.labelAlign
   */
  labelAlign?: ValueOrGet<'left' | 'right' | 'top'>;
  /**
   * 可以整体设置标签宽度，优先级高于 Form.labelWidth
   */
  labelWidth?: ValueOrGet<string | number>;
  /**
   * 是否显示必填符号（*），优先级高于 Form.requiredMark
   */
  requiredMark?: ValueOrGet<boolean>;
  /**
   * 表单字段校验规则
   */
  validate?: ValidateFun;
  /**
   * 校验不通过时，是否显示错误提示信息，优先级高于 `Form.showErrorMessage`
   */
  showErrorMessage?: ValueOrGet<boolean>;

  children(arg: { showError: StoreRef<boolean> }): void;
} & FPDomAttributes<'div'>;

export interface FormRule {
  boolean?: boolean;
  date?: boolean | IsDateOptions;
  email?: boolean | any;
  enum?: Array<string>;
  idcard?: boolean;
  len?: number | boolean;
  max?: number | boolean;
  message?: string;
  min?: number | boolean;
  number?: boolean;
  pattern?: RegExp;
  required?: boolean;
  telnumber?: boolean;
  trigger?: 'change' | 'blur';
  type?: 'error' | 'warning';
  url?: boolean | any;
  validator?: CustomValidator;
  whitespace?: boolean;
}

export type ValidateFun = GetValue<
  | string
  | {
      message: string;
      type: 'error' | 'warninig';
    }
  | void
>;

export interface FormErrorMessage {
  boolean?: string;
  date?: string;
  enum?: string;
  idcard?: string;
  len?: string;
  max?: string;
  min?: string;
  number?: string;
  pattern?: string;
  required?: string;
  telnumber?: string;
  url?: string;
  validator?: string;
}

export type FormRules<T extends Data> = { [field in keyof T]?: Array<FormRule> };

export interface SubmitContext<T extends Data = Data> {
  e?: Event;
  validateResult: FormValidateResult<T>;
  firstError?: string;
  fields?: any;
}

export type FormValidateResult<T> = boolean | ValidateResultObj<T>;

export type ValidateResultObj<T> = { [key in keyof T]: boolean | ValidateResultList };

export type ValidateResultList = Array<AllValidateResult>;

export type AllValidateResult = CustomValidateObj | ValidateResultType;

export interface ValidateResultType extends FormRule {
  result: boolean;
}

export type ValidateResult<T> = { [key in keyof T]: boolean | ErrorList };

export type ErrorList = Array<FormRule>;

export type ValidateResultContext<T extends Data> = Omit<SubmitContext<T>, 'e'>;

export interface FormResetParams<FormData> {
  type?: 'initial' | 'empty';
  fields?: Array<keyof FormData>;
}

export type FormValidateMessage<FormData> = { [field in keyof FormData]: FormItemValidateMessage[] };

export interface FormItemValidateMessage {
  type: 'warning' | 'error';
  message: string;
}

export interface FormValidateParams {
  fields?: Array<string>;
  showErrorMessage?: boolean;
  trigger?: ValidateTriggerType;
}

export type ValidateTriggerType = 'blur' | 'change' | 'all';

export type Data = { [key: string]: any };

export interface IsDateOptions {
  format: string;
  strictMode: boolean;
  delimiters: string[];
}

export type CustomValidator = (val: ValueType) => CustomValidateResolveType | Promise<CustomValidateResolveType>;

export type CustomValidateResolveType = boolean | CustomValidateObj;

export interface CustomValidateObj {
  result: boolean;
  message: string;
  type?: 'error' | 'warning' | 'success';
}

export type ValueType = any;
