import { fdom } from 'mve-dom';
import { valueOrGetToGet, memo, createSignal, emptyFun, run } from 'wy-helper';
import { SwitchProps } from './type';
import { Loading } from '../loading';
import { usePrefixClass } from '../hooks/useClass';
import { getFormIsDisabled } from '../form';
import { renderTNode } from '../_util/parseTNode';
import { renderIf, renderOne } from 'mve-helper';

/**
 * Switch 开关组件
 * 用于两个互斥选项间的状态切换
 */
export function Switch({
  disabled: _disabled,
  icon,
  label,
  loading: _loading = false,
  size: _size = 'medium',
  value: _value = false,
  onChange,
  className: _className,
  ...args
}: SwitchProps) {
  const switchClass = usePrefixClass('switch');

  const disabled = getFormIsDisabled(_disabled);
  const loading = valueOrGetToGet(_loading);
  const size = valueOrGetToGet(_size);
  const className = valueOrGetToGet(_className);

  // 计算是否选中
  const checked = valueOrGetToGet(_value);

  // 处理切换
  const handleToggle = (event: Event) => {
    event.preventDefault();
    if (disabled() || loading()) {
      return;
    }

    const newValue = !checked();
    onChange?.(newValue);
  };

  // 渲染内容
  const renderContent = () => {
    const LoadingFun = () => {
      Loading({
        className: `${switchClass}__loading`,
        size: '16px',
      });
    };
    function LabelFun() {
      if (Array.isArray(label)) {
        renderIf(
          checked,
          () => {
            renderTNode(label[0]);
          },
          () => {
            renderTNode(label[1]);
          },
        );
      } else {
        renderIf(checked, label!, label);
      }
    }
    function IconFun() {
      if (Array.isArray(icon)) {
        renderIf(
          checked,
          () => {
            renderTNode(icon[0]);
          },
          () => {
            renderTNode(icon[1]);
          },
        );
      } else {
        renderIf(checked, icon!, icon);
      }
    }
    renderOne(() => {
      if (loading()) {
        return LoadingFun;
      }
      if (label) {
        return LabelFun;
      }
      if (icon) {
        return IconFun;
      }
      return emptyFun;
    }, run);
  };

  return fdom.div({
    ...args,
    className() {
      const classes = [switchClass, `${switchClass}--${size()}`];

      if (checked()) {
        classes.push(`${switchClass}--checked`);
      }

      if (disabled() || loading()) {
        classes.push(`${switchClass}--disabled`);
      }

      const n = className();
      if (n) classes.push(n);
      return classes.join(' ');
    },
    onClick: handleToggle,
    children() {
      fdom.div({
        className() {
          const classes = [`${switchClass}__dot`, `${switchClass}__dot--${size()}`];

          if (checked()) {
            classes.push(`${switchClass}__dot--checked`);
          }

          const hasContent = label || icon || loading();

          if (!hasContent) {
            classes.push(`${switchClass}__dot--plain`);
          }

          if (disabled() || loading()) {
            classes.push(`${switchClass}__dot--disabled`);
          }

          return classes.join(' ');
        },
        children() {
          fdom.div({
            className() {
              const classes = [`${switchClass}__label`, `${switchClass}__label--${size()}`];

              if (checked()) {
                classes.push(`${switchClass}__label--checked`);
              }

              return classes.join(' ');
            },
            children: renderContent,
          });
        },
      });
    },
  });
}
