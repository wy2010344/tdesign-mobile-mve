/**
 * 防止文字选择的样式属性
 * 用于移动端组件，防止用户在点击或滑动时意外选择文字
 */
export const preventTextSelectionStyles = {
  // 标准属性
  s_userSelect: 'none' as const,
  // WebKit 内核浏览器
  s_webkitUserSelect: 'none' as const,
  // Firefox
  s_mozUserSelect: 'none' as const,
  // IE/Edge
  s_msUserSelect: 'none' as const,
  // 防止 iOS Safari 长按弹出菜单
  s_webkitTouchCallout: 'none' as const,
  // 防止点击时的高亮效果
  s_webkitTapHighlightColor: 'transparent' as const,
};

/**
 * 防止触摸时的默认行为样式
 * 用于需要自定义触摸行为的组件
 */
export const preventTouchDefaultStyles = {
  ...preventTextSelectionStyles,
  // 禁用浏览器默认的触摸行为（如滚动、缩放等）
  s_touchAction: 'none' as const,
};

/**
 * 为元素添加防文字选择的样式
 * @param element HTML 元素
 */
export function addPreventTextSelectionStyles(element: HTMLElement): void {
  const styles = {
    userSelect: 'none',
    webkitUserSelect: 'none',
    mozUserSelect: 'none',
    msUserSelect: 'none',
    webkitTouchCallout: 'none',
    webkitTapHighlightColor: 'transparent',
  };

  Object.entries(styles).forEach(([key, value]) => {
    (element.style as any)[key] = value;
  });
}

/**
 * 为元素添加防触摸默认行为的样式
 * @param element HTML 元素
 */
export function addPreventTouchDefaultStyles(element: HTMLElement): void {
  addPreventTextSelectionStyles(element);
  element.style.touchAction = 'none';
}
