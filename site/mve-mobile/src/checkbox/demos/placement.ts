import { CheckboxGroup, CheckboxInput } from '..';

export default function Placement() {
  CheckboxGroup({
    name: 'checkbox-placement',
    placement: 'right',
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
        content: '描述',
      });
    },
  });
}
