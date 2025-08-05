import { fdom } from 'mve-dom';
import { Loading } from '../index';

export default function PureTextDemo() {
  Loading({
    indicator: false,
    text: '加载中...',
  });
}
