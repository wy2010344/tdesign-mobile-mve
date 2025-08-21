import { fdom } from 'mve-dom';
import { valueOrGetToGet, createSignal } from 'wy-helper';
import { NoticeBarProps, NoticeBarMarquee, NoticeBarTrigger } from './type';
import { usePrefixClass } from '../hooks/useClass';
import { renderTNode } from '../_util/parseTNode';
import { TdInfoCircleFilled, TdCheckCircleFilled } from 'mve-icons/td';
import { TSvg } from '../../svg';
import { renderIfP, renderOne, renderOneP } from 'mve-helper';

const iconDefault = {
  info() {
    TdInfoCircleFilled(TSvg);
  },
  success() {
    TdCheckCircleFilled(TSvg);
  },
  warning() {
    TdInfoCircleFilled(TSvg);
  },
  error() {
    TdInfoCircleFilled(TSvg);
  },
};
/**
 * NoticeBar 通知栏组件
 * 在导航下方，用于给用户显示消息通知
 *
 * 这是按照MVE思维模式的实现，更接近Vue的响应式模式
 */
export function NoticeBar({
  direction: _direction = 'horizontal',
  interval: _interval = 2000,
  marquee: _marquee = false,
  operation,
  suffixIcon,
  theme: _theme = 'info',
  showPrefixIcon = true,
  prefixIcon = () =>
    renderOneP(_theme, (v) => {
      iconDefault[v]();
    }),
  onChange,
  onAreaClick,
  children,
  ...args
}: NoticeBarProps) {
  const noticeBarClass = usePrefixClass('notice-bar');

  const interval = valueOrGetToGet(_interval);
  const marquee = valueOrGetToGet(_marquee);
  const theme = valueOrGetToGet(_theme);

  // 内部状态
  const animationState = createSignal({
    duration: 0,
    offset: 0,
    listWidth: 0,
    itemWidth: 0,
    isAnimating: false,
  });

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
    onAreaClick?.(trigger);
  };

  // 初始化跑马灯动画
  const initMarqueeAnimation = (listElement: HTMLElement, itemElement: HTMLElement) => {
    const currentMarquee = marquee();
    if (!currentMarquee) return;

    let scrollConfig = {
      speed: 50,
      loop: -1,
      delay: 0,
    };

    if (typeof currentMarquee === 'object') {
      scrollConfig = {
        speed: currentMarquee.speed ?? 50,
        loop: currentMarquee.loop ?? -1,
        delay: currentMarquee.delay ?? 0,
      };
    }

    setTimeout(() => {
      const listWidth = listElement.getBoundingClientRect().width;
      const itemWidth = itemElement.getBoundingClientRect().width;

      if (itemWidth > listWidth) {
        const state = animationState.get();
        animationState.set({
          ...state,
          offset: -itemWidth,
          duration: itemWidth / scrollConfig.speed,
          listWidth,
          itemWidth,
          isAnimating: true,
        });
      }
    }, scrollConfig.delay);
  };

  // 处理动画结束
  const handleAnimationEnd = () => {
    const currentMarquee = marquee();
    if (!currentMarquee) return;

    let scrollConfig = {
      speed: 50,
      loop: -1,
      delay: 0,
    };

    if (typeof currentMarquee === 'object') {
      scrollConfig = {
        speed: currentMarquee.speed ?? 50,
        loop: currentMarquee.loop ?? -1,
        delay: currentMarquee.delay ?? 0,
      };
    }

    if (scrollConfig.loop > 0) {
      scrollConfig.loop--;
      if (scrollConfig.loop === 0) {
        const state = animationState.get();
        animationState.set({
          ...state,
          isAnimating: false,
        });
        return;
      }
    }

    const state = animationState.get();
    // 重置到右侧
    animationState.set({
      ...state,
      offset: state.listWidth,
      duration: 0,
    });

    // 开始新的动画
    setTimeout(() => {
      const currentState = animationState.get();
      animationState.set({
        ...currentState,
        offset: -currentState.itemWidth,
        duration: (currentState.itemWidth + currentState.listWidth) / scrollConfig.speed,
      });
    }, 0);
  };

  const className = valueOrGetToGet(args.className);
  // 渲染操作区域

  return fdom.div({
    ...args,
    className() {
      const currentTheme = theme();
      const c = className();
      return [noticeBarClass, c || '', `${noticeBarClass}--${currentTheme}`].join(' ');
    },
    children() {
      // 渲染前缀图标
      renderIfP(showPrefixIcon, function () {
        fdom.div({
          className: `${noticeBarClass}__prefix-icon`,
          onClick() {
            handleClick('prefix-icon');
          },
          children: prefixIcon,
        });
      });

      // 渲染内容
      fdom.div({
        className: `${noticeBarClass}__content-wrap`,
        onClick() {
          handleClick('content');
        },
        children() {
          fdom.div({
            className() {
              const cs = [`${noticeBarClass}__content`];
              cs.push(`${noticeBarClass}__content-wrapable`);
              return cs.join(' ');
            },
            children() {
              renderTNode(children);
              if (typeof operation != 'undefined') {
                fdom.span({
                  className: `${noticeBarClass}__operation`,
                  onClick(e) {
                    e.stopPropagation();
                    handleClick('operation');
                  },
                  children: operation,
                });
              }
            },
          });
        },
      });

      // 渲染后缀图标
      if (typeof suffixIcon! != 'undefined') {
        fdom.div({
          className: `${noticeBarClass}__suffix-icon`,
          onClick: () => handleClick('suffix-icon'),
          children: suffixIcon,
        });
      }
    },
  });
}
