/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { FDomAttributes, FPDomAttributes } from 'mve-dom';
import { ValueOrGet } from 'wy-helper';
import { TNode } from '../common';
import { OverlayProps } from '../overlay';

export type ToastProps = {
  /**
   * 图标排列方式
   * @default row
   */
  direction?: ValueOrGet<'row' | 'column'>;
  /**
   * 自定义图标
   */
  icon?: TNode;
  /**
   * 遮罩层属性，透传至 Overlay
   * @default {}
   */
  overlayProps?: OverlayProps;
  /**
   * 弹窗展示位置
   * @default middle
   */
  placement?: ValueOrGet<'top' | 'middle' | 'bottom'>;
  /**
   * 防止滚动穿透，即不允许点击和滚动
   * @default false
   */
  preventScrollThrough?: ValueOrGet<boolean>;
  /**
   * 是否显示遮罩层
   * @default false
   */
  showOverlay?: ValueOrGet<boolean>;
  /**
   * 提示类型
   */
  theme?: ValueOrGet<'loading' | 'success' | 'warning' | 'error'>;

  children?: TNode;
} & FPDomAttributes<'div'>;
