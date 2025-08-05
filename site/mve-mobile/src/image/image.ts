import { fdom } from 'mve-dom';
import { createSignal, valueOrGetToGet, emptyFun, run, addEffect } from 'wy-helper';
import { Loading } from '../loading';
import { TdClose } from 'mve-icons/td';
import { TdImageProps } from './type';
import { hookDestroy, hookTrackSignal, renderIf, renderOne, renderOneP } from 'mve-helper';
import { TSvg } from '../../svg';
import { usePrefixClass } from '../hooks/useClass';
import { observerIntersection } from 'wy-dom-helper';
/**
 * Image 图片组件 (改进版 - 基于Vue版本的严谨实现)
 * 用于展示图片素材
 *
 * 按照MVE思维模式实现，参考Vue版本的严谨做法
 */
export function Image(props: TdImageProps) {
  // 设置默认值 - 直接在解构中设置，类似Vue的props默认值
  const {
    error = () =>
      TdClose(TSvg, {
        s_width: '22px',
        s_height: '22px',
      }),
    loading = () =>
      Loading({
        theme: 'dots',
        inheritColor: true,
      }),
    position = 'center',
    referrerpolicy = '',
    fit = 'fill',
    fallback = '',
    lazy = false,
    shape: _shape = 'square',
    src: _src = '',
    alt,
    onLoad,
    onError,
    srcset,
    className: _className,
    ...args
  } = props;

  // 类名前缀
  const imageClass = usePrefixClass('image');
  // 转换为响应式getter函数 - 这是MVE的核心
  const shape = valueOrGetToGet(_shape);
  const src = valueOrGetToGet(_src);
  const isLoading = createSignal(true);
  const isError = createSignal(false);
  const className = valueOrGetToGet(_className);
  // 图片状态管理
  const realSrc = createSignal('');

  hookTrackSignal(
    () => {
      return props.lazy ? '' : src();
    },
    function (src) {
      addEffect(() => {
        realSrc.set(src);
      });
    },
  );

  return fdom.div({
    ...args,
    className() {
      const classes = [imageClass, `${imageClass}--${shape()}`];
      const c = className();
      if (c) {
        classes.push(c);
      }
      return classes.join(' ');
    },
    children() {
      // 渲染遮罩层 - 统一的遮罩逻辑
      renderIf(
        () => {
          if (isLoading.get() || isError.get()) {
            if (lazy && !realSrc.get()) {
              return;
            }
            return true;
          }
        },
        function () {
          fdom.div({
            className: `${imageClass}__mask`,
            children() {
              renderOne(() => {
                if (isLoading.get()) {
                  return loading;
                }
                if (isError.get()) {
                  return error;
                }
                return emptyFun;
              }, run);
            },
          });
        },
      );
      // 学习Vue版本 - 始终使用picture包装img，更符合HTML5标准
      fdom.picture({
        children() {
          // 渲染source标签（如果有srcset）
          renderOneP(srcset, function (srcset) {
            if (srcset && Object.keys(srcset).length > 0) {
              Object.entries(srcset).forEach(([type, url]) => {
                fdom.source({
                  type,
                  srcSet: url,
                });
              });
            }
          });
          // 始终渲染img标签作为fallback
          const img = fdom.img({
            className: `${imageClass}__img`,
            s_objectFit: fit,
            s_objectPosition: position,
            src: realSrc.get,
            alt: alt,
            referrerPolicy: referrerpolicy,
            onLoad(e) {
              isLoading.set(false);
              onLoad?.({ e });
            },
            onError(e) {
              if (realSrc.get() === '') {
                return;
              }
              onError?.({ e });
              isLoading.set(false);
              isError.set(true);
              if (props.fallback) {
                realSrc.set(fallback);
                isError.set(false);
              }
            },
          });

          hookDestroy(
            observerIntersection(
              function ([{ isIntersecting }]) {
                if (isIntersecting && lazy) {
                  realSrc.set(src());
                }
              },
              img,
              {
                rootMargin: '0px',
                threshold: 0,
              },
            ),
          );
        },
      });
    },
  });
}
