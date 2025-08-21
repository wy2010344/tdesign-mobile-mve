import { fdom, FDomAttributes, FPDomAttributes } from 'mve-dom';
import { ValueOrGet, valueOrGetToGet } from 'wy-helper';
import { usePrefixClass } from '../hooks/useClass';
import { TNode, SizeEnum } from '../common';
import { getFormIsDisabled } from '../form';
import { renderIfP } from 'mve-helper';
export function Link({
  prefixIcon,
  suffixIcon,
  disabled,
  allowHover: _allowHover,
  size: _size = 'medium',
  theme: _theme = 'default',
  underline: _underline,
  children,
  ...args
}: {
  prefixIcon?: TNode;
  suffixIcon?: TNode;
  children?: TNode;
  disabled?: ValueOrGet<boolean>;
  allowHover?: ValueOrGet<boolean>;
  size?: ValueOrGet<SizeEnum>;
  theme?: ValueOrGet<'default' | 'primary' | 'danger' | 'warning' | 'success'>;
  underline?: ValueOrGet<boolean>;
} & FPDomAttributes<'a'>) {
  const linkClass = usePrefixClass('link');

  const isDisabled = getFormIsDisabled(disabled);
  const underline = valueOrGetToGet(_underline);
  const size = valueOrGetToGet(_size);
  const theme = valueOrGetToGet(_theme);
  const allowHover = valueOrGetToGet(_allowHover);
  const className = valueOrGetToGet(args.className);
  const href = valueOrGetToGet(args.href);
  fdom.a({
    ...args,
    aria_disabled: isDisabled,
    href() {
      if (isDisabled()) {
        return undefined;
      }
      return href();
    },
    onClick(e) {
      if (isDisabled()) {
        return;
      }
      args.onClick?.(e);
    },
    className() {
      const cs = [linkClass, `${linkClass}--${theme() || 'default'}`, `${linkClass}--${size() || 'medium'}`];
      if (isDisabled()) {
        cs.push(`${linkClass}--disabled`);
      } else if (allowHover()) {
        cs.push(`${linkClass}--hover`);
      }
      if (underline()) {
        cs.push(`${linkClass}--underline`);
      }
      const c = className();
      if (c) {
        cs.push(c);
      }
      return cs.join(' ');
    },
    children() {
      renderIfP(prefixIcon, function (prefixIcon) {
        fdom.span({
          className: `${linkClass}__prefix-icon`,
          children: prefixIcon,
        });
      });
      renderIfP(children, function (children) {
        fdom.span({
          className: `${linkClass}__content`,
          children: children,
        });
      });
      renderIfP(suffixIcon, function (suffixIcon) {
        fdom.span({
          className: `${linkClass}__suffix-icon`,
          children: suffixIcon,
        });
      });
    },
  });
}
