import { FormRule, ValueType, AllValidateResult, ValidateResultType, CustomValidateResolveType } from './type';

/**
 * 表单校验模型
 * 提供各种内置校验规则和自定义校验支持
 */

// 内置校验规则
const VALIDATE_MAP = {
  // 必填校验
  required: (val: ValueType) => {
    const result = val !== null && val !== undefined && val !== '';
    if (Array.isArray(val)) {
      return val.length > 0;
    }
    return result;
  },

  // 布尔类型校验
  boolean: (val: ValueType) => typeof val === 'boolean',

  // 数字类型校验
  number: (val: ValueType) => !isNaN(Number(val)) && typeof Number(val) === 'number',

  // 最小长度校验
  min: (val: ValueType, rule: FormRule) => {
    const len = Array.isArray(val) ? val.length : String(val).length;
    return len >= (rule.min as number);
  },

  // 最大长度校验
  max: (val: ValueType, rule: FormRule) => {
    const len = Array.isArray(val) ? val.length : String(val).length;
    return len <= (rule.max as number);
  },

  // 精确长度校验
  len: (val: ValueType, rule: FormRule) => {
    const len = Array.isArray(val) ? val.length : String(val).length;
    return len === (rule.len as number);
  },

  // 正则表达式校验
  pattern: (val: ValueType, rule: FormRule) => {
    if (!rule.pattern) return true;
    return rule.pattern.test(String(val));
  },

  // 枚举值校验
  enum: (val: ValueType, rule: FormRule) => {
    if (!rule.enum || !Array.isArray(rule.enum)) return true;
    return rule.enum.includes(String(val));
  },

  // 邮箱校验
  email: (val: ValueType) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(val));
  },

  // URL校验
  url: (val: ValueType) => {
    try {
      new URL(String(val));
      return true;
    } catch {
      return false;
    }
  },

  // 电话号码校验
  telnumber: (val: ValueType) => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(String(val));
  },

  // 身份证校验
  idcard: (val: ValueType) => {
    const idcardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return idcardRegex.test(String(val));
  },

  // 日期校验
  date: (val: ValueType) => {
    const date = new Date(val);
    return date instanceof Date && !isNaN(date.getTime());
  },

  // 空白字符校验
  whitespace: (val: ValueType) => {
    return String(val).trim().length > 0;
  },
};

/**
 * 单个规则校验
 * @param value 待校验的值
 * @param rule 校验规则
 * @returns 校验结果
 */
export async function validateOneRule(value: ValueType, rule: FormRule): Promise<AllValidateResult> {
  let validateResult: CustomValidateResolveType | ValidateResultType = { result: true };

  // 如果有自定义校验器，优先使用
  if (rule.validator && typeof rule.validator === 'function') {
    try {
      validateResult = await rule.validator(value);
    } catch (error) {
      validateResult = {
        result: false,
        message: rule.message || '校验失败',
        type: rule.type || 'error',
      };
    }
  } else {
    // 使用内置校验规则
    const keys = Object.keys(rule).filter((key) => key !== 'message' && key !== 'trigger' && key !== 'type');

    for (const key of keys) {
      if (key in VALIDATE_MAP && rule[key as keyof FormRule]) {
        const validator = VALIDATE_MAP[key as keyof typeof VALIDATE_MAP];
        const result = validator(value, rule);

        if (!result) {
          validateResult = {
            result: false,
            message: rule.message || `${key} 校验失败`,
            type: rule.type || 'error',
            [key]: rule[key as keyof FormRule],
          };
          break;
        }
      }
    }
  }

  // 如果是自定义校验结果，直接返回
  if (typeof validateResult === 'object' && 'result' in validateResult) {
    return validateResult;
  }

  // 否则转换为标准格式
  return {
    result: validateResult === true,
    message: rule.message,
    type: rule.type || 'error',
  };
}

/**
 * 多规则校验
 * @param value 待校验的值
 * @param rules 校验规则数组
 * @returns 校验结果数组
 */
export async function validate(value: ValueType, rules: Array<FormRule>): Promise<AllValidateResult[]> {
  if (!rules || rules.length === 0) {
    return [];
  }

  const all = rules.map((rule) => validateOneRule(value, rule));
  const results = await Promise.all(all);

  return results;
}

/**
 * 获取默认错误消息
 * @param rule 校验规则
 * @param fieldName 字段名
 * @returns 错误消息
 */
export function getDefaultErrorMessage(rule: FormRule, fieldName?: string): string {
  const name = fieldName || '该字段';

  if (rule.required) return `${name}为必填项`;
  if (rule.min) return `${name}长度不能少于${rule.min}个字符`;
  if (rule.max) return `${name}长度不能超过${rule.max}个字符`;
  if (rule.len) return `${name}长度必须为${rule.len}个字符`;
  if (rule.email) return `请输入正确的邮箱地址`;
  if (rule.url) return `请输入正确的URL地址`;
  if (rule.telnumber) return `请输入正确的手机号码`;
  if (rule.idcard) return `请输入正确的身份证号码`;
  if (rule.pattern) return `${name}格式不正确`;
  if (rule.enum) return `${name}必须是指定值中的一个`;
  if (rule.boolean) return `${name}必须是布尔类型`;
  if (rule.number) return `${name}必须是数字类型`;
  if (rule.date) return `请输入正确的日期`;

  return `${name}校验失败`;
}
