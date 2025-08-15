import { fdom } from 'mve-dom';
import { Button } from '../../button';
import { Toast } from '../index';
import { css } from 'wy-dom-helper';

export default function BaseDemo() {
  const showText = () => {
    Toast({
      children: '轻提示文字内容',
    });
  };

  const showMultiText = () => {
    Toast({
      children: '最多一行展示十个汉字宽度限制最多不超过三行文字行文字行文字',
    });
  };

  const showHorizontalText = () => {
    Toast({
      theme: 'success',
      direction: 'row',
      children: '轻提示文字内容',
      duration: 3000,
    });
  };

  const showVerticalText = () => {
    Toast({
      theme: 'success',
      direction: 'column',
      children: '轻提示文字内容',
    });
  };

  const showLoading = () => {
    Toast({
      theme: 'loading',
      children: '轻提示文字内容',
    });
  };

  fdom.div({
    id: 'toast-demo',
    className: s,
    children() {
      Button({
        block: true,
        size: 'large',
        theme: 'primary',
        variant: 'outline',
        children: '纯文本',
        onClick: showText,
      });

      Button({
        block: true,
        size: 'large',
        theme: 'primary',
        variant: 'outline',
        children: '多行文字',
        onClick: showMultiText,
      });

      Button({
        block: true,
        size: 'large',
        theme: 'primary',
        variant: 'outline',
        children: '带横向图标',
        onClick: showHorizontalText,
      });

      Button({
        block: true,
        size: 'large',
        theme: 'primary',
        variant: 'outline',
        children: '带竖向图标',
        onClick: showVerticalText,
      });

      Button({
        block: true,
        size: 'large',
        theme: 'primary',
        variant: 'outline',
        children: '加载状态',
        onClick: showLoading,
      });
    },
  });
}

const s = css`
  .t-button + .t-button {
    margin-top: 16px;
  }
`;
