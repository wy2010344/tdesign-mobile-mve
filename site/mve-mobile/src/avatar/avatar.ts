import { fdom, mdom } from 'mve-dom';
import { valueOrGetToGet } from 'wy-helper';
import { AvatarProps } from './type';
import { AvatarGroupContext } from './avatar-group';
import { Badge } from '../badge/badge';
// 工具函数：判断是否为有效的预设尺寸
function isValidSize(size: string): boolean {
  return ['small', 'medium', 'large'].includes(size);
}

/**
 * Avatar 头像组件
 * 用于展示用户头像信息，除了纯展示也可点击进入个人详情等操作
 *
 * 按照MVE思维模式实现，更接近Vue的响应式模式
 */
export function Avatar(props: AvatarProps) {
  // 设置默认值 - 直接在解构中设置，类似Vue的props默认值
  const { children, icon, badgeProps, imageProps, onError, ...args } = props;

  // 类名前缀
  const avatarClass = 't-avatar';

  // 获取AvatarGroup的Context
  const avatarGroupProps = AvatarGroupContext.consume();
  const hasAvatarGroupProps = Object.keys(avatarGroupProps).length > 0;

  // 转换为响应式getter函数 - 这是MVE的核心
  const alt = valueOrGetToGet(props.alt || '');
  const hideOnLoadFailed = valueOrGetToGet(props.hideOnLoadFailed || false);
  const image = valueOrGetToGet(props.image || '');
  const shape = valueOrGetToGet(props.shape || avatarGroupProps.shape || 'circle');
  const size = valueOrGetToGet(props.size || avatarGroupProps.size || 'medium');
  // 计算是否为自定义尺寸
  const isCustomSize = () => !isValidSize(size());

  // 图片加载错误处理
  const handleImgLoadError = (e: Event) => {
    onError?.({ e });
  };

  // 渲染头像内容
  const renderAvatarContent = () => {
    // 如果有图片且不隐藏失败图片
    if (image() && !hideOnLoadFailed()) {
      // 简化的图片渲染，实际项目中应该使用Image组件
      fdom.img({
        src: image(),
        alt: alt(),
        onError: handleImgLoadError,
        s_width: '100%',
        s_height: '100%',
        s_objectFit: 'cover',
        ...imageProps,
      });
      return;
    }

    // 如果有图标
    if (icon) {
      fdom.div({
        className: `${avatarClass}__icon`,
        children() {
          icon();
        },
      });
      return;
    }

    // 渲染文字内容
    if (children) {
      if (typeof children === 'string') {
        fdom.span({
          childrenType: 'text',
          children,
        });
      } else if (typeof children === 'function') {
        children();
      }
    }
  };

  return fdom.div({
    className: `${avatarClass}__wrapper`,
    children() {
      fdom.div({
        className: `${avatarClass}__badge`,
        children() {
          Badge({
            ...badgeProps,
            children() {
              // 如果有徽标属性，这里应该包装Badge组件
              // 简化实现，直接渲染头像
              mdom.div({
                attrs(m) {
                  const currentSize = size();
                  const currentShape = shape();
                  const classes = [
                    avatarClass,
                    `${avatarClass}--${isCustomSize() ? 'medium' : currentSize}`,
                    `${avatarClass}--${currentShape}`,
                  ];

                  // 如果在AvatarGroup中，添加边框样式
                  if (hasAvatarGroupProps) {
                    classes.push(`${avatarClass}--border`);
                    classes.push(`${avatarClass}--border-${isCustomSize() ? 'medium' : currentSize}`);
                  }
                  m.className = classes.join(' ');
                  if (isCustomSize()) {
                    const sizeValue = size();
                    m.s_height = sizeValue;
                    m.s_width = sizeValue;
                    m.s_fontSize = `${(Number.parseInt(sizeValue, 10) / 8) * 3 + 2}px`;
                  }
                },
                children() {
                  renderAvatarContent();
                },
              });
            },
          });
        },
      });
    },
  });
}
