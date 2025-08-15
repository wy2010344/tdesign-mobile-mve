import { fdom } from 'mve-dom';
import { Textarea } from '../textarea';
import { css } from 'wy-dom-helper';

export default function () {
  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'textarea-example',
        children() {
          Textarea({
            className: 'textarea',
            label: '标签文字',
            max: 500,
            maxAsLength: true,
            indicator: true,
            layout: 'vertical',
            textAreaProps: {
              attrs(m) {
                m.placeholder = '请输入文字';
              },
            },
          });
        },
      });
      fdom.div({
        className: 'textarea-example card',
        children() {
          fdom.div({
            className: 'textarea-example__summary',
            children: '卡片样式',
          });
          Textarea({
            className: 'textarea',
            label: '标签文字',
            max: 500,
            maxAsLength: true,
            indicator: true,
            textAreaProps: {
              attrs(m) {
                m.placeholder = '请输入文字';
              },
            },
          });
        },
      });
    },
  });
}

const s = css`
  .textarea-example {
    margin-bottom: 24px;
    overflow: hidden;

    &__summary {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.6);
      margin-bottom: 16px;
      line-height: 22px;
    }
  }
  .card {
    border-radius: 9px;
    margin: 0 16px 24px;
  }
  .textarea {
    height: 156px;
  }
`;
