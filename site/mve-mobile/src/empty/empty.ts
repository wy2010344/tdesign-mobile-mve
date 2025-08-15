import { fdom } from 'mve-dom';
import { valueOrGetToGet } from 'wy-helper';
import { EmptyProps } from './type';
import { renderTNode } from '../_util/parseTNode';
import { usePrefixClass } from '../hooks/useClass';
import { renderIfP } from 'mve-helper';
import { Image } from '../image';

/**
 * Empty 空状态组件
 * 空状态时的占位提示
 *
 * 这是按照MVE思维模式的实现，更接近Vue的响应式模式
 */
export function Empty({ action, description, icon, image, ...args }: EmptyProps) {
  const emptyClass = usePrefixClass('empty');

  return fdom.div({
    ...args,
    className: emptyClass,
    children() {
      // 渲染缩略图区域
      fdom.div({
        className: `${emptyClass}__thumb`,
        children() {
          // 优先渲染图片
          if (typeof image != 'undefined') {
            if (typeof image === 'string') {
              Image({
                src: image,
                alt: 'empty',
              });
            } else {
              renderTNode(image);
            }
            return;
          }

          // 渲染图标
          if (typeof icon != 'undefined') {
            fdom.div({
              className: `${emptyClass}__icon`,
              children: icon,
            });
          }
        },
      });

      // 渲染描述文字
      if (typeof description != 'undefined') {
        fdom.div({
          className: `${emptyClass}__description`,
          children: description,
        });
      }
      // 渲染操作按钮
      if (typeof action != 'undefined') {
        fdom.div({
          className: `${emptyClass}__actions`,
          children() {
            renderTNode(action);
          },
        });
      }
    },
  });
}
