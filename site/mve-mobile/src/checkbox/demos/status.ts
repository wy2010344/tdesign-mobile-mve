import { CheckboxGroup, CheckboxInput } from '..';

export function status() {
  CheckboxGroup({
    name: 'checkbox-status',
    disabled: true,
    children() {
      CheckboxInput({
        value: '1',
        label: '多选禁用-已选',
      });
      CheckboxInput({
        value: '2',
        label: '多选禁用-默认',
      });
    },
  });
}
