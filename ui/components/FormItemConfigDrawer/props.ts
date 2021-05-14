import { FormItemProps } from '../../../interfaces/common';

/*
 * @File Description:

 * @Date: 2020-04-30 15:27:34
 * @LastEditors: Huang Shanshan
 * @LastEditTime: 2020-05-28 15:56:12
 */
export const inputProps: FormItemProps[] = [
  {
    name: 'maxLength',
    label: 'Maximum length',
    type: 'number',
  },
  {
    name: 'disabled',
    label: 'Whether to disable',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'allowClear',
    label: 'Display clear icon',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
];

export const passwordProps: FormItemProps[] = [
  {
    name: 'visibilityToggle',
    label: 'Display toggle button',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'disabled',
    label: 'Whether to disable',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
];

export const textareaProps: FormItemProps[] = [
  {
    name: 'autoSize',
    label: 'Adaptive content height',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'disabled',
    label: 'Whether to disable',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'allowClear',
    label: 'Display clear icon',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
];

export const cascaderProps: FormItemProps[] = [
  {
    name: 'allowClear',
    label: 'Display clear icon',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'disabled',
    label: 'Whether to disable',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'changeOnSelect',
    label: 'Choose is to change',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'showSearch',
    label: 'Show search box',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
];

export const dateProps: FormItemProps[] = [
  {
    name: 'allowClear',
    label: 'Display clear icon',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'disabled',
    label: 'Whether to disable',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'showTime',
    label: 'Time selection',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'showToday',
    label: 'Show "Today" button',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'format',
    label: 'Format',
    type: 'input',
    placeholder: 'YYYY-MM-DD',
  },
];

export const rangeProps: FormItemProps[] = [
  {
    name: 'allowClear',
    label: 'Display clear icon',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'disabled',
    label: 'Whether to disable',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'showTime',
    label: 'Time selection',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'format',
    label: 'Format',
    type: 'input',
    placeholder: 'YYYY-MM-DD HH:mm:ss',
  },
];

export const timeProps: FormItemProps[] = [
  {
    name: 'allowClear',
    label: 'Display clear icon',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'disabled',
    label: 'Whether to disable',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'format',
    label: 'Format',
    type: 'input',
    placeholder: 'HH:mm:ss',
  },
  {
    name: 'hourStep',
    label: 'Hour option interval',
    type: 'number',
  },
  {
    name: 'minuteStep',
    label: 'Minute option interval',
    type: 'number',
  },
  {
    name: 'secondStep',
    label: 'Second option interval',
    type: 'number',
  },
];

export const numberProps: FormItemProps[] = [
  {
    name: 'disabled',
    label: 'Whether to disable',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'min',
    label: 'Minimum value',
    type: 'number',
  },
  {
    name: 'max',
    label: 'Maximum value',
    type: 'number',
  },
  {
    name: 'precision',
    label: 'Numerical precision',
    type: 'number',
  },
  {
    name: 'step',
    label: 'Change the number of steps each time',
    type: 'number',
  },
];

export const radioProps: FormItemProps[] = [
  {
    name: 'disabled',
    label: 'Whether to disable',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'options',
    label: 'options configuration',
    type: 'textarea',
    placeholder: `[{label:'', value:''}]`,
    tooltip: `[{label:'', value:''}]`,
    required: true,
  },
];

export const checkboxProps: FormItemProps[] = [
  {
    name: 'disabled',
    label: 'Whether to disable',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'options',
    label: 'options configuration',
    type: 'textarea',
    placeholder: `[{label:'', value:''}]`,
    tooltip: `[{label:'', value:''}]`,
    required: true,
  },
];

export const switchProps: FormItemProps[] = [
  {
    name: 'disabled',
    label: 'Whether to disable',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'defaultChecked',
    label: 'Whether selected by default',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'loading',
    label: 'Loading switch',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
];

export const sliderProps: FormItemProps[] = [
  {
    name: 'allowClear',
    label: 'Display clear icon',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'disabled',
    label: 'Whether to disable',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'min',
    label: 'Minimum value',
    type: 'number',
  },
  {
    name: 'max',
    label: 'Maximum value',
    type: 'number',
  },
  {
    name: 'range',
    label: 'Dual slider mode',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'reverse',
    label: 'Reverse axis',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'vertical',
    label: 'Whether it is vertical',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'step',
    label: 'Step size',
    type: 'number',
    placeholder: 'must be greater than 0, and divisible by (max-min)',
  },
];

export const selectProps: FormItemProps[] = [
  {
    name: 'allowClear',
    label: 'Display clear icon',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'disabled',
    label: 'Whether to disable',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'mode',
    label: 'Mode',
    type: 'radio',
    options: [
      { label: 'Single selection', value: '' },
      { label: 'multiple choice', value: 'multiple' },
      { label: 'label', value: 'tags' },
    ],
  },
  {
    name: 'showSearch',
    label: 'Single selection mode can be searched',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'options',
    label: 'options configuration',
    type: 'textarea',
    placeholder: `[{label:'', value:''}]`,
    tooltip: `[{label:'', value:''}]`,
    required: true,
  },
];

export const treeselectProps: FormItemProps[] = [
  {
    name: 'allowClear',
    label: 'Display clear icon',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'disabled',
    label: 'Whether to disable',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'multiple',
    label: 'Multiple choice',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'showSearch',
    label: 'Show search box',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
];

export const uploadProps: FormItemProps[] = [
  {
    name: 'disabled',
    label: 'Whether to disable',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'multiple',
    label: 'Multiple choice',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
];

export const rateProps: FormItemProps[] = [
  {
    name: 'allowClear',
    label: 'Display clear icon',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'disabled',
    label: 'Whether to disable',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'allowHalf',
    label: 'Allow half selection',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    name: 'count',
    label: 'star total',
    type: 'number',
  },
];
