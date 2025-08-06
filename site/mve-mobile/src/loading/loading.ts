import { fdom, renderPortal } from 'mve-dom';
import { addEffect, createSignal, memo, valueOrGetToGet } from 'wy-helper';
import { hookTrackSignal, renderIf, renderOne, renderOneP } from 'mve-helper';
import { LoadingProps } from './type';
import dots from './icon/dots';
import circular from './icon/circular';
import spinner from './icon/spinner';
import { renderTNode } from '../_util/parseTNode';
import { usePrefixClass } from '../hooks/useClass';
/**
 * Loading 加载组件
 * 用于表示页面或操作的加载状态，给予用户反馈的同时减缓等待的焦虑感
 *
 */
export function Loading({
  attach: _attach,
  delay = 0,
  duration: _duration = 800,
  fullscreen: _fullscreen = false,
  inheritColor: _inheritColor = false,
  layout: _layout = 'horizontal',
  pause: _pause = false,
  reverse: _reverse = false,
  loading: _loading = true,
  children,
  text,
  indicator = true,
  theme = 'circular',
  size = '20px',
  ...args
}: LoadingProps) {
  // 类名前缀
  const loadingClass = usePrefixClass('loading');

  // 转换为响应式getter函数
  const attach = valueOrGetToGet(_attach);
  const duration = valueOrGetToGet(_duration);
  const fullscreen = valueOrGetToGet(_fullscreen);
  const inheritColor = valueOrGetToGet(_inheritColor);
  const layout = valueOrGetToGet(_layout);
  const loading = valueOrGetToGet(_loading);
  const pause = valueOrGetToGet(_pause);
  const reverse = valueOrGetToGet(_reverse);
  const className = valueOrGetToGet(args.className);
  const delayShowLoading = createSignal(false);
  function countDelay() {
    addEffect(() => {
      delayShowLoading.set(false);
      const timer = setTimeout(() => {
        delayShowLoading.set(true);
        clearTimeout(timer);
      }, delay);
    });
  }
  const realLoading = () => (!delay || delayShowLoading.get()) && loading();
  // 监听loading和delay变化
  hookTrackSignal(loading, (value) => {
    if (value) {
      delay && countDelay();
    }
    const cls = `${loadingClass}--lock`;
    if (value && fullscreen()) {
      countDelay();
      document.body.classList.add(cls);
    } else {
      document.body.classList.remove(cls);
    }
  });

  const textClass = () => {
    const classes: string[] = [`${loadingClass}__text`];
    if (indicator) {
      classes.push(`${loadingClass}__text--only`);
    }
    return classes.join(' ');
  };

  const map = {
    dots,
    spinner,
    circular,
  };
  function renderTheme() {
    renderOneP(theme, function (c) {
      const cp = map[c];
      cp({
        pause,
        duration,
        reverse,
      });
    });
  }
  // 渲染加载内容
  const renderContent = () => {
    fdom.div({
      ...args,
      className() {
        const classes: string[] = [loadingClass];
        if (layout() == 'vertical') {
          classes.push(`${loadingClass}--vertical`);
        }
        if (fullscreen()) {
          classes.push(`${loadingClass}--fullscreen`);
        }
        if (!fullscreen() && attach()) {
          classes.push(`${loadingClass}--full`);
        }
        const n = className();
        if (n) {
          classes.push(n);
        }
        return classes.join(' ');
      },
      s_color() {
        return inheritColor() ? 'inherit' : '';
      },
      s_fontSize: size,
      children() {
        renderIf(realLoading, function () {
          if (typeof indicator == 'function') {
            indicator(renderTheme);
          } else if (indicator) {
            renderTheme();
          }

          if (text) {
            fdom.span({
              className: textClass,
              children: text,
            });
          }
          renderTNode(children);
        });
      },
    });
  };

  const teleportElement = createSignal<HTMLElement | null>(null);
  addEffect(() => {
    const el = attach();
    if (!el) {
      return;
    }
    if (typeof el == 'string') {
      teleportElement.set(document.querySelector(el));
    } else {
      teleportElement.set(el);
    }
  });
  renderOne(
    () => {
      const out = fullscreen() || teleportElement.get();
      if (out) {
        if (typeof out == 'boolean') {
          return document.body;
        }
        return out;
      }
    },
    function (el) {
      if (el) {
        renderPortal(el, renderContent);
      } else {
        renderContent();
      }
    },
  );
}
