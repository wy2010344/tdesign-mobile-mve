import { fdom } from 'mve-dom';
import { valueOrGetToGet, createSignal } from 'wy-helper';
import { NoticeBarProps, NoticeBarTrigger } from './type';
import { usePrefixClass } from '../hooks/useClass';
import { renderTNode } from '../_util/parseTNode';
import { TdInfoCircleFilled, TdCheckCircleFilled } from 'mve-icons/td';
import { TSvg } from '../../svg';

/**
 * NoticeBar 通知栏组件（简化版）
 * 在导航下方，用于给用户显示消息通知
 */
export function NoticeBar({
  content: _content,
  direction: _direction = 'horizontal',
  interval: _interval = 2000,
  marquee: _marquee = false,
  operation: _operation,
  prefixIcon: _prefixIcon = true,
  suffixIcon: _suffixIcon,
  theme: _theme = 'info',
  visible: _visible = false,
  onChange,
  onClick,
  children,
  ...args
}: NoticeBarProps) {
  const noticeBarClass = usePrefixClass('notice-bar');

  // 转换为响应式getter函数
  const content = valueOrGetToGet(_content);
  const direction = valueOrGetToGet(_direction);
  const interval = valueOrGetToGet(_interval);
  const marquee = valueOrGetToGet(_marquee);
  const operation = valueOrGetToGet(_operation);
  const prefixIcon = valueOrGetToGet(_prefixIcon);
  const suffixIcon = valueOrGetToGet(_suffixIcon);
  const theme = valueOrGetToGet(_theme);
  const visible = valueOrGetToGet(_visible);

  // 垂直滚动状态
  const verticalIndex = createSignal(0);

  // 默认图标映射
  const getDefaultIcon = (currentTheme: string) => {
    const iconMap = {
      info: () => TdInfoCircleFilled(TSvg, { size: '16px' }),
      success: () => TdCheckCircleFilled(TSvg, { size: '16px' }),
      warning: () => TdInfoCircleFilled(TSvg, { size: '16px' }),
      error: () => TdInfoCircleFilled(TSvg, { size: '16px' }),
    };
    return iconMap[currentTheme as keyof typeof iconMap] || iconMap.info;
  };

  // 处理点击事件
  const handleClick = (trigger: NoticeBarTrigger) => {
    onClick?.(trigger);
  };

  // 垂直滚动处理（简化版）
  const startVerticalScroll = () => {
    const currentContent = content();
    if (!Array.isArray(currentContent) || currentContent.length <= 1) return;

    setInterval(() => {
      const currentIndex = verticalIndex.get();
      const nextIndex = (currentIndex + 1) % currentContent.length;
      verticalIndex.set(nextIndex);
      onChange?.(nextIndex, { source: 'autoplay' });
    }, interval());
  };

  return fdom.div({
    ...args,
    className() {
      const currentTheme = theme();
      const currentVisible = visible();

      if (!currentVisible) return 'display: none;';

      return [noticeBarClass, `${noticeBarClass}--${currentTheme}`].join(' ');
    },
    children() {
      if (!visible()) return null;

      // 渲染前缀图标
      const currentPrefixIcon = prefixIcon();
      if (currentPrefixIcon !== false) {
        fdom.div({
          className: `${noticeBarClass}__prefix-icon`,
          onClick: () => handleClick('prefix-icon'),
          children() {
            if (currentPrefixIcon === true) {
              getDefaultIcon(theme())();
            } else if (typeof currentPrefixIcon === 'function') {
              currentPrefixIcon();
            } else {
              renderTNode(currentPrefixIcon);
            }
          },
        });
      }

      // 渲染内容区域
      fdom.div({
        className: `${noticeBarClass}__content-wrap`,
        onClick: () => handleClick('content'),
        children() {
          const currentContent = content();
          const currentDirection = direction();

          if (currentDirection === 'vertical' && Array.isArray(currentContent)) {
            // 垂直滚动内容
            fdom.div({
              className: `${noticeBarClass}__content--vertical`,
              s_height: '22px',
              s_overflow: 'hidden',
              children() {
                const currentIndex = verticalIndex.get();

                fdom.div({
                  s_transform: () => `translateY(-${currentIndex * 22}px)`,
                  s_transition: 'transform 0.3s ease',
                  children() {
                    currentContent.forEach((item) => {
                      fdom.div({
                        s_height: '22px',
                        s_lineHeight: '22px',
                        children: typeof item === 'string' ? item : renderTNode(item),
                      });
                    });
                  },
                });

                // 启动滚动
                startVerticalScroll();
              },
            });
          } else {
            // 水平内容
            fdom.div({
              className: [`${noticeBarClass}__content`, !marquee() ? `${noticeBarClass}__content-wrapable` : '']
                .filter(Boolean)
                .join(' '),
              children() {
                // 渲染内容
                if (typeof currentContent === 'string') {
                  fdom.text(currentContent);
                } else if (typeof currentContent === 'function') {
                  currentContent();
                } else {
                  renderTNode(currentContent);
                }

                // 渲染操作区域
                const currentOperation = operation();
                if (currentOperation) {
                  fdom.span({
                    className: `${noticeBarClass}__operation`,
                    onClick: (event: Event) => {
                      event.stopPropagation();
                      handleClick('operation');
                    },
                    children: renderTNode(currentOperation),
                  });
                }
              },
            });
          }
        },
      });

      // 渲染后缀图标
      const currentSuffixIcon = suffixIcon();
      if (currentSuffixIcon) {
        fdom.div({
          className: `${noticeBarClass}__suffix-icon`,
          onClick: () => handleClick('suffix-icon'),
          children: renderTNode(currentSuffixIcon),
        });
      }

      // 渲染children
      if (typeof children === 'function') {
        children();
      } else if (children) {
        return children;
      }
    },
  });
}
