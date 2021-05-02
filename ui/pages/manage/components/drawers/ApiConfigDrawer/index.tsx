/*
 * @File description: Configuration content of interface API
 * @公司: thundersdata
 * @Author: Chen Jie
 * @Date: 2020-04-29 17:56:31
 * @LastEditors: Huang Shanshan
 * @LastEditTime: 2020-05-28 18:24:49
 */
import React, {useContext, useEffect} from'react';
import {Form, Button, Drawer, Cascader} from'antd';
import {Store} from'antd/lib/form/interface';
import Context from'../../../Context';

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
  const {databases = []} = useContext(Context);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      initialFetch
    })
  }, [initialFetch]);

  useEffect(() => {
    form.setFieldsValue({
      submitFetch
    })
  }, [submitFetch]);

  const handleFinish = (values: Store) => {
    setVisible(false);
    const {initialFetch, submitFetch} = values;
    onSubmit(initialFetch, submitFetch);
  };

  return (
    <Drawer title="Interface API configuration" width={360} visible={visible} onClose={() => setVisible(false)}>
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item label="Called when the page loads" name="initialFetch">
          <Cascader options={databases} />
        </Form.Item>
        <Form.Item label="Called when submitting" name="submitFetch">
          <Cascader options={databases} />
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
