/*
 * @File Description:

 * @Date: 2020-05-08 13:56:59

 * @LastEditTime: 2020-05-19 23:31:55
 */
import {LabeledValue} from'antd/lib/select';
import {FormItemType, FormItemProps} from'../../../interfaces/common';
import {Rule} from'antd/lib/form';

export function createFormComponentsByType(
  type: FormItemType,
  props: Omit<FormItemProps,'label' |'name' |'type'>,
) {
  const propsStr = generatePropsStr(props);
  switch (type) {
    case'input':
    default:
      return `
        <Input ${props.placeholder?'': `placeholder="Please enter"`} ${propsStr} />
      `;
    case'cascader':
      return `<Cascader ${propsStr} />`;

    case'checkbox':
      const {options: checkboxOptions, ...checkboxProps} = props;
      return `<Checkbox.Group
        options={${
          checkboxOptions
            ? JSON.stringify(eval((checkboxOptions as string).replace(/\u21b5/g,'')))
            : []
        }}
        ${generatePropsStr(checkboxProps)}
      />`;

    case'date':
      return `<DatePicker ${props.placeholder?'': `placeholder="Please select"`} ${propsStr} />`;

    case'number':
      return `<InputNumber ${propsStr} />`;

    case'password':
      return `<Input.Password ${props.placeholder?'': `placeholder="Please enter the password"`} ${propsStr} />`;

    case'radio':
      const {options: radioOptions, ...radioProps} = props;
      return `<Radio.Group
        options={${
          radioOptions? JSON.stringify(eval((radioOptions as string).replace(/\u21b5/g,''))): []
        }}
        ${generatePropsStr(radioProps)}
      />`;

    case'range':
      return `<DatePicker.RangePicker ${propsStr} />`;

    case'rate':
      return `<Rate ${propsStr} />`;

    case'select':
      const {options: selectOptions, ...selectProps} = props;
      return `<Select ${props.placeholder?'': `placeholder="Please select"`} ${generatePropsStr(selectProps)}>
        ${(selectOptions
          ? (eval((selectOptions as string).replace(/\u21b5/g,'')) as LabeledValue[])
          : []
        )
          .map(option => `<Select.Option value="${option.value}">${option.label}</Select.Option>`)
          .join('')}
      </Select>`;

    case'slider':
      return `<Slider ${propsStr} />`;

    case'switch':
      return `<Switch ${propsStr} />`;

    case'textarea':
      return `<Input.TextArea ${props.placeholder?'': `placeholder="Please enter"`} ${propsStr} />`;

    case'time':
      return `<TimePicker ${propsStr} />`;

    case'treeselect':
      return `<TreeSelect ${props.placeholder?'': `placeholder="Please select"`} ${propsStr} />`;

    case'upload':
      return `<Upload onChange={info => {
        if (info.file.status ==='uploading') {
          setSubmitBtnDisabled(true);
        } else {
          setSubmitBtnDisabled(false);
        }
      }} ${propsStr}><Button>Upload</Button></Upload>`;
  }
}

/**
 * Flatten attributes into strings
 */
export function generatePropsStr(props: object): string {
  const result = `${Object.entries(props)
    .map(item => {
      const [key, value] = item;
      if (typeof value ==='number' || typeof value ==='bigint') {
        return `${key}={${value}}`;
      } else if (typeof value ==='boolean') {
        return value? `${key}`: ``;
      } else if (typeof value ==='string') {
        return `${key}="${value}"`;
      } else if (typeof value ==='function') {
        return `${key}={${value.toString()}}`;
      } else if (typeof value ==='object') {
        return `${key}={${JSON.stringify(value)}}`;
      }

      return'';
    })
    .join('')}`;

  return result;
}

/**
 * Split an array into N two-dimensional arrays according to the specified column
 * @param formItems
 * @param cols
 */
export function transformFormItemLines(formItems: FormItemProps[], cols = 3) {
  let lineNum =
    formItems.length% cols === 0
      ? formItems.length / cols
      : Math.floor(formItems.length / cols + 1);
  let res = [];
  for (let i = 0; i <lineNum; i++) {
    let temp = formItems.slice(i * cols, i * cols + cols);
    res.push(temp);
  }
  return res;
}

export function generateRules(customRules?: string, required?: boolean) {
  const rules: Rule[] = [{
    whitespace: true,
  }];
  try {
    if (customRules) {
      const _rules = eval((customRules as string).replace(/\u21b5/g,''));
      if (Array.isArray(_rules)) {
        rules.push(..._rules);
      }
    }
  } catch (error) {
    console.error(error.message);
  }

  if (required) {
    const requiredObj = rules.find(item => Object.keys(item).includes('required'));
    if (!requiredObj || requiredObj['required'] === false) {
      rules.push({
        required: true,
      });
    }
  }

  return JSON.stringify(rules);
}

/**
 * Generate breadcrumbs
 * @param menu
 * @param path
 */
export function generateBreadcrumbs(menu: string) {
  const menus = menu? menu.split('/'): [];
  const breadcrumbs = [];

  for (let _menu of menus) {
    breadcrumbs.push({
      breadcrumbName: _menu,
    });
  }

  return JSON.stringify(breadcrumbs);
}
