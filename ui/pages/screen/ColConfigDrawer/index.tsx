import React, { useState, useEffect } from 'react';
import { Drawer, Form, InputNumber, Divider, Button, Select, Row, Col, Input } from 'antd';
import { Store } from 'antd/lib/form/interface';
import * as props from './props';
import renderFormItem from '../../../components/FormItemConfig';
import { FormItemProps } from '../../../../interfaces/common';
import { renderPreviewImage } from '../helper';
import { ScreenColConfig } from '../../../../interfaces/screen';

const formLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const initialValues = {
  xs: 1,
  sm: 1,
  md: 1,
  lg: 1,
  xl: 1,
  xxl: 1,
  type: 'custom',
};

export default ({
  visible,
  toggleVisible,
  onFinish,
  col,
}: {
  visible: boolean;
  toggleVisible: () => void;
  onFinish: (values: Store) => void;
  col: ScreenColConfig;
}) => {
  const [form] = Form.useForm();
  const [type, setType] = useState('custom');

  useEffect(() => {
    if (col) {
      const {
        config: { type, chartConfig, xs, sm, md, lg, xl, xxl },
      } = col;
      form.setFieldsValue({
        type,
        ...chartConfig,
        xs: xs?.span,
        sm: sm?.span,
        md: md?.span,
        lg: lg?.span,
        xl: xl?.span,
        xxl: xxl?.span,
      });
      setType(type!);
    } else {
      form.setFieldsValue(initialValues);
      setType('custom');
    }
  }, [col]);

  const renderOtherProps = () => {
    const otherProps = props[`${type}Props`];
    if (otherProps) {
      return otherProps.map((prop: FormItemProps) => renderFormItem({ formItem: prop }));
    }
    return null;
  };

  const handleFinish = (values: Store) => {
    onFinish(values);
    toggleVisible();
  };

  return (
    <Drawer
      title="Chart container configuration"
      visible={visible}
      width={360}
      forceRender
      onClose={toggleVisible}
    >
      <Row justify="space-between" style={{ flexDirection: 'column' }}>
        <Col flex={3}>
          <Form form={form} onFinish={handleFinish} {...formLayout} initialValues={initialValues}>
            <Divider plain>Width</Divider>
            <Form.Item label="xs" name="xs" required rules={[{ required: true }]}>
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item label="sm" name="sm" required rules={[{ required: true }]}>
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item label="md" name="md" required rules={[{ required: true }]}>
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item label="lg" name="lg" required rules={[{ required: true }]}>
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item label="xl" name="xl" required rules={[{ required: true }]}>
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item label="xxl" name="xxl" required rules={[{ required: true }]}>
              <InputNumber min={1} />
            </Form.Item>
            <Divider plain>Chart</Divider>
            <Form.Item label="title" name="title" required rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Select Type" name="type" required rules={[{ required: true }]}>
              <Select onChange={value => setType(value as string)}>
                <Select.Option value="custom">Custom</Select.Option>
                <Select.Option value="bar">Ordinary histogram</Select.Option>
                <Select.Option value="groupBar">Grouped histogram</Select.Option>
                <Select.Option value="rangeBar">Interval histogram</Select.Option>
                <Select.Option value="barLine">Bar-line mixed chart</Select.Option>
                <Select.Option value="groupBarLine">grouped bar mixed chart</Select.Option>
                <Select.Option value="column">Normal bar graph</Select.Option>
                <Select.Option value="groupColumn">Grouped bar graph</Select.Option>
                <Select.Option value="rangeColumn">Interval bar graph</Select.Option>
                <Select.Option value="circle">Ordinary circular chart</Select.Option>
                <Select.Option value="rose">Rose map</Select.Option>
                <Select.Option value="line">Ordinary line chart</Select.Option>
                <Select.Option value="wave">Water wave graph</Select.Option>
                <Select.Option value="radar">radar chart</Select.Option>
                <Select.Option value="circleStackBar">Radial stacked column chart</Select.Option>
                <Select.Option value="scatter">Single quadrant scatter plot</Select.Option>
                <Select.Option value="stackArea">Stacked area chart</Select.Option>
                <Select.Option value="stackBar">Stacked bar chart</Select.Option>
                <Select.Option value="stackRose">Stacked rose chart</Select.Option>
                <Select.Option value="waterfall">Waterfall chart</Select.Option>
                <Select.Option value="map">Map</Select.Option>
                <Select.Option value="table">Scroll table</Select.Option>
                <Select.Option value="rank">Rating ranking</Select.Option>
              </Select>
            </Form.Item>
            {renderOtherProps()}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Divider />
        <Col flex={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {renderPreviewImage(type)}
        </Col>
      </Row>
    </Drawer>
  );
};
