import { memo } from 'wy-helper';
import useConfig from './useConfig';

export function usePrefixClass(componentName?: string) {
  const { classPrefix } = useConfig();

  return componentName ? `${classPrefix}-${componentName}` : classPrefix;
}
