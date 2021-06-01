/*
 * @File description: Configuration content of interface API

 */
import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input, notification, Space, Typography } from 'antd';
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
    // console.log('values', JSON.parse(values.initialFetch));

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
        <Form.Item
          label={
            <Space>
              Input GraphQL Operation
              <InfoCircleOutlined
                onClick={() =>
                  notification.info({
                    message:
                      'it will save operation then after generate in will get xx.gql then gql codegen will watch and generate!',
                    description: (
                      <Typography.Paragraph
                        style={{ background: 'white', padding: 20 }}
                        type="danger"
                      >
                        {`
                        query getCompanyQuery {
                          getCompany(id: "") {
                            createdAt
                            id
                            nameEn
                            isExistedBranch
                          }
                        }
                      `}
                        ...
                      </Typography.Paragraph>
                    ),
                  })
                }
              />
            </Space>
          }
          name="submitFetch"
        >
          <Input.TextArea rows={7} allowClear />
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
