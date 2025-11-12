import { fdom } from 'mve-dom';
import { CheckboxGroup, CheckboxInput } from '..';

export default function Special() {
  fdom.div({
    children() {
      // 无边框模式
      fdom.div({
        s_marginBottom: '16px',
        children() {
          CheckboxGroup({
            name: 'checkbox-borderless',
            borderless: true,
            children() {
              CheckboxInput({
                value: '1',
                label: '无边框多选',
              });
              CheckboxInput({
                value: '2',
                label: '无边框多选',
              });
            },
          });
        },
      });

      // 最大选择数量限制
      fdom.div({
        children() {
          CheckboxGroup({
            name: 'checkbox-max',
            max: 2,
            children() {
              CheckboxInput({
                value: '1',
                label: '最多选2个',
              });
              CheckboxInput({
                value: '2',
                label: '最多选2个',
              });
              CheckboxInput({
                value: '3',
                label: '最多选2个',
              });
              CheckboxInput({
                value: '4',
                label: '最多选2个',
              });
            },
          });
        },
      });
    },
  });
}
