import { fdom } from 'mve-dom';
import { valueOrGetToGet } from 'wy-helper';
import { CollapseProps } from './type';
import { usePrefixClass } from '../hooks/useClass';
import { collapseContext } from './context';

/**
 * Collapse 折叠面板组件
 */
export function Collapse({ disabled: _disabled = false, theme: _theme = 'default', ...args }: CollapseProps) {
  const collapseClass = usePrefixClass('collapse');
  const theme = valueOrGetToGet(_theme);
  const className = valueOrGetToGet(args.className);
  const disabled = valueOrGetToGet(_disabled);
  collapseContext.provide({
    disabled,
  });
  return fdom.div({
    ...args,
    className() {
      const classes = [collapseClass, `${collapseClass}--${theme()}`];
      const customClass = className();
      if (customClass) classes.push(customClass);
      return classes.join(' ');
    },
  });
}
