import { Radio, RadioInput } from '../radio';
import { RadioGroup } from '../radio-group';

export function horizontal() {
  RadioGroup({
    borderless: true,
    name: 'radio',
    s_display: 'flex',
    s_justifyContent: 'space-between',
    s_padding: '16px',
    s_background: '#fff',
    children() {
      RadioInput({
        block: false,
        value: '1',
        label: '单选',
      });
      RadioInput({
        block: false,
        value: '2',
        label: '单选',
      });
      RadioInput({
        block: false,
        value: '3',
        label: '单选',
      });
    },
  });
}
