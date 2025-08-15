/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { FDomAttributes, FPDomAttributes } from 'mve-dom';
import { StoreRef, ValueOrGet } from 'wy-helper';
import { TNode } from '../common';

export type TagProps = {
  /**
   * 标签是否可关闭
   * @default false
   */
  closable?: ValueOrGet<boolean>;
  /**
   * 标签禁用态，失效标签不能触发事件。默认风格（theme=default）才有禁用态
   * @default false
   */
  disabled?: ValueOrGet<boolean>;
  /**
   * 标签中的图标，可自定义图标呈现
   */
  icon?: TNode;
  /**
   * 标签类型，有三种：方形、圆角方形、标记型
   * @default square
   */
  shape?: ValueOrGet<'square' | 'round' | 'mark'>;
  /**
   * 标签尺寸
   * @default medium
   */
  size?: ValueOrGet<'small' | 'medium' | 'large' | 'extra-large'>;
  /**
   * 组件风格，用于描述组件不同的应用场景
   * @default default
   */
  theme?: ValueOrGet<'default' | 'primary' | 'warning' | 'danger' | 'success'>;
  /**
   * 标签风格变体
   * @default dark
   */
  variant?: ValueOrGet<'dark' | 'light' | 'outline' | 'light-outline'>;
  /**
   * 点击时触发
   */
  onClick?: (context: { e: MouseEvent }) => void;
  /**
   * 如果关闭按钮存在，点击关闭按钮时触发
   */
  onClose?: (context: { e: MouseEvent }) => void;

  children?: TNode;
} & FPDomAttributes<'span'>;

export type CheckTagProps = {
  /**
   * 标签选中的状态，默认风格（theme=default）才有选中态
   */
  checked?: StoreRef<boolean>;
  /**
   * 标签是否可关闭
   * @default false
   */
  closable?: ValueOrGet<boolean>;
  /**
   * 标签禁用态，失效标签不能触发事件。默认风格（theme=default）才有禁用态
   * @default false
   */
  disabled?: ValueOrGet<boolean>;
  /**
   * 标签中的图标，可自定义图标呈现
   */
  icon?: TNode;
  /**
   * 标签类型，有三种：方形、圆角方形、标记型
   * @default square
   */
  shape?: ValueOrGet<'square' | 'round' | 'mark'>;
  /**
   * 标签尺寸
   * @default medium
   */
  size?: ValueOrGet<'small' | 'medium' | 'large' | 'extra-large'>;
  /**
   * 标签风格变体
   * @default dark
   */
  variant?: ValueOrGet<'dark' | 'light' | 'outline' | 'light-outline'>;
  /**
  /**
   * 点击标签时触发
   */
  onClick?: (context: { e: MouseEvent }) => void;
  /**
   * 如果关闭按钮存在，点击关闭按钮时触发
   */
  onClose?: (context: { e: MouseEvent }) => void;

  children?: TNode | [string, string];
} & FPDomAttributes<'span'>;
