import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Drawer, Form, Input, InputNumber, Tooltip } from 'antd';
import { Store } from 'antd/lib/form/interface';
import React, { useEffect } from 'react';
import { ScreenConfig } from '../../../../interfaces/screen';

const formLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const initialValues = {
  gutter: 16,
  leftRows: 4,
  centerRows: 1,
  rightRows: 4,
  leftXs: 24,
  leftSm: 24,
  leftMd: 24,
  leftLg: 24,
  leftXl: 7,
  leftXxl: 7,
  centerXs: 24,
  centerSm: 24,
  centerMd: 24,
  centerLg: 24,
  centerXl: 10,
  centerXxl: 10,
  rightXs: 24,
  rightSm: 24,
  rightMd: 24,
  rightLg: 24,
  rightXl: 7,
  rightXxl: 7,
};

export default ({
  visible,
  toggleVisible,
  config,
  onFinish,
}: {
  visible: boolean;
  toggleVisible: () => void;
  config?: ScreenConfig;
  onFinish: (values: Store) => void;
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (config && config.title) {
      const values = transformConfig(config);
      form.setFieldsValue(values);
    } else {
      form.setFieldsValue(initialValues);
    }
  }, [config]);

  const handleFinish = (values: Store) => {
    onFinish(values);
    toggleVisible();
  };

  return (
    <Drawer
      title="Large screen configuration"
      visible={visible}
      width={360}
      forceRender
      onClose={toggleVisible}
    >
      <Form form={form} onFinish={handleFinish} {...formLayout} initialValues={initialValues}>
        <Form.Item label="title" name="title" required rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="title style" name="titleStyle">
          <Input.TextArea rows={6} />
        </Form.Item>
        <Form.Item label="Space between charts" name="gutter">
          <InputNumber min={0} />
        </Form.Item>
        <Divider plain>Proportion to the left</Divider>
        <Form.Item
          label={
            <label>
              <span style={{ paddingRight: 5 }}>xs</span>
              <Tooltip overlay="<576px">
                <QuestionCircleOutlined />
              </Tooltip>
            </label>
          }
          name="leftXs"
          required
          rules={[{ required: true }]}
        >
          <InputNumber min={7} />
        </Form.Item>
        <Form.Item
          label={
            <label>
              <span style={{ paddingRight: 5 }}>sm</span>
              <Tooltip overlay="≥576px">
                <QuestionCircleOutlined />
              </Tooltip>
            </label>
          }
          name="leftSm"
          required
          rules={[{ required: true }]}
        >
          <InputNumber min={7} />
        </Form.Item>
        <Form.Item
          label={
            <label>
              <span style={{ paddingRight: 5 }}>md</span>
              <Tooltip overlay="≥768px">
                <QuestionCircleOutlined />
              </Tooltip>
            </label>
          }
          name="leftMd"
          required
          rules={[{ required: true }]}
        >
          <InputNumber min={7} />
        </Form.Item>
        <Form.Item
          label={
            <label>
              <span style={{ paddingRight: 5 }}>lg</span>
              <Tooltip overlay="≥992px">
                <QuestionCircleOutlined />
              </Tooltip>
            </label>
          }
          name="leftLg"
          required
          rules={[{ required: true }]}
        >
          <InputNumber min={7} />
        </Form.Item>
        <Form.Item
          label={
            <label>
              <span style={{ paddingRight: 5 }}>xl</span>
              <Tooltip overlay="≥1200px">
                <QuestionCircleOutlined />
              </Tooltip>
            </label>
          }
          name="leftXl"
          required
          rules={[{ required: true }]}
        >
          <InputNumber min={7} />
        </Form.Item>
        <Form.Item
          label={
            <label>
              <span style={{ paddingRight: 5 }}>xxl</span>
              <Tooltip overlay="≥1600px">
                <QuestionCircleOutlined />
              </Tooltip>
            </label>
          }
          name="leftXxl"
          required
          rules={[{ required: true }]}
        >
          <InputNumber min={7} />
        </Form.Item>
        <Divider plain>Proportion in the middle</Divider>
        <Form.Item
          label={
            <label>
              <span style={{ paddingRight: 5 }}>xs</span>
              <Tooltip overlay="<576px">
                <QuestionCircleOutlined />
              </Tooltip>
            </label>
          }
          name="centerXs"
          required
          rules={[{ required: true }]}
        >
          <InputNumber min={7} />
        </Form.Item>
        <Form.Item
          label={
            <label>
              <span style={{ paddingRight: 5 }}>sm</span>
              <Tooltip overlay="≥576px">
                <QuestionCircleOutlined />
              </Tooltip>
            </label>
          }
          name="centerSm"
          required
          rules={[{ required: true }]}
        >
          <InputNumber min={7} />
        </Form.Item>
        <Form.Item
          label={
            <label>
              <span style={{ paddingRight: 5 }}>md</span>
              <Tooltip overlay="≥768px">
                <QuestionCircleOutlined />
              </Tooltip>
            </label>
          }
          name="centerMd"
          required
          rules={[{ required: true }]}
        >
          <InputNumber min={7} />
        </Form.Item>
        <Form.Item
          label={
            <label>
              <span style={{ paddingRight: 5 }}>lg</span>
              <Tooltip overlay="≥992px">
                <QuestionCircleOutlined />
              </Tooltip>
            </label>
          }
          name="centerLg"
          required
          rules={[{ required: true }]}
        >
          <InputNumber min={7} />
        </Form.Item>
        <Form.Item
          label={
            <label>
              <span style={{ paddingRight: 5 }}>xl</span>
              <Tooltip overlay="≥1200px">
                <QuestionCircleOutlined />
              </Tooltip>
            </label>
          }
          name="centerXl"
          required
          rules={[{ required: true }]}
        >
          <InputNumber min={7} />
        </Form.Item>
        <Form.Item
          label={
            <label>
              <span style={{ paddingRight: 5 }}>xxl</span>
              <Tooltip overlay="≥1600px">
                <QuestionCircleOutlined />
              </Tooltip>
            </label>
          }
          name="centerXxl"
          required
          rules={[{ required: true }]}
        >
          <InputNumber min={7} />
        </Form.Item>
        <Divider plain>Proportion on the right side</Divider>
        <Form.Item
          label={
            <label>
              <span style={{ paddingRight: 5 }}>xs</span>
              <Tooltip overlay="<576px">
                <QuestionCircleOutlined />
              </Tooltip>
            </label>
          }
          name="rightXs"
          required
          rules={[{ required: true }]}
        >
          <InputNumber min={7} />
        </Form.Item>
        <Form.Item
          label={
            <label>
              <span style={{ paddingRight: 5 }}>sm</span>
              <Tooltip overlay="≥576px">
                <QuestionCircleOutlined />
              </Tooltip>
            </label>
          }
          name="rightSm"
          required
          rules={[{ required: true }]}
        >
          <InputNumber min={7} />
        </Form.Item>
        <Form.Item
          label={
            <label>
              <span style={{ paddingRight: 5 }}>md</span>
              <Tooltip overlay="≥768px">
                <QuestionCircleOutlined />
              </Tooltip>
            </label>
          }
          name="rightMd"
          required
          rules={[{ required: true }]}
        >
          <InputNumber min={7} />
        </Form.Item>
        <Form.Item
          label={
            <label>
              <span style={{ paddingRight: 5 }}>lg</span>
              <Tooltip overlay="≥992px">
                <QuestionCircleOutlined />
              </Tooltip>
            </label>
          }
          name="rightLg"
          required
          rules={[{ required: true }]}
        >
          <InputNumber min={7} />
        </Form.Item>
        <Form.Item
          label={
            <label>
              <span style={{ paddingRight: 5 }}>xl</span>
              <Tooltip overlay="≥1200px">
                <QuestionCircleOutlined />
              </Tooltip>
            </label>
          }
          name="rightXl"
          required
          rules={[{ required: true }]}
        >
          <InputNumber min={7} />
        </Form.Item>
        <Form.Item
          label={
            <label>
              <span style={{ paddingRight: 5 }}>xxl</span>
              <Tooltip overlay="≥1600px">
                <QuestionCircleOutlined />
              </Tooltip>
            </label>
          }
          name="rightXxl"
          required
          rules={[{ required: true }]}
        >
          <InputNumber min={7} />
        </Form.Item>
        <Divider plain>Number of rows</Divider>
        <Form.Item label="Left Rows" name="leftRows" required rules={[{ required: true }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          label="Number of middle rows"
          name="centerRows"
          required
          rules={[{ required: true }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          label="Number of rows on the right"
          name="rightRows"
          required
          rules={[{ required: true }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Divider />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

function transformConfig(config: ScreenConfig): Store {
  const { title, titleStyle, left, center, right } = config;

  return {
    title,
    titleStyle,
    leftRows: left.rows.length,
    centerRows: center.rows.length,
    rightRows: right.rows.length,
    leftXs: left.xs,
    leftSm: left.sm,
    leftMd: left.md,
    leftLg: left.lg,
    leftXl: left.xl,
    leftXxl: left.xxl,
    centerXs: center.xs,
    centerSm: center.sm,
    centerMd: center.md,
    centerLg: center.lg,
    centerXl: center.xl,
    centerXxl: center.xxl,
    rightXs: right.xs,
    rightSm: right.sm,
    rightMd: right.md,
    rightLg: right.lg,
    rightXl: right.xl,
    rightXxl: right.xxl,
  };
}
