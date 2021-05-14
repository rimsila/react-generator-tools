import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input, Radio, Select, Tooltip } from 'antd';
import { Store } from 'antd/lib/form/interface';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { FormItemProps, FormItemType } from '../../../interfaces/common';
import Context from '../../pages/manage/Context';
import { filterEmpty } from '../../utils';
import renderFormItem from '../FormItemConfig';
import * as itemProps from './props';

const { Option } = Select;

export default ({
  visible,
  onVisible,
  index,
  formItem,
  onConfirm,
  submitFetch,
  initialFetch,
  from = 'form',
}: {
  visible: boolean;
  onVisible: (visible: boolean) => void;
  index?: number;
  formItem: FormItemProps;
  onConfirm: (index: number, formItem: FormItemProps) => void;
  submitFetch?: string[];
  initialFetch?: string[];
  from?: 'form' | 'detail';
}) => {
  const { baseClasses = [] } = useContext(Context);

  const [form] = Form.useForm();
  const { name, type, label, placeholder, ...restProps } = formItem;

  const [paramsName, setParamsName] = useState<string>();
  const [responseName, setResponseName] = useState<string>();

  useEffect(() => {
    form.setFieldsValue(formItem);
  }, [formItem]);

  /** The third value in submitFetch is value-paramsName-responseName, and paramsName is selected as the DTO when submitting form data */
  useEffect(() => {
    if (submitFetch && submitFetch.length === 3) {
      const paramsName = submitFetch[2].split('-')[1];
      setParamsName(paramsName);
    }
  }, [submitFetch]);

  /** The third value in initialFetch is value-paramsName-responseName, to obtain initial data, use responseName as DTO */
  useEffect(() => {
    if (initialFetch && initialFetch.length === 3) {
      const responseName = initialFetch[2].split('-')[2];
      setResponseName(responseName);
    }
  }, [initialFetch]);

  const handleFinish = (values: Store) => {
    if (index !== undefined) {
      const { prop, ...restValues } = values;
      onConfirm(index, { ...formItem, ...filterEmpty(restValues) });
      onVisible(false);
      form.resetFields();
    }
  };

  const properties = useMemo(() => {
    if (from === 'form') {
      return baseClasses.find(item => item.name === paramsName)?.properties || [];
    }
    return baseClasses.find(item => item.name === responseName)?.properties || [];
  }, [baseClasses, paramsName, from, responseName]);

  const handleChange = (value: string) => {
    const matchClass = properties.find(item => item.value === value);
    form.setFieldsValue({
      label: matchClass?.label,
      name: value,
      required: matchClass?.required,
    });
  };

  const propVisible =
    (from === 'form' && submitFetch && submitFetch.length > 0) ||
    (from === 'detail' && initialFetch && initialFetch.length > 0);

  return (
    <Drawer
      title="Form item configuration"
      visible={visible}
      onClose={() => onVisible(false)}
      width={400}
    >
      <Form
        form={form}
        onFinish={handleFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ required: false, disabled: false, allowClear: true }}
      >
        {propVisible && (
          <Form.Item label="Property value" name="prop">
            <Select onChange={handleChange}>
              {properties.map(prop => (
                <Option
                  key={prop.value}
                  value={prop.value}
                >{`${prop.label}(${prop.value})`}</Option>
              ))}
            </Select>
          </Form.Item>
        )}
        <Form.Item
          label="label"
          name="label"
          required
          rules={[{ required: true, message: 'Please fill in the label' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Field name"
          name="name"
          required
          rules={[{ required: true, message: 'Please fill in the field name' }]}
        >
          <Input />
        </Form.Item>
        {from === 'form' ? (
          <>
            <Form.Item
              label="is required"
              name="required"
              required
              rules={[{ required: true, message: 'Please choose whether it is required' }]}
            >
              <Radio.Group
                options={[
                  { label: 'Yes', value: true },
                  { label: 'No', value: false },
                ]}
              />
            </Form.Item>
            <Form.Item
              label={
                <label>
                  <span style={{ paddingRight: 10 }}>Custom rules</span>
                  <Tooltip
                    overlay={`[
                  {required: true},
                  {enum: []},
                  {whitespace: true},
                  {type:'string', len: 10, max: 20, min: 6 },
                  {type:'number', len: 10, max: 20, min: 6},
                  {type:'array', len: 10, max: 20, min: 6},
                  {type:'date', format:'', parse:'', invalid:''}
                ]`}
                  >
                    <QuestionCircleOutlined />
                  </Tooltip>
                </label>
              }
              name="customRules"
            >
              <Input.TextArea rows={4} autoSize />
            </Form.Item>
            <Form.Item label="Placeholder" name="placeholder">
              <Input />
            </Form.Item>
            {renderOtherProps(type)}
          </>
        ) : (
          <Form.Item label="detail field type" name="detailItemType">
            <Select>
              <Select.Option value="default">default</Select.Option>
              <Select.Option value="file">File</Select.Option>
            </Select>
          </Form.Item>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            generate
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

/**
 * Render the attributes of the form element itself
 * @param type
 * @param props
 */
function renderOtherProps(type: FormItemType) {
  let props: FormItemProps[] = itemProps[`${type}Props`];
  return props.map(item => renderFormItem({ formItem: item }));
}
