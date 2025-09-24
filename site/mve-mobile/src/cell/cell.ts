import { fdom } from 'mve-dom';
import { valueOrGetToGet, memo, mergeSet, createSignal } from 'wy-helper';
import { renderIf, renderOne } from 'mve-helper';
import { CellProps } from './type';
import { renderTNode } from '../_util/parseTNode';
import { preventTextSelectionStyles } from '../_util/preventTextSelection';
import { TdChevronRight } from 'mve-icons/td';
import { TSvg } from '../../svg';
import { usePrefixClass } from '../hooks/useClass';
import { getFormIsDisabled } from '../form';
import pluginHover from '../hooks/useHover';
const ChevronRightIcon = () => TdChevronRight(TSvg, { size: '24px' });

/**
 * Cell 单元格组件
 * 一行内容/功能的垂直排列方式。一行项目左侧为主要内容展示区域，右侧可增加更多操作内容
 */
export function Cell({
  align: _align = 'middle',
  arrow: _arrow = false,
  bordered: _bordered = true,
  description,
  allowHover: _allowHover = false,
  image,
  leftIcon,
  note,
  required: _required = false,
  rightIcon,
  title,
  onClick,
  children,
  disabled: _disabled,
  ...args
}: CellProps) {
  const cellClass = usePrefixClass('cell');

  // 转换为响应式getter函数
  const align = valueOrGetToGet(_align);
  const arrow = valueOrGetToGet(_arrow);
  const bordered = valueOrGetToGet(_bordered);
  const allowHover = valueOrGetToGet(_allowHover);
  const required = valueOrGetToGet(_required);
  const className = valueOrGetToGet(args.className);
  const disabled = getFormIsDisabled(_disabled);
  const isHover = createSignal(false);
  // 处理点击事件
  const handleClick = (e: MouseEvent) => {
    if (!disabled()) {
      onClick?.(e);
    }
  };

  // 渲染图片
  const renderImage = () => {
    if (typeof image === 'string') {
      return fdom.img({
        src: image,
        className: `${cellClass}__left-image`,
      });
    }
    return renderTNode(image);
  };

  // 渲染左侧内容
  const renderLeft = () => {
    fdom.div({
      className: `${cellClass}__left`,
      children() {
        if (leftIcon !== undefined) {
          fdom.div({
            className: `${cellClass}__left-icon`,
            children() {
              renderTNode(leftIcon);
            },
          });
        }
        renderImage();
      },
    });
  };

  // 渲染标题
  const renderTitle = () => {
    if (title === undefined) {
      return;
    }
    return fdom.div({
      className: `${cellClass}__title`,
      children() {
        fdom.div({
          className: `${cellClass}__title-text`,
          children() {
            renderTNode(title);
            renderIf(required, () => {
              fdom.span({
                className: `${cellClass}--required`,
                children: '\u00A0*', // &nbsp;*
              });
            });
          },
        });

        if (description !== undefined) {
          fdom.div({
            className: `${cellClass}__description`,
            children() {
              renderTNode(description);
            },
          });
        }
      },
    });
  };

  // 渲染右侧内容
  const renderRight = () => {
    renderOne(
      () => (arrow() ? ChevronRightIcon : rightIcon),
      function (currentRightIcon) {
        return fdom.div({
          className: `${cellClass}__right ${cellClass}__right--${align()}`,
          children() {
            fdom.div({
              className: `${cellClass}__right-icon`,
              children() {
                renderTNode(currentRightIcon);
              },
            });
          },
        });
      },
    );
  };

  return fdom.div({
    ...args,
    className() {
      const classes = [cellClass];
      if (!bordered()) {
        classes.push(`${cellClass}--borderless`);
      }
      if (allowHover() && !disabled() && isHover.get()) {
        classes.push(`${cellClass}--hover`);
      }
      const n = className();
      if (n) classes.push(n);
      return classes.join(' ');
    },
    onClick: handleClick,
    // 防止文字选择
    ...preventTextSelectionStyles,
    plugin: mergeSet(pluginHover(isHover), args.plugin),
    children() {
      renderLeft();
      renderTitle();

      // 渲染note内容
      const noteContent = note || children;
      if (noteContent) {
        fdom.div({
          className: `${cellClass}__note`,
          children() {
            renderTNode(noteContent);
          },
        });
      }

      renderRight();
    },
  });
}
