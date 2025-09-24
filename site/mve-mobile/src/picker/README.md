# Picker 选择器

提供多个选项集合供用户选择其中一个，通常与弹出层组件配合使用。

## 特性

- 支持单列和多列选择
- 支持联动选择
- 支持自定义选项渲染
- 支持禁用选项
- 支持惯性滚动
- 完全基于 MVE 框架实现

## 基本用法

```typescript
import { Picker } from './picker';
import { createSignal } from 'wy-helper';

const value = createSignal<PickerValue[]>([]);
const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
];

Picker({
  value: value.get(),
  columns: options,
  onConfirm: (selectedValue) => {
    value.set(selectedValue);
  },
  onCancel: () => {
    console.log('取消选择');
  },
});
```

## 多列选择

```typescript
const multiColumns = [
  [
    { label: '2023', value: '2023' },
    { label: '2024', value: '2024' },
  ],
  [
    { label: '春', value: '春' },
    { label: '夏', value: '夏' },
    { label: '秋', value: '秋' },
    { label: '冬', value: '冬' },
  ],
];

Picker({
  value: [],
  columns: multiColumns,
  title: '选择年份和季节',
  onConfirm: (value) => console.log('选择结果:', value),
});
```

## 联动选择

```typescript
const getColumns = (values: PickerValue[]) => {
  const provinces = [
    { label: '北京市', value: '北京市' },
    { label: '上海市', value: '上海市' },
  ];
  
  const cities = {
    '北京市': [
      { label: '东城区', value: '东城区' },
      { label: '西城区', value: '西城区' },
    ],
    '上海市': [
      { label: '黄浦区', value: '黄浦区' },
      { label: '徐汇区', value: '徐汇区' },
    ],
  };
  
  const columns = [provinces];
  if (values[0] && cities[values[0] as string]) {
    columns.push(cities[values[0] as string]);
  }
  
  return columns;
};

Picker({
  value: [],
  columns: getColumns,
  onPick: (value, context) => {
    // 当选择省份时，清空城市选择
    if (context.column === 0) {
      // 处理联动逻辑
    }
  },
});
```

## API

### Picker Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| cancelBtn | `boolean \| string` | `true` | 取消按钮文字 |
| columns | `PickerColumn \| Array<PickerColumn> \| Function` | `[]` | 配置每一列的选项 |
| confirmBtn | `boolean \| string` | `true` | 确定按钮文字 |
| title | `string` | `''` | 标题 |
| value | `Array<PickerValue>` | `[]` | 选中值 |
| keys | `KeysType` | - | 用来定义 value / label / disabled 在 columns 中对应的字段别名 |
| swipeDuration | `string \| number` | `300` | 快速滑动时惯性滚动的时长，单位 ms |

### Picker Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| onConfirm | `(value: Array<PickerValue>, context: { index: number[]; e: MouseEvent; label: string[] }) => void` | 点击确认按钮时触发 |
| onCancel | `(context: { e: MouseEvent }) => void` | 点击取消按钮时触发 |
| onChange | `(value: Array<PickerValue>, context: { columns: Array<PickerContext>; e: MouseEvent }) => void` | 选中变化时候触发 |
| onPick | `(value: Array<PickerValue>, context: PickerContext) => void` | 任何一列选中都会触发 |

### 类型定义

```typescript
export type PickerValue = string | number;

export interface PickerColumnItem {
  label: string;
  value: PickerValue;
  disabled?: boolean;
}

export type PickerColumn = PickerColumnItem[];

export interface PickerContext {
  column: number;
  index: number;
}

export interface KeysType {
  value?: string;
  label?: string;
  disabled?: string;
}
```

## 注意事项

1. 组件基于 MVE 框架实现，需要配合 `mve-dom` 和 `wy-helper` 使用
2. 滚动逻辑使用原生 touch 事件实现，支持惯性滚动
3. 建议与 Popup 组件配合使用，提供更好的用户体验
4. 联动选择时，需要在 `onPick` 事件中处理数据更新逻辑