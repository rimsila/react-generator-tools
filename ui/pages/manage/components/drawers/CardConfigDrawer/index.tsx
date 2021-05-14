/*
 * @File description: Configuration content of Short form

 * @Date: 2020-04-29 17:56:31

 * @LastEditTime: 2020-05-11 15:21:35
 */
import React from 'react';
import { Form, Button, Input, Drawer } from 'antd';
import { Store } from 'antd/lib/form/interface';

export default ({
  visible,
  setVisible,
  onFinish,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onFinish: (values: Store) => void;
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: Store) => {
    onFinish(values);
    setVisible(false);
  };

  return (
    <Drawer
      title="Card Configuration"
      width={360}
      visible={visible}
      onClose={() => setVisible(false)}
    >
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item
          label="card title"
          name="title"
          required
          rules={[{ required: true, message: 'Please fill in the card title' }]}
        >
          <Input placeholder="Form container title" />
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
