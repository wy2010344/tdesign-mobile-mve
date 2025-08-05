import { fdom } from 'mve-dom';
import { Loading } from '../index';
import { Switch } from '../../switch';
import { css } from 'wy-dom-helper';
import { signal } from 'mve-signal';

export default function DelayDemo() {
  const showLoading = signal(false);

  const onChangeLoading = (value: boolean) => {
    showLoading.value = value;
  };

  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'switch-wrap',
        children() {
          Switch({
            onChange: onChangeLoading,
          });
          fdom.div({
            children: () => (showLoading.value ? '请求发起，延迟显示loading' : '请求结束，隐藏loading'),
          });
        },
      });
      Loading({
        delay: 1000,
        loading: showLoading,
        text: '加载中...',
      });
    },
  });
}

const s = css`
  .switch-wrap {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 0.7);
    font-size: 14px;

    .t-switch {
      margin-right: 10px;
    }
  }
`;
