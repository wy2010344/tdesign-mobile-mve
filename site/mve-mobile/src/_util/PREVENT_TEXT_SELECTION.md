# 防止文字选择问题说明

## 问题描述

在移动端开发中，当用户点击或触摸某些交互元素（如按钮、单元格、选择器等）时，浏览器可能会意外选择文字内容，这会导致：

1. **用户体验问题** - 文字被选中后会显示选择高亮，影响视觉效果
2. **交互冲突** - 文字选择可能与组件的预期交互行为冲突
3. **触摸反馈异常** - 在某些设备上可能触发意外的上下文菜单

## TDesign 的解决方案

TDesign Mobile Vue 组件通过以下方式防止文字选择：

### 1. CSS 样式控制
```css
.t-cell {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}
```

### 2. 触摸事件处理
- 使用专门的 Hover 指令处理触摸反馈
- 设置 `passive: true` 和适当的事件处理机制
- 在必要时调用 `preventDefault()`

## MVE 框架的解决方案

在 MVE 框架中，我们提供了统一的解决方案：

### 1. 样式工具函数

```typescript
import { preventTextSelectionStyles, preventTouchDefaultStyles } from '../_util/preventTextSelection';

// 基础防文字选择
fdom.div({
  ...preventTextSelectionStyles,
  children: '点击我不会选择文字'
});

// 完整的触摸控制（包含 touch-action: none）
fdom.div({
  ...preventTouchDefaultStyles,
  children: '滑动组件内容'
});
```

### 2. 编程式添加样式

```typescript
import { addPreventTextSelectionStyles } from '../_util/preventTextSelection';

const element = document.getElementById('myElement');
addPreventTextSelectionStyles(element);
```

## 各属性说明

| 属性 | 作用 | 兼容性 |
|------|------|--------|
| `user-select: none` | 标准属性，防止文字选择 | 现代浏览器 |
| `-webkit-user-select: none` | WebKit 内核浏览器 | Safari, Chrome |
| `-moz-user-select: none` | Firefox 浏览器 | Firefox |
| `-ms-user-select: none` | IE/Edge 浏览器 | IE 10+, Edge |
| `-webkit-touch-callout: none` | 防止 iOS 长按弹出菜单 | iOS Safari |
| `-webkit-tap-highlight-color: transparent` | 防止点击高亮效果 | WebKit |
| `touch-action: none` | 禁用浏览器默认触摸行为 | 现代浏览器 |

## 使用建议

### 1. 交互组件必须使用
以下类型的组件建议使用防文字选择样式：
- 按钮 (Button)
- 单元格 (Cell) 
- 选择器 (Picker)
- 开关 (Switch)
- 滑块 (Slider)
- 标签页 (Tabs)

### 2. 内容展示组件谨慎使用
以下组件通常不应该禁用文字选择：
- 文本内容 (Text)
- 文章内容 (Article)
- 代码块 (Code)
- 输入框内的文字

### 3. 混合场景的处理
对于既有交互又有文字内容的组件：
- 在容器级别禁用文字选择
- 在特定的文字内容区域重新启用文字选择

```typescript
fdom.div({
  ...preventTextSelectionStyles, // 容器禁用选择
  children() {
    fdom.div({
      className: 'interactive-area',
      children: '点击区域'
    });
    
    fdom.div({
      s_userSelect: 'text', // 重新启用文字选择
      children: '可选择的文字内容'
    });
  }
});
```

## 注意事项

1. **不要过度使用** - 只在确实需要的交互组件上使用
2. **考虑可访问性** - 确保用户仍然可以通过其他方式复制重要内容
3. **测试多设备** - 在不同的移动设备和浏览器上测试效果
4. **性能影响** - 这些样式对性能影响很小，可以放心使用