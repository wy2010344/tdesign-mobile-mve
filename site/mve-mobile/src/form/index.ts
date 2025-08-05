import { isBoolean } from 'lodash-es';
import { memo, ValueOrGet, valueOrGetToGet } from 'wy-helper';

/**
 * @todo 待实现
 * @returns
 */
export function getFormIsDisabled(_disabled?: ValueOrGet<boolean | undefined>, dMemo?: boolean) {
  const disabled = valueOrGetToGet(_disabled);
  function get() {
    const d = disabled();
    if (isBoolean(d)) {
      return d;
    }
    return false;
  }
  if (dMemo) {
    return memo(get);
  }
  return get;
}
