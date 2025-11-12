import { fdom } from 'mve-dom';
import { CheckboxGroup, CheckboxInput, Checkbox } from '..';

export function Icon() {
  fdom.div({
    children() {
      // 圆形图标
      fdom.div({
        s_marginBottom: '16px',
        children() {
          CheckboxGroup({
            name: 'checkbox-circle',
            children() {
              CheckboxInput({
                value: '1',
                label: '圆形图标',
                icon: 'circle',
              });
              CheckboxInput({
                value: '2',
                label: '圆形图标',
                icon: 'circle',
              });
            },
          });
        },
      });

      // 矩形图标
      fdom.div({
        s_marginBottom: '16px',
        children() {
          CheckboxGroup({
            name: 'checkbox-rectangle',
            children() {
              CheckboxInput({
                value: '1',
                label: '矩形图标',
                icon: 'rectangle',
              });
              CheckboxInput({
                value: '2',
                label: '矩形图标',
                icon: 'rectangle',
              });
            },
          });
        },
      });

      // 线条图标
      fdom.div({
        s_marginBottom: '16px',
        children() {
          CheckboxGroup({
            name: 'checkbox-line',
            children() {
              CheckboxInput({
                value: '1',
                label: '线条图标',
                icon: 'line',
              });
              CheckboxInput({
                value: '2',
                label: '线条图标',
                icon: 'line',
              });
            },
          });
        },
      });

      // 半选状态
      fdom.div({
        children() {
          Checkbox({
            label: '半选状态',
            checked: true,
            indeterminate: true,
            icon: 'circle',
          });
        },
      });
    },
  });
}
