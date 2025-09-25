# Collapse 折叠面板

可以折叠/展开的内容区域。

## 特性

- 支持基础的折叠展开功能
- 支持手风琴模式（互斥展开）
- 支持卡片风格
- 支持自定义展开图标
- 支持图标位置配置
- 支持面板禁用
- 支持销毁折叠内容
- 完全基于 MVE 框架实现

## 基本用法

```typescript
import { Collapse, CollapsePanel } from './collapse';

Collapse({
  renderPanels() {
    CollapsePanel({
      value: '1',
      header: '折叠面板标题',
      renderContent() {
        fdom.div({
          children: '面板内容'
        });
      },
    });
  },
});
```

## 手风琴模式

```typescript
import { createSignal } from 'wy-helper';

const values = createSignal(['1']);

Collapse({
  expandMutex: true, // 开启手风琴模式
  value: values.get(),
  onChange: (val) => values.set(val),
  renderPanels() {
    // 渲染多个面板
    for (let i = 1; i <= 3; i++) {
      CollapsePanel({
        value: i,
        header: `面板 ${i}`,
        renderContent() {
          fdom.div({ children: `内容 ${i}` });
        },
      });
    }
  },
});
```

## 卡片风格

```typescript
Collapse({
  theme: 'card',
  renderPanels() {
    CollapsePanel({
      value: '1',
      header: '卡片面板',
      renderContent() {
        fdom.div({ children: '卡片内容' });
      },
    });
  },
});
```

## 自定义操作

```typescript
CollapsePanel({
  value: '1',
  header: '可操作面板',
  headerRightContent() {
    fdom.div({
      onClick: (e) => {
        e.stopPropagation(); // 阻止面板展开
        console.log('执行操作');
      },
      children: '操作按钮',
    });
  },
  renderContent() {
    fdom.div({ children: '面板内容' });
  },
});
```

## API

### Collapse Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| defaultExpandAll | `boolean` | `false` | 默认是否展开全部 |
| disabled | `boolean` | `false` | 是否禁用面板展开/收起操作 |
| expandIcon | `boolean \| TNode` | `true` | 展开图标 |
| expandMutex | `boolean` | `false` | 每个面板互斥展开，每次只展开一个面板 |
| theme | `'default' \| 'card'` | `'default'` | 折叠面板风格 |
| value | `CollapseValue` | `[]` | 展开的面板集合 |
| defaultValue | `CollapseValue` | `[]` | 展开的面板集合，非受控属性 |
| renderPanels | `() => void` | - | 渲染面板内容的函数 |

### Collapse Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| onChange | `(value: CollapseValue, context: { e: MouseEvent }) => void` | 切换面板时触发 |

### CollapsePanel Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| content | `TNode` | - | 折叠面板内容 |
| destroyOnCollapse | `boolean` | `false` | 当前面板处理折叠状态时，是否销毁面板内容 |
| disabled | `boolean` | - | 禁止当前面板展开 |
| expandIcon | `boolean \| TNode` | - | 当前折叠面板展开图标 |
| header | `TNode` | - | 面板头内容 |
| headerLeftIcon | `TNode` | - | 面板头左侧图标 |
| headerRightContent | `TNode` | - | 面板头的右侧区域 |
| placement | `'bottom' \| 'top'` | `'bottom'` | 选项卡内容的位置 |
| value | `string \| number` | - | 当前面板唯一标识 |
| renderContent | `() => void` | - | 渲染内容的函数 |

### 类型定义

```typescript
export type CollapseValue = Array<string | number>;

export interface CollapseContext {
  activeValue: CollapseValue;
  disabled: boolean;
  expandIcon?: boolean | TNode;
  expandMutex: boolean;
  theme: 'default' | 'card';
  onPanelChange: (value: string | number, e: MouseEvent) => void;
}
```

## 注意事项

1. 组件基于 MVE 框架实现，需要配合 `mve-dom` 和 `wy-helper` 使用
2. 使用上下文机制在 Collapse 和 CollapsePanel 之间共享状态
3. 支持函数式渲染，提供更好的性能和灵活性
4. CollapsePanel 必须在 Collapse 内部使用
5. 面板的 value 属性用作唯一标识，建议使用字符串或数字类型