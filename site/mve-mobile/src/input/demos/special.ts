import { fdom } from 'mve-dom';
import { createSignal, memo } from 'wy-helper';
import { Input } from '../index';
import { css } from 'wy-dom-helper';

export default function SpecialDemo() {
  const phoneNumber = createSignal('17600600600');

  const isPhoneNumber = memo(() => {
    const phone = phoneNumber.get();
    return /^[1][3,4,5,7,8,9][0-9]{9}$/.test(phone);
  });

  const tips = memo(() => {
    return isPhoneNumber() ? '' : '手机号输入不正确';
  });

  fdom.div({
    className: s,
    children() {
      // 密码输入框
      Input({
        label: '输入密码',
        type: 'password',
        clearable: false,
        suffixIcon() {
          fdom.span({
            children: '🙈',
            s_fontSize: '16px',
          });
        },
      });

      // 验证码输入框
      Input({
        placeholder: '输入验证码',
        label: '验证码',
        suffix() {
          fdom.div({
            className: 'suffix',
            children() {
              fdom.div({
                className: 'suffix--line',
              });

              fdom.img({
                className: 'image',
                src: 'https://wwcdn.weixin.qq.com/node/wework/images/202010241547.ac6876be9c.png',
                alt: '验证码',
              });
            },
          });
        },
      });

      // 手机号输入框
      Input({
        model: phoneNumber,
        label: '手机号',
        placeholder: '输入手机号码',
        tips: () => tips(),
        status: () => (tips() ? 'error' : 'default'),
        suffix() {
          fdom.div({
            className: 'suffix',
            children() {
              fdom.div({
                className: 'suffix--line',
              });

              fdom.div({
                className: 'verify',
                children: '发送验证码',
              });
            },
          });
        },
      });

      // 价格输入框
      Input({
        label: '价格',
        align: 'right',
        placeholder: '0.00',
        suffix: '元',
        type: 'number',
      });

      // 数量输入框
      Input({
        label: '数量',
        align: 'right',
        placeholder: '填写个数',
        suffix: '个',
        type: 'number',
      });
    },
  });
}

const s = css`
  .t-input + .t-input {
    margin-top: 16px;
  }

  .suffix {
    display: flex;
    align-items: center;
  }

  .suffix--line {
    width: 1px;
    height: 24px;
    background-color: #f6f6f6;
    margin-right: 16px;
  }

  .image {
    width: 72px;
    height: 36px;
    display: block;
    margin-top: -6px;
    margin-bottom: -6px;
  }

  .verify {
    color: rgba(0, 82, 217, 1);
    font-size: 16px;
    cursor: pointer;
  }
`;
