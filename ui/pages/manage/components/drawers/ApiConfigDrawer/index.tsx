/*
 * @File description: Configuration content of interface API

 * @Date: 2020-04-29 17:56:31
 * @LastEditors: Huang Shanshan
 * @LastEditTime: 2020-05-28 18:24:49
 */
import { Button, Drawer, Form, Input } from 'antd';
import { Store } from 'antd/lib/form/interface';
import React, { useContext } from 'react';
import Context from '../../../Context';

export default ({
  visible,
  setVisible,
  onSubmit,
  submitFetch,
  initialFetch,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSubmit: (initialFetch?: string[], submitFetch?: string[]) => void;
  submitFetch?: string[];
  initialFetch?: string[];
}) => {
  const { databases = [] } = useContext(Context);
  const [form] = Form.useForm();

  // useEffect(() => {
  //   form.setFieldsValue({
  //     initialFetch,
  //   });
  // }, [initialFetch]);

  // useEffect(() => {
  //   form.setFieldsValue({
  //     submitFetch,
  //   });
  // }, [submitFetch]);

  const handleFinish = (values: Store) => {
    console.log('values', values);

    setVisible(false);
    const { initialFetch, submitFetch } = values;
    onSubmit(initialFetch, submitFetch);
  };

  return (
    <Drawer
      title="Config GraphQl and DataSource"
      width={760}
      visible={visible}
      onClose={() => setVisible(false)}
    >
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item label="input GQL Operation " name="submitFetch">
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item label="Input Column Data" name="initialFetch">
          <Input.TextArea rows={5} />
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
