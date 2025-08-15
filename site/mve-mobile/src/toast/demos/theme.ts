import { fdom } from 'mve-dom';
import { Button } from '../../button';
import { Toast } from '../index';
import { css } from 'wy-dom-helper';

export default function ThemeDemo() {
  const showSuccessToast = () => {
    Toast({
      theme: 'success',
      direction: 'column',
      message: '轻提示文字内容',
      duration: 3000,
    });
  };

  const showWarningToast = () => {
    Toast({
      theme: 'warning',
      direction: 'column',
      message: '轻提示文字内容',
    });
  };

  const showErrorToast = () => {
    Toast({
      theme: 'error',
      direction: 'column',
      message: '轻提示文字内容',
    });
  };

  fdom.div({
    className: s,
    children() {
      Button({
        block: true,
        size: 'large',
        theme: 'primary',
        variant: 'outline',
        children: '成功提示',
        onClick: showSuccessToast,
      });

      Button({
        block: true,
        size: 'large',
        theme: 'primary',
        variant: 'outline',
        children: '警告提示',
        onClick: showWarningToast,
      });

      Button({
        block: true,
        size: 'large',
        theme: 'primary',
        variant: 'outline',
        children: '错误提示',
        onClick: showErrorToast,
      });
    },
  });
}

const s = css`
  .t-button + .t-button {
    margin-top: 16px;
  }
`;
