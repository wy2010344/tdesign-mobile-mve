/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { FDomAttributes, FPDomAttributes } from 'mve-dom';
import { ValueOrGet } from 'wy-helper';
import { TNode } from '../common';

export type OverlayProps = {
  /**
   * 背景色过渡时间，单位毫秒
   * @default 300
   */
  duration?: ValueOrGet<number>;
  /**
   * 是否阻止背景滚动，阻止时蒙层里的内容也将无法滚动
   * @default true
   */
  preventScrollThrough?: ValueOrGet<boolean>;
  /**
   * 是否展示
   * @default false
   */
  visible?: ValueOrGet<boolean>;
  children?: TNode;
} & FPDomAttributes<'div'>;
