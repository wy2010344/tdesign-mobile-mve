import { fdom, FPDomAttributes } from 'mve-dom';
import { valueOrGetToGet } from 'wy-helper';
import { createContext } from 'mve-core';
import { Avatar } from './avatar';
import { AvatarGroupProps, TdAvatarGroupProps } from './type';

// 工具函数：判断是否为有效的预设尺寸
function isValidSize(size: string): boolean {
  return ['small', 'medium', 'large'].includes(size);
}

// 创建AvatarGroup的Context
export const AvatarGroupContext = createContext<TdAvatarGroupProps>({});

/**
 * AvatarGroup 头像组组件
 * 用于展示一组用户头像，支持层叠显示和折叠功能
 *
 * 按照MVE思维模式实现，更接近Vue的响应式模式
 */
export function AvatarGroup(props: AvatarGroupProps) {
  // 设置默认值 - 直接在解构中设置，类似Vue的props默认值
  const { children, collapseAvatar, onCollapsedItemClick, ...args } = props;

  // 类名前缀
  const avatarGroupClass = 't-avatar-group';

  // 转换为响应式getter函数 - 这是MVE的核心
  const cascading = valueOrGetToGet(props.cascading || 'right-up');
  const max = valueOrGetToGet(props.max || 5);
  const shape = valueOrGetToGet(props.shape || 'circle');
  const size = valueOrGetToGet(props.size || '');
  const className = valueOrGetToGet(props.className);

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
    if (!children || children.length === 0) return;

    const maxCount = max();
    const totalCount = children.length;

    // 如果头像数量不超过最大值，直接渲染所有头像
    if (totalCount <= maxCount) {
      children.forEach((child, index) => {
        if (typeof child === 'function') {
          child();
        }
      });
      return;
    }

    // 渲染前 max-1 个头像
    const showAvatars = children.slice(0, maxCount - 1);
    showAvatars.forEach((child, index) => {
      if (typeof child === 'function') {
        child();
      }
    });

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
            if (collapseAvatar) {
              if (typeof collapseAvatar === 'string') {
                fdom.span({
                  childrenType: 'text',
                  children: collapseAvatar,
                });
              } else if (typeof collapseAvatar === 'function') {
                collapseAvatar();
              }
            } else {
              fdom.span({
                childrenType: 'text',
                children: `+${totalCount - maxCount + 1}`,
              });
            }
          },
        });
      },
    });
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
        size: size(),
        shape: shape(),
        cascading: cascading(),
        max: max(),
      });

      renderAvatars();
    },
  });
}
