import { fdom } from 'mve-dom';
import { Radio, RadioGroup, RadioInput } from '..';
import { TdCheck } from 'mve-icons/td';
import { TSvg } from '../../../svg';
import { css } from 'wy-dom-helper';
import { createSign } from 'crypto';
import { createSignal } from 'wy-helper';
import { cns } from 'mve-dom-helper';

export default function () {
  const m = createSignal('0');
  fdom.div({
    className: s,
    children() {
      RadioGroup({
        name: 'd',
        model: m,
        children() {
          for (let i = 0; i < 3; i++) {
            fdom.div({
              className: cns('card', () => (m.get() == i + '' ? 'card--active' : '')),
              children() {
                TdCheck(TSvg, {
                  className: 'card__icon',
                });
                RadioInput({
                  label: '单选',
                  value: i + '',
                  icon: 'none',
                  borderless: true,
                  content: '描述信息描述信息描述信息描述信息描述信息',
                });
              },
            });
          }
        },
      });
      RadioGroup({
        name: 'd',
        model: m,
        className: 'horizontal-box',
        children() {
          for (let i = 0; i < 3; i++) {
            fdom.div({
              className: cns('card', () => (m.get() == i + '' ? 'card--active' : '')),
              children() {
                TdCheck(TSvg, {
                  className: 'card__icon',
                });
                RadioInput({
                  label: '单选',
                  value: i + '',
                  icon: 'none',
                  borderless: true,
                  content: '描述信息描述信息描述信息描述信息描述信息',
                });
              },
            });
          }
        },
      });
    },
  });
}

const s = css`
  .demo-desc {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 16px;
  }

  .card {
    display: block;
    position: relative;
    margin: 16px;
    border-radius: 6px;
    overflow: hidden;
    box-sizing: border-box;
    border: 1.5px solid #fff;
  }

  .card--active {
    border-color: #0052d9;
  }

  .card--active::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    border: 14px solid #0052d9;
    border-bottom-color: transparent;
    border-right-color: transparent;
  }

  .card__icon {
    display: block;
    color: #fff;
    position: absolute;
    left: 1.5px;
    top: 1.5px;
    z-index: 1;
    font-size: 14px;
  }

  /* 横向布局 */
  .horizontal-box {
    width: calc(100% - 32px);
    display: flex;
    align-items: center;
    margin: 16px;
  }

  .horizontal-box .card {
    flex: 1;
    margin: 0;
  }

  .horizontal-box .card + .card {
    margin-left: 12px;
  }
`;
