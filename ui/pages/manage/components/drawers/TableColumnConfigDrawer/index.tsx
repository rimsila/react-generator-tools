import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input, InputNumber, Radio, Select, Tooltip } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { ColumnType } from 'antd/lib/table';
import React, { useEffect, useMemo, useState } from 'react';
import { mockData } from '../../../../../../example/src/constant';

const { Option } = Select;

export default function<T>({
  setVisible,
  visible,
  onSubmit,
  current,
  initialFetch,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSubmit: (values: Store) => void;
  current?: ColumnType<T>;
  initialFetch?: string[];
}) {
  const [form] = Form.useForm();
  const [responseName, setResponseName] = useState<string>();

  const initialValues = {
    title: '',
    dataIndex: '',
    align: 'left',
    ellipsis: undefined,
    copyable: undefined,
    valueType: 'text',
    hideInSearch: undefined,
    hideInTable: undefined,
    order: undefined,
  };
  useEffect(() => {
    if (current) {
      form.setFieldsValue(current);
    } else {
      form.setFieldsValue(initialValues);
    }
  }, [current]);

  /** The third value in initialFetch is value-paramsName-responseName, to obtain initial data, use responseName as DTO */
  // useEffect(() => {
  //   setResponseName(responseName);
  // }, [mockData]);

  const properties = useMemo(() => {
    const obj = mockData()[0];
    return Object.keys(obj).map(ele => ({ label: ele, value: obj[ele] }));
  }, [mockData()]);

  const handleChange = (value: string) => {
    const matchClass = properties.find(item => item?.label === value);
    // console.log('e', value);

    form.setFieldsValue({
      title: matchClass?.label,
      dataIndex: matchClass?.label,
    });
  };

  return (
    <Drawer
      title="table column configuration"
      visible={visible}
      width={700}
      onClose={() => {
        form.setFieldsValue(initialValues);
        setVisible(false);
      }}
    >
      {properties?.length > 0 && (
        <Form.Item label="Property value" name="prop">
          <Select onChange={handleChange}>
            {properties.map(prop => {
              // console.log('props', prop);
              return (
                <Option
                  key={prop.label}
                  value={prop.label}
                >{`${prop.label}(${prop?.value})`}</Option>
              );
            })}
          </Select>
        </Form.Item>
      )}
      <Form
        form={form}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        labelAlign="right"
        onFinish={onSubmit}
        initialValues={initialValues}
      >
        <Form.Item
          label="Column header display text"
          name="title"
          required
          rules={[{ required: true, message: 'Field is required' }]}
        >
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item
          label="dataIndex"
          name="dataIndex"
          required
          rules={[{ required: true, message: 'Field is required' }]}
        >
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item label="Alignment" name="align">
          <Radio.Group
            options={[
              { label: 'Left', value: 'left' },
              { label: 'right', value: 'right' },
              { label: 'centered', value: 'center' },
            ]}
          />
        </Form.Item>
        <Form.Item label="Automatic abbreviation" name="ellipsis">
          <Radio.Group
            options={[
              { label: 'Yes', value: true },
              { label: 'No', value: false },
            ]}
          />
        </Form.Item>
        <Form.Item label="Copy support" name="copyable">
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
              <span style={{ paddingRight: 5 }}>enumeration value</span>
              <Tooltip
                overlay={`{
                  open: {
                    text:'Unresolved',
                    status:'Error',
                  },
                  closed: {
                    text:'Resolved',
                    status:'Success',
                  },
              }`}
              >
                <QuestionCircleOutlined />
              </Tooltip>
            </label>
          }
          name="valueEnum"
        >
          <Input.TextArea
            rows={5}
            autoSize
            placeholder="Here you can enter the variables in the constant configuration"
          />
        </Form.Item>
        <Form.Item label="value type" name="valueType">
          <Select showSearch>
            {[
              { label: 'Text', value: 'text' },
              { label: 'money', value: 'money' },
              { label: 'date', value: 'date' },
              { label: 'date range', value: 'dateRange' },
              { label: 'Date and time', value: 'dateTime' },
              { label: 'Date and time range', value: 'dateTimeRange' },
              { label: 'time', value: 'time' },
              { label: 'Operation item', value: 'option' },
              { label: 'textarea', value: 'textarea' },
              { label: 'index', value: 'index' },
              { label: 'indexBorder', value: 'indexBorder' },
              { label: 'Progress bar', value: 'progress' },
              { label: 'digit number', value: 'digit' },
              { label: 'percent', value: 'percent' },
              { label: 'Code block', value: 'code' },
              { label: 'avatar', value: 'avatar' },
              { label: 'Custom', value: 'custom' },
            ].map(item => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Do not display in the query" name="hideInSearch">
          <Radio.Group
            options={[
              { label: 'Yes', value: true },
              { label: 'No', value: false },
            ]}
          />
        </Form.Item>
        <Form.Item label="Not displayed in the table" name="hideInTable">
          <Radio.Group
            options={[
              { label: 'Yes', value: true },
              { label: 'No', value: false },
            ]}
          />
        </Form.Item>
        <Form.Item label="Query display order" name="order">
          <InputNumber min={0} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          submit
        </Button>
      </Form>
    </Drawer>
  );
}
