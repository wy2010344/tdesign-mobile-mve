import { fdom } from 'mve-dom';
import { CheckboxGroup, CheckboxInput } from '..';

export function horizontal() {
  fdom.div({
    s_display: 'flex',
    s_flexWrap: 'wrap',
    s_gap: '16px',
    children() {
      CheckboxGroup({
        name: 'checkbox-horizontal',
        children() {
          CheckboxInput({
            value: '1',
            label: '多选',
          });
          CheckboxInput({
            value: '2',
            label: '多选',
          });
          CheckboxInput({
            value: '3',
            label: '多选',
          });
        },
      });
    },
  });
}
