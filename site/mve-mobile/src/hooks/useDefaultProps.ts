import { memo } from 'wy-helper';

// MVE版本的useDefaultProps - 合并默认属性
export default function useDefaultProps<T>(originalProps: T, defaultProps: Record<PropertyKey, any>): T {
  return memo(() => {
    const props = Object.assign({}, originalProps);
    Object.keys(defaultProps).forEach((key) => {
      if (props[key] === undefined) {
        props[key] = defaultProps[key];
      }
    });
    return props;
  }, [originalProps, defaultProps]);
}
