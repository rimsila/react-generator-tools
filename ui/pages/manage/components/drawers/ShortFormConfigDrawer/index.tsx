/*
 * @File description: Configuration content of Short form

 * @Date: 2020-04-29 17:56:31
 * @LastEditors: Huang Shanshan
 * @LastEditTime: 2020-05-28 18:21:40
 */
import React, { useContext, useEffect } from 'react';
import { Form, Button, Input, Drawer } from 'antd';
import { Store } from 'antd/lib/form/interface';

export default ({
  visible,
  setVisible,
  onFinish,
  formConfig,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onFinish: (values: Store) => void;
  formConfig: Store;
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(formConfig);
  }, [formConfig]);

  const handleFinish = (values: Store) => {
    setVisible(false);
    onFinish(values);
  };

  return (
    <Drawer
      title="Short form configuration"
      width={360}
      visible={visible}
      onClose={() => setVisible(false)}
    >
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item
          label="title"
          name="title"
          required
          rules={[{ required: true, message: 'Please fill in the title' }]}
        >
          <Input placeholder="Please fill in the title" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
