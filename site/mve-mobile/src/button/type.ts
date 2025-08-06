/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { FDomAttributes, FPDomAttributes } from 'mve-dom';
import { FGetChildAttr } from 'wy-dom-helper';
import { ValueOrGet } from 'wy-helper';
import { TNode } from '../common';

// Button 组件的类型定义
export type ButtonProps = {
  /**
   * 是否为块级元素
   * @default false
   */
  block?: ValueOrGet<boolean>;
  /**
   * 是否为幽灵按钮（镂空按钮）
   * @default false
   */
  ghost?: ValueOrGet<boolean>;
  /**
   * 按钮内部图标，可完全自定义
   */
  icon?: TNode;
  /**
   * 是否显示为加载状态
   * @default false
   */
  loading?: ValueOrGet<boolean>;
  /**
   * 透传 Loading 组件全部属性
   */
  loadingProps?: Record<string, any>;
  /**
   * 按钮形状，有 4 种：长方形、正方形、圆角长方形、圆形
   * @default rectangle
   */
  shape?: ValueOrGet<'rectangle' | 'square' | 'round' | 'circle'>;
  /**
   * 组件尺寸
   * @default medium
   */
  size?: ValueOrGet<'extra-small' | 'small' | 'medium' | 'large'>;
  /**
   * 右侧内容，可用于定义右侧图标
   */
  suffix?: TNode;
  /**
   * 组件风格，依次为品牌色、危险色
   * @default default
   */
  theme?: ValueOrGet<'default' | 'primary' | 'danger' | 'light'>;
  /**
   * 按钮形式，基础、线框、虚线、文字
   * @default base
   */
  variant?: ValueOrGet<'base' | 'outline' | 'dashed' | 'text'>;

  children?: TNode;
} & FPDomAttributes<'button'>;
