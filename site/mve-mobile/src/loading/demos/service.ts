import { fdom } from 'mve-dom';
import { Loading } from '../index';
import { Button } from '../../button';
import { css } from 'wy-dom-helper';
import { signal } from 'mve-signal';

export default function ServiceDemo() {
  const attachLoading = signal(false);
  let contentRef: HTMLElement;

  // 函数式：局部加载
  const showAttach = () => {
    // 这里需要根据实际的 LoadingPlugin 实现来调整
    // const loadingAttachInstance = LoadingPlugin({
    //   attach: () => contentRef,
    //   size: '20px',
    // });
    attachLoading.value = true;
    const timer = setTimeout(() => {
      // loadingAttachInstance.hide();
      attachLoading.value = false;
      clearTimeout(timer);
    }, 1000);
  };

  // 函数式：全屏加载，防止滚动穿透
  const showFullScreen = () => {
    // LoadingPlugin(true);
    const timer = setTimeout(() => {
      // LoadingPlugin(false);
      clearTimeout(timer);
    }, 1000);
  };

  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'loading-demo',
        children() {
          fdom.div({
            id: 'loading-service-demo',
            className: 'loading-service-demo',
            children: 'Loading 挂载容器',
            ref: (el) => (contentRef = el),
          });
          fdom.div({
            className: 'space',
            children() {
              Button({
                className: 't-loading__btn',
                size: 'small',
                disabled: () => attachLoading.value,
                onClick: showAttach,
                children: '函数方式加载（局部）',
              });
              Button({
                size: 'small',
                onClick: showFullScreen,
                children: '函数方式加载（全屏）',
              });
            },
          });
        },
      });
    },
  });
}

const s = css`
  .loading-demo {
    padding: 0 16px;
  }

  .space {
    display: flex;
    margin-top: 8px;
    gap: 6px;
  }

  .loading-service-demo {
    position: relative;
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px var(--component-border, #eee) solid;
  }
`;
