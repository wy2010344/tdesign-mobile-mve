import { Radio, RadioInput } from '../radio';
import { RadioGroup } from '../radio-group';

export function status() {
  RadioGroup({
    disabled: true,
    name: 'status',
    children() {
      RadioInput({
        value: '1',
        label: '选项禁用-已选',
      });
      RadioInput({
        value: '2',
        label: '选项禁用-默认',
      });
    },
  });
}
