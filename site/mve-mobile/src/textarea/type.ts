/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { Plugin, FPDomAttributes, MDomAttributes } from 'mve-dom';
import { StoreRef, ValueOrGet } from 'wy-helper';
import { TNode } from '../common';
import { BDomEvent, DomElement, FDomAttribute } from 'wy-dom-helper';

export type TextareaProps = {
  /**
   * 超出maxlength或maxcharacter之后是否还允许输入
   * @default false
   */
  allowInputOverMax?: ValueOrGet<boolean>;
  /**
   * 自动聚焦，拉起键盘
   * @default false
   */
  autofocus?: boolean;
  /**
   * 是否自动增高，值为 autosize 时，style.height 不生效
   * @default false
   */
  autosize?: ValueOrGet<boolean | { minRows?: number; maxRows?: number }>;
  /**
   * 是否显示外边框
   * @default false
   */
  bordered?: ValueOrGet<boolean>;
  /**
   * 是否禁用文本框
   */
  disabled?: ValueOrGet<boolean>;
  /**
   * 显示文本计数器，如 0/140。当 `maxlength < 0 && maxcharacter < 0` 成立时， indicator无效
   * @default false
   */
  indicator?: ValueOrGet<boolean>;
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
   * 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度
   */
  max?: ValueOrGet<number>;
  /**
   * 使用unicode来统计
   */
  maxAsLength?: ValueOrGet<boolean>;

  textAreaProps?: MDomAttributes<'textarea'>;
  model?: StoreRef<string>;
} & FPDomAttributes<'div'>;
