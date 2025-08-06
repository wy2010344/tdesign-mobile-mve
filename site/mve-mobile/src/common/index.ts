// MVE版本的通用类型定义

import { GetChild } from 'wy-dom-helper';
import { EmptyFun } from 'wy-helper';

/**
 * 通用节点类型，支持字符串、数字、布尔值、函数等
 */
export type TNode = EmptyFun | GetChild | number | string;
/**
 * 通用元素类型，主要用于图标等
 */
export type TElement = TNode;

/**
 * 样式属性接口
 */
export interface StyledProps {
  className?: string;
  style?: Record<string, any>;
}
