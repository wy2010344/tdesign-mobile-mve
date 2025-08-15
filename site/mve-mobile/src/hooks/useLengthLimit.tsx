import { getCharacterLength, getUnicodeLength, limitUnicodeMaxLength } from '../_common/js/utils/helper';
import { GetValue, memo, ValueOrGet, valueOrGetToGet } from 'wy-helper';

export type OnValidate = (context: { error?: 'exceed-maximum' | 'below-minimum' }) => void;
export interface UseLengthLimitParams {
  value: GetValue<string>;
  /**
   * max作为length而不是character来使用
   */
  asLength?: ValueOrGet<boolean>;
  /**
   * 默认作为character
   */
  max?: ValueOrGet<number>;
  allowInputOverMax?: ValueOrGet<boolean>;
}

export default function getLengthLimit(params: UseLengthLimitParams) {
  const value = params.value;
  const asLength = valueOrGetToGet(params.asLength || false);
  const max = valueOrGetToGet(params.max || 0);
  const allowInputOverMax = valueOrGetToGet(params.allowInputOverMax || false);
  // 文本超出数量限制时，是否允许继续输入
  const getValueByLimitNumber = (inputValue: string) => {
    const m = max();
    if (!m || allowInputOverMax() || !inputValue) {
      //无限制
      return inputValue;
    }
    if (asLength()) {
      // input value could be unicode 😊
      return limitUnicodeMaxLength(inputValue, m);
    }
    return getCharacterLength(inputValue, m).characters;
  };

  return {
    length: memo(() => {
      const v = value();
      if (asLength()) {
        return v.length ? getUnicodeLength(v) : 0;
      }
      return getCharacterLength(v);
    }),
    max,
    getValueByLimitNumber,
  };
}
