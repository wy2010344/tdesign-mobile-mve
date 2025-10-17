import { fdom, zdom } from 'mve-dom';
import { valueOrGetToGet } from 'wy-helper';
import { AvatarProps } from './type';
import { AvatarGroupContext } from './avatar-group';
import { Badge } from '../badge';
import { cns } from 'mve-dom-helper';
import { Image } from '../image';
import { renderTNode } from '../_util/parseTNode';
import { renderOne } from 'mve-helper';
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
export function Avatar({
  alt,
  badgeProps,
  hideOnLoadFailed: _hideOnLoadFailed = false,
  image: _image,
  icon,
  children,
  imageProps,
  onError,
  shape: _shape,
  size: _size,
  ...args
}: AvatarProps) {
  // 类名前缀
  const avatarClass = 't-avatar';

  // 获取AvatarGroup的Context
  const avatarGroupProps = AvatarGroupContext.consume();
  const dShape = valueOrGetToGet(_shape);
  const image = valueOrGetToGet(_image);
  const hideOnLoadFailed = valueOrGetToGet(_hideOnLoadFailed);

  const shape = () => {
    return dShape() || avatarGroupProps?.shape() || 'circle';
  };
  const dSize = valueOrGetToGet(_size);
  const size = () => {
    return dSize() || avatarGroupProps?.size() || 'medium';
  };
  // 计算是否为自定义尺寸
  const isCustomSize = () => !isValidSize(size());

  // 渲染头像内容
  const renderAvatarContent = () => {
    // 如果有图片且不隐藏失败图片
    function ShowImg() {
      Image({
        src: image,
        alt,
        ...imageProps,
        onError,
      });
    }
    function ShowIcon() {
      fdom.div({
        className: `${avatarClass}__icon`,
        children: icon,
      });
    }
    renderOne(
      () => {
        const img = image();
        if (img && !hideOnLoadFailed()) {
          return ShowImg;
        }
        if (icon != undefined) {
          return ShowIcon;
        }
        return children;
      },
      (e) => {
        renderTNode(e);
      },
    );
  };

  return fdom.div({
    ...args,
    className: cns(`${avatarClass}__wrapper`, args.className),
    children() {
      fdom.div({
        className: `${avatarClass}__badge`,
        children() {
          Badge({
            ...badgeProps,
            children() {
              // 如果有徽标属性，这里应该包装Badge组件
              // 简化实现，直接渲染头像
              zdom.div({
                attrs(m) {
                  const currentSize = size();
                  const currentShape = shape();
                  const classes = [
                    avatarClass,
                    `${avatarClass}--${isCustomSize() ? 'medium' : currentSize}`,
                    `${avatarClass}--${currentShape}`,
                  ];

                  // 如果在AvatarGroup中，添加边框样式
                  if (avatarGroupProps) {
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
