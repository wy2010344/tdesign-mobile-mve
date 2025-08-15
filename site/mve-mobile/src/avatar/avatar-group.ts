import { fdom, FPDomAttributes } from 'mve-dom';
import { GetValue, valueOrGetToGet } from 'wy-helper';
import { createContext, renderForEach } from 'mve-core';
import { Avatar } from './avatar';
import { AvatarGroupProps, AvatarShape, AvatarSize } from './type';
import { renderTNode } from '../_util/parseTNode';

// 工具函数：判断是否为有效的预设尺寸
function isValidSize(size: string): boolean {
  return ['small', 'medium', 'large'].includes(size);
}

// 创建AvatarGroup的Context
export const AvatarGroupContext = createContext<
  | {
      shape: GetValue<AvatarShape>;
      size: GetValue<AvatarSize>;
    }
  | undefined
>(undefined);

const ext = Symbol('ext');
/**
 * AvatarGroup 头像组组件
 * 用于展示一组用户头像，支持层叠显示和折叠功能
 *
 * 按照MVE思维模式实现，更接近Vue的响应式模式
 */
export function AvatarGroup({
  children: _children,
  collapseAvatar,
  onCollapsedItemClick,
  cascading: _cascading = 'right-up',
  max: _max = 5,
  shape: _shape = 'circle',
  size: _size = '',
  ...args
}: AvatarGroupProps) {
  // 设置默认值 - 直接在解构中设置，类似Vue的props默认值
  // 类名前缀
  const avatarGroupClass = 't-avatar-group';
  // 转换为响应式getter函数 - 这是MVE的核心
  const cascading = valueOrGetToGet(_cascading);
  const max = valueOrGetToGet(_max);
  const shape = valueOrGetToGet(_shape);
  const size = valueOrGetToGet(_size);
  const className = valueOrGetToGet(args.className);
  const children = valueOrGetToGet(_children);

  // 计算方向
  const direction = () => cascading().split('-')[0];

  // 计算是否为自定义尺寸
  const isCustomSize = () => !isValidSize(size());

  // 处理折叠项点击事件
  const handleCollapsedItemClick = (e: MouseEvent) => {
    onCollapsedItemClick?.({ e });
  };

  // 渲染头像列表
  const renderAvatars = () => {
    renderForEach<number, any>(
      function (callback) {
        const m = max(),
          vs = children(),
          c = vs.length;
        const to = Math.min(m, c);
        for (let i = 0; i < to; i++) {
          callback(vs[i], 1);
        }
        const r = c - m;
        if (r > 0) {
          callback(ext, r);
        }
      },
      function (key, et) {
        if (key == ext) {
          // 渲染折叠头像
          fdom.div({
            className: `${avatarGroupClass}__collapse--default`,
            onClick: handleCollapsedItemClick,
            s_cursor: 'pointer',
            children() {
              Avatar({
                size: size(),
                shape: shape(),
                children() {
                  if (
                    renderTNode(collapseAvatar, (children) =>
                      fdom.span({
                        childrenType: 'text',
                        children,
                      }),
                    )
                  ) {
                    return;
                  }
                  fdom.span({
                    childrenType: 'text',
                    children() {
                      return `+${et.getValue()}`;
                    },
                  });
                },
              });
            },
          });
        } else {
          Avatar(key);
        }
      },
      {
        bindIndex: true,
      },
    );
  };

  return fdom.div({
    ...(args as FPDomAttributes<'div'>),
    className() {
      const currentDirection = direction();
      const currentSize = size();
      const classes = [
        avatarGroupClass,
        `${avatarGroupClass}-offset-${currentDirection}`,
        `${avatarGroupClass}-offset-${currentDirection}-${isCustomSize() ? 'medium' : currentSize || 'medium'}`,
      ];

      const n = className();
      if (n) classes.push(n);
      return classes.join(' ');
    },
    children() {
      // 提供Context给子Avatar组件
      AvatarGroupContext.provide({
        size,
        shape,
      });

      renderAvatars();
    },
  });
}
