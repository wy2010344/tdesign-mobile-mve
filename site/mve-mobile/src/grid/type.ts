/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { FDomAttributes, FPDomAttributes } from 'mve-dom';
import { ValueOrGet } from 'wy-helper';
import { TNode } from '../common';
import { BadgeProps } from '../badge';

export type GridProps = {
  /**
   * 内容对齐方式
   * @default center
   */
  align?: ValueOrGet<'left' | 'center'>;
  /**
   * 是否显示边框
   * @default false
   */
  border?: ValueOrGet<boolean>;
  /**
   * 每一行的列数量；为 0 时等于固定大小
   * @default 4
   */
  column?: ValueOrGet<number>;
  /**
   * 间隔大小
   */
  gutter?: ValueOrGet<number>;
  /**
   * 是否开启点击反馈
   * @default false
   */
  allowHover?: ValueOrGet<boolean>;
  /**
   * 宫格的风格
   * @default default
   */
  theme?: ValueOrGet<'default' | 'card'>;

  children?: TNode;
} & FPDomAttributes<'div'>;

export type GridItemProps = {
  /**
   * 透传至 Badge 属性
   * @default null
   */
  badge?: BadgeProps;
  /**
   * 文本以外的更多描述，辅助信息。可以通过 Props 传入文本，也可以自定义标题节点
   */
  description?: string | TNode;
  /**
   * 内容布局方式
   * @default vertical
   */
  layout?: ValueOrGet<'vertical' | 'horizontal'>;
  /**
   * 文本，可以通过 Props 传入文本，也可以自定义标题节点
   */
  text?: string | TNode;

  children?: TNode;
} & FPDomAttributes<'div'>;
