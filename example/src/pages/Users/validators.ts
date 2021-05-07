import { Rule } from 'antd/es/form';

/**
 * Rules for form configuration
 */
export const VERIFICATION_RULE = {};

/**
 * Obtain the corresponding verification content according to the field
 */
export const getVerificationRules = (fileName: string) =>
  (VERIFICATION_RULE[fileName] || {
    rules: [],
  }) as {
    required?: boolean;
    requiredMaxLength?: number;
    rules: Rule[];
  };
