import { Rule } from 'antd/es/form';

/**
 * 表单配置的规则
 */
export const VERIFICATION_RULE = {};

/**
 * 根据字段获取对应的校验内容
 */
export const getVerificationRules = (fileName: string) =>
  (VERIFICATION_RULE[fileName] || {
    rules: [],
  }) as {
    required?: boolean;
    requiredMaxLength?: number;
    rules: Rule[];
  };
