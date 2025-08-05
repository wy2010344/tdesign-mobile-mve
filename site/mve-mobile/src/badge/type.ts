/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { FGetChildAttr } from 'wy-dom-helper';
import { ValueOrGet } from 'wy-helper';
export type TdBadgeProps = {
  /**
   * 颜色
   * @default ''
   */
  color?: ValueOrGet<string>;
  /**
   * 徽标右上角内容。可以是数字，也可以是文字。如：'new'/3/99+
   * @default 0
   */
  count?: ValueOrGet<string | number>;
  /**
   * 是否为红点
   * @default false
   */
  dot?: ValueOrGet<boolean>;
  /**
   * 封顶的数字值
   * @default 99
   */
  maxCount?: ValueOrGet<number>;
  /**
   * 设置状态点的位置偏移，示例：[-10, 20] 或 ['10em', '8rem']
   */
  offset?: ValueOrGet<Array<string | number>>;
  /**
   * 形状
   * @default circle
   */
  shape?: ValueOrGet<'circle' | 'square' | 'bubble' | 'ribbon'>;
  /**
   * 当数值为 0 时，是否展示徽标
   * @default false
   */
  showZero?: ValueOrGet<boolean>;
  /**
   * 尺寸
   * @default medium
   */
  size?: ValueOrGet<'medium' | 'large'>;
} & FGetChildAttr<HTMLDivElement>;
