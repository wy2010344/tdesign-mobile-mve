/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { FDomAttributes, FPDomAttributes } from 'mve-dom';
import { StoreRef, ValueOrGet } from 'wy-helper';
import { TNode } from '../common';
import { HTMLAttributes } from 'vue';
import { TriggerTime } from 'mve-dom-helper';

export type InputProps = {
  triggerTime?: ValueOrGet<TriggerTime>;
  // labelAlign?:ValueOrGet<'top'|'center'|'footer'>
  /**
   * 文本内容位置，居左/居中/居右
   * @default left
   */
  align?: ValueOrGet<'left' | 'center' | 'right'>;
  /**
   * 超出 `maxlength` 或 `maxcharacter` 之后是否允许继续输入
   * @default false
   */
  allowInputOverMax?: ValueOrGet<boolean>;
  /**
   * 自动聚焦
   * @default false
   */
  autofocus?: ValueOrGet<boolean>;
  /**
   * 是否开启无边框模式
   * @default false
   */
  borderless?: ValueOrGet<boolean>;
  /**
   * 清空图标触发方式，仅在输入框有值时有效
   * @default always
   */
  clearTrigger?: ValueOrGet<'always' | 'focus'>;
  /**
   * 是否可清空
   * @default false
   */
  clearable?: ValueOrGet<boolean>;
  /**
   * 光标颜色
   * @default #0052d9
   */
  cursorColor?: ValueOrGet<string>;
  /**
   * 是否禁用输入框
   */
  disabled?: ValueOrGet<boolean>;
  /**
   * 右侧额外内容
   */
  extra?: TNode;
  /**
   * 指定输入框展示值的格式
   */
  format?: InputFormatType;
  /**
   * 左侧文本
   */
  label?: string | TNode;
  /**
   * 标题输入框布局方式
   * @default horizontal
   */
  layout?: ValueOrGet<'vertical' | 'horizontal'>;
  /**
   * 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度。`maxcharacter` 和 `maxlength` 二选一使用
   */
  max?: ValueOrGet<number>;
  /**
   * 使用unicode来统计
   */
  maxAsLength?: ValueOrGet<boolean>;
  /**
   * 组件前置图标
   */
  prefixIcon?: TNode;
  /**
   * 输入框状态
   * @default default
   */
  status?: ValueOrGet<'default' | 'success' | 'warning' | 'error'>;
  /**
   * 后置图标前的后置内容
   */
  suffix?: string | TNode;
  /**
   * 组件后置图标
   */
  suffixIcon?: TNode;
  /**
   * 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式
   */
  tips?: string | TNode;
  /**
   * 输入框类型
   * @default text
   */
  type?: ValueOrGet<'text' | 'email' | 'number' | 'url' | 'tel' | 'password' | 'search' | 'submit' | 'hidden'>;

  model?: StoreRef<string>;
  wrapperProps?: FPDomAttributes<'div'>;
  children?: TNode;
} & Omit<FPDomAttributes<'input'>, 'maxLength' | 'max'>;

export type InputFormatType = (value: string) => string;
