import { fdom } from 'mve-dom';
import { createSignal, createSubSetObject } from 'wy-helper';
import { Form } from '../form';
import { FormItem } from '../form-item';
import { Input } from '../../input';
import { Textarea } from '../../textarea';
import { Button } from '../../button';
import { css } from 'wy-dom-helper';
import isDate from 'validator/lib/isDate';
import isEmail from 'validator/lib/isEmail';
import isURL from 'validator/lib/isURL';
import { isMobilePhone } from 'validator';
import { isNumber } from 'lodash-es';
import { getCharacterLength } from '../../_common/js/utils/helper';
/**
 * Form 表单组件演示
 */
export default function FormDemo() {
  // 表单数据
  const formData = createSignal({
    name: '',
    email: '',
    phone: '',
    age: '',
    description: '',
  });

  const handleSubmit = (context: any) => {
    console.log('表单提交:', context);
    if (context.validateResult === true) {
      alert('表单校验通过，提交成功！');
    } else {
      alert(`表单校验失败: ${context.firstError}`);
    }
  };

  const handleReset = (context: any) => {
    console.log('表单重置:', context);
    alert('表单已重置');
  };

  return fdom.div({
    className: cls,
    children() {
      Form({
        data: formData.get,
        labelWidth: '80px',
        labelAlign: 'right',
        colon: true,
        showErrorMessage: true,
        onSubmit: handleSubmit,
        onReset: handleReset,
        children() {
          FormItem({
            label: '姓名',
            help: '请输入用户名',
            validate() {
              const name = formData.get().name.trim();
              if (!name) {
                return '请输入姓名';
              }
              const cn = getCharacterLength(name);
              if (cn < 2) {
                return '姓名至少2个字符';
              }
              if (cn > 10) {
                return '姓名不能超过10个字符';
              }
            },
            children() {
              Input({
                borderless: true,
                type: 'text',
                placeholder: '请输入姓名',
                model: createSubSetObject(formData, 'name'),
              });
            },
          });

          FormItem({
            label: '邮箱',
            validate() {
              const email = formData.get().email.trim();
              if (!email) {
                return '请输入邮箱';
              }
              if (!isEmail(email)) {
                return '请输入正确的邮箱格式';
              }
            },
            children({ showError }) {
              Input({
                type: 'email',
                borderless: true,
                placeholder: '请输入邮箱',
                model: createSubSetObject(formData, 'email'),
                triggerTime: 'onBlur',
                onInput() {
                  showError.set(false);
                },
                onBlur(e) {
                  showError.set(true);
                },
              });
            },
          });

          FormItem({
            label: '手机号',
            validate() {
              const phone = formData.get().phone.trim();
              if (!phone) {
                return '请输入手机号';
              }
              if (isMobilePhone(phone)) {
                return '请输入正确的手机号格式';
              }
            },
            children() {
              Input({
                type: 'tel',
                borderless: true,
                placeholder: '请输入手机号',
                model: createSubSetObject(formData, 'phone'),
              });
            },
          });

          FormItem({
            label: '年龄',
            validate() {
              const age = formData.get().age.trim();
              if (!age) {
                return '请输入年龄';
              }
              const n = Number(age);
              if (isNaN(n)) {
                return '年龄必须是数字';
              }
              if (n < 1) {
                return '年龄不能小于1';
              }
              if (n > 150) {
                return '年龄不能大于150';
              }
            },
            children() {
              Input({
                type: 'number',
                borderless: true,
                placeholder: '请输入年龄',
                model: createSubSetObject(formData, 'age'),
              });
            },
          });

          FormItem({
            label: '描述',
            help: '可选填写，最多200个字符',
            validate() {
              const desc = formData.get().description;
              if (getCharacterLength(desc) > 200) {
                return '描述不能超过200个字符';
              }
            },
            children() {
              Textarea({
                placeholder: '请输入描述信息',
                model: createSubSetObject(formData, 'description'),
              });
            },
          });

          // 按钮组
          fdom.div({
            className: 'button-group',
            children() {
              Button({
                type: 'submit',
                theme: 'primary',
                size: 'large',
                children: '提交',
              });
              Button({
                type: 'submit',
                theme: 'default',
                size: 'large',
                children: '重置',
              });
            },
          });
        },
      });
    },
  });
}

const cls = css`
  .button-group {
    background-color: var(--bg-color-demo, #fff);
    box-sizing: border-box;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    position: relative;
    border-bottom: 0.5px solid #e7e7e7;

    .t-button {
      height: 32px;
      flex: 1;

      &:not(:last-child) {
        flex: 1;
        margin-right: 16px;
      }
    }
  }
`;
