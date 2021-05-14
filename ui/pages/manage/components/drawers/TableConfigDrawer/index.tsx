import React from 'react';
import { Drawer, Form, Input, Button, Radio } from 'antd';
import { filterEmpty } from '../../../../../utils';
import { Store } from 'antd/lib/form/interface';

export default ({
  setVisible,
  visible,
  onSubmit,
  tableConfig,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSubmit: (values: Store) => void;
  tableConfig: Store;
}) => {
  return (
    <Drawer
      title="Form configuration"
      visible={visible}
      width={360}
      onClose={() => setVisible(false)}
    >
      <Form
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 12 }}
        labelAlign="left"
        initialValues={{ ...tableConfig }}
        onFinish={values => onSubmit(filterEmpty(values))}
      >
        <Form.Item label="Form title" name="headerTitle">
          <Input />
        </Form.Item>
        <Form.Item label="Form rowKey" name="rowKey">
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          determine
        </Button>
      </Form>
    </Drawer>
  );
};
