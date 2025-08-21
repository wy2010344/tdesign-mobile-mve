/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { FPDomAttributes } from 'mve-dom';
import { ValueOrGet } from 'wy-helper';
import { TNode } from '../common';

export type NoticeBarProps = {
  /**
   * 滚动方向
   * @default horizontal
   */
  direction?: ValueOrGet<'horizontal' | 'vertical'>;
  /**
   * 间隔时间【仅在 direction='vertical' 有效】
   * @default 2000
   */
  interval?: ValueOrGet<number>;
  /**
   * 跑马灯效果。speed 指速度控制；loop 指循环播放次数，值为 -1 表示循环播放，值为 0 表示不循环播放；delay 表示延迟多久开始播放
   * @default false
   */
  marquee?: ValueOrGet<boolean | NoticeBarMarquee>;
  /**
   * 右侧额外信息
   */
  operation?: TNode;

  showPrefixIcon?: ValueOrGet<boolean>;
  /**
   * 用于自定义公告栏前面的图标，优先级大于 theme 设定的图标。值为 false 则不显示图标，值为 true 显示 theme 设定图标
   * @default true
   */
  prefixIcon?: TNode;
  /**
   * 后缀图标
   */
  suffixIcon?: ValueOrGet<TNode>;
  /**
   * 内置主题
   * @default info
   */
  theme?: ValueOrGet<'info' | 'success' | 'warning' | 'error'>;
  /**
   * 当 `direction="vertical"` 时轮播切换时触发
   */
  onChange?: (current: number, context: { source: NoticeBarChangeSource }) => void;
  /**
   * 点击事件
   */
  onAreaClick?: (trigger: NoticeBarTrigger) => void;

  children?: TNode;
} & FPDomAttributes<'div'>;

export interface NoticeBarMarquee {
  speed?: number;
  loop?: number;
  delay?: number;
}

export type NoticeBarChangeSource = '' | 'autoplay' | 'touch';

export type NoticeBarTrigger = 'prefix-icon' | 'content' | 'operation' | 'suffix-icon';
