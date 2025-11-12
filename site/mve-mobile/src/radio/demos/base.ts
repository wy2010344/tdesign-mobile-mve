import { RadioGroup, Radio, RadioInput } from '..';

export default function () {
  RadioGroup({
    name: 'radio',
    children() {
      RadioInput({
        value: '1',
        label: '单选',
      });
      RadioInput({
        value: '2',
        label: '单选',
      });
      RadioInput({
        value: '3',
        label: '单选',
      });
      RadioInput({
        value: '4',
        label: '单选',
        content: '描述',
      });
    },
  });
}
