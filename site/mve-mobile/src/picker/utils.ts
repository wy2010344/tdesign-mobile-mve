import { PickerColumn, PickerColumnItem, KeysType } from './type';

/**
 * 获取 picker 列数据
 */
export function getPickerColumns(columns: any): PickerColumn[] {
  if (!columns) return [];

  // 如果是单列数据，转换为多列格式
  if (Array.isArray(columns) && columns.length > 0) {
    // 检查第一个元素是否是 PickerColumnItem
    if (typeof columns[0] === 'object' && 'label' in columns[0]) {
      return [columns as PickerColumn];
    }
    // 否则认为是多列数据
    return columns as PickerColumn[];
  }

  return [];
}

/**
 * 根据 keys 配置获取对象属性值
 */
export function getValueByKeys(item: any, key: string, keys?: KeysType): any {
  const realKey = keys?.[key as keyof KeysType] || key;
  return item?.[realKey];
}

/**
 * 查找启用选项的索引
 */
export function findIndexOfEnabledOption(options: PickerColumn, index: number, keys?: KeysType): number {
  if (!options || options.length === 0) return 0;

  // 如果当前索引的选项未禁用，直接返回
  if (index >= 0 && index < options.length) {
    const item = options[index];
    const disabled = getValueByKeys(item, 'disabled', keys);
    if (!disabled) return index;
  }

  // 查找第一个未禁用的选项
  for (let i = 0; i < options.length; i++) {
    const item = options[i];
    const disabled = getValueByKeys(item, 'disabled', keys);
    if (!disabled) return i;
  }

  return 0;
}

/**
 * 限制数字在指定范围内
 */
export function limitNumberInRange(num: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, num));
}
