import { fdom } from 'mve-dom';
import { createSignal } from 'wy-helper';
import { Picker } from '../picker';
import { Cell } from '../../cell';
import { Popup } from '../../popup';
import { PickerValue } from '../type';

/**
 * 带标题的选择器示例
 */
export function WithTitlePickerDemo() {
  const visible = createSignal(false);
  const area = createSignal<PickerValue[]>([]);
  const title = createSignal('');

  const options = [
    [
      { label: '北京市', value: '北京市' },
      { label: '上海市', value: '上海市' },
      { label: '广州市', value: '广州市' },
      { label: '深圳市', value: '深圳市' },
    ],
  ];

  const handleVisible = (hasTitle: boolean) => {
    title.set(hasTitle ? '选择城市' : '');
    visible.set(true);
  };

  const handleConfirm = (value: PickerValue[]) => {
    area.set(value);
    visible.set(false);
  };

  const handleCancel = () => {
    visible.set(false);
  };

  return fdom.div({
    children() {
      // 带标题选择器触发器
      Cell({
        arrow: true,
        title: '带标题选择器',
        onClick: () => handleVisible(true),
      });

      // 无标题选择器触发器
      Cell({
        arrow: true,
        title: '无标题选择器',
        onClick: () => handleVisible(false),
      });

      // 选择器弹窗
      Popup({
        visible: visible,
        placement: 'bottom',
        onVisibleChange: (vis) => visible.set(vis),
        children() {
          Picker({
            value: area.get(),
            columns: options,
            title: title.get(),
            onConfirm: handleConfirm,
            onCancel: handleCancel,
          });
        },
      });
    },
  });
}
