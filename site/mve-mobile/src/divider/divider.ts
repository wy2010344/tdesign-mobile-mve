import { fdom, FPDomAttributes } from 'mve-dom';
import { cns } from 'wy-dom-helper';
import { ValueOrGet, valueOrGetToGet } from 'wy-helper';
import { usePrefixClass } from '../hooks/useClass';
import { TNode } from 'mve-dom-helper';

export function Divider({
  dashed: _dashed = false,
  align: _align = 'center',
  layout: _layout = 'horizontal',
  children,
  ...args
}: {
  dashed?: ValueOrGet<boolean>;
  align?: ValueOrGet<'left' | 'center' | 'right'>;
  layout?: ValueOrGet<'horizontal' | 'vertical'>;
  children?: TNode;
} & FPDomAttributes<'div'>) {
  const dividerClass = usePrefixClass('divider');
  const className = valueOrGetToGet(args.className || '');
  const dashed = valueOrGetToGet(_dashed);
  const layout = valueOrGetToGet(_layout);
  const align = valueOrGetToGet(_align);
  fdom.div({
    ...args,
    className() {
      return cns(
        className(),
        dividerClass,
        `${dividerClass}--${layout()}`,
        `${dividerClass}--${align()}`,
        dashed() && `${dividerClass}--dashed`,
      );
    },
    role: 'separator',
    children() {
      fdom.div({
        className: `${dividerClass}__content`,
        children,
      });
    },
  });
}
