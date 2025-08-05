import { fdom, renderPortal } from 'mve-dom';
import { addEffect, createSignal, memo, valueOrGetToGet } from 'wy-helper';
import { hookTrackSignal, renderIf, renderOne, renderOneP } from 'mve-helper';
import { LoadingProps } from './type';
import { FStyleProps } from 'wy-dom-helper';
import { OrFun } from 'mve-core';
import dots from './icon/dots';
import circular from './icon/circular';
import spinner from './icon/spinner';
/**
 * Loading 加载组件
 * 用于表示页面或操作的加载状态，给予用户反馈的同时减缓等待的焦虑感
 *
 * 按照MVE思维模式实现，更接近Vue的响应式模式
 */
export function Loading(props: LoadingProps) {
  // 设置默认值 - 直接在解构中设置，类似Vue的props默认值
  const { children, text, indicator = true, theme = 'circular', size = '20px', ...args } = props;

  // 类名前缀
  const loadingClass = 't-loading';

  // 转换为响应式getter函数
  const attach = valueOrGetToGet(props.attach);
  const delay = valueOrGetToGet(props.delay || 0);
  const duration = valueOrGetToGet(props.duration || 800);
  const fullscreen = valueOrGetToGet(props.fullscreen || false);
  const inheritColor = valueOrGetToGet(props.inheritColor || false);
  const layout = valueOrGetToGet(props.layout || 'horizontal');
  const loading = valueOrGetToGet(props.loading !== undefined ? props.loading : true);
  const pause = valueOrGetToGet(props.pause || false);
  const reverse = valueOrGetToGet(props.reverse || false);
  const delayShowLoading = createSignal(false);
  function countDelay() {
    addEffect(() => {
      delayShowLoading.set(false);
      const timer = setTimeout(() => {
        delayShowLoading.set(true);
        clearTimeout(timer);
      }, props.delay);
    });
  }
  const realLoading = memo(() => (!delay() || delayShowLoading.get()) && loading());
  // 监听loading和delay变化
  hookTrackSignal(loading, (value) => {
    if (value) {
      props.delay && countDelay();
    }
    const cls = `${loadingClass}--lock`;
    if (value && fullscreen()) {
      countDelay();
      document.body.classList.add(cls);
    } else {
      document.body.classList.remove(cls);
    }
  });

  const rootClass = memo(() => {
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
    return classes.join(' ');
  });

  const textClass = memo(() => {
    const classes: string[] = [`${loadingClass}__text`];
    if (props.indicator) {
      classes.push(`${loadingClass}__text--only`);
    }
    return classes.join(' ');
  });
  const rootStyle: OrFun<FStyleProps> = {
    s_color() {
      return inheritColor() ? 'inherit' : '';
    },
    s_fontSize: size,
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
      className: rootClass,
      ...rootStyle,
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
          props.children?.();
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
