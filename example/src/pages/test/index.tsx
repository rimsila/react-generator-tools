import React, { useState } from 'react';
import { Form, Button, Card, Input, TimePicker, Upload, Rate, message, Spin } from 'antd';
import { Store } from 'antd/es/form/interface';
import { history } from 'umi';
import { useRequest } from 'ahooks';
import Title from '@/components/Title';
import useSpinning from '@/hooks/useSpinning';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { getVerificationRules } from '@/pages/test/validators';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 7,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 12,
    },
    md: {
      span: 10,
    },
  },
};

const submitFormLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 10,
      offset: 7,
    },
  },
};

export default () => {
  const [form] = Form.useForm();
  const { tip, setTip } = useSpinning();
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);

  const { id } = history.location.query;

  const fetchDetail = () => {
    if (id) {
      setTip('加载详情中，请稍候...');
      return API.recruitment.person.getPerson.fetch({
        personCode: id,
      });
    }

    return Promise.resolve(false);
  };

  const { loading } = useRequest(fetchDetail, {
    refreshDeps: [id],
    onSuccess: data => {
      const values = { ...data };
      form.setFieldsValue(values);
    },
  });

  const submit = (values: Store) => {
    setTip('Data saving, please wait...');

    const payload = { ...values };

    return API.recruitment.person.addPerson.fetch(payload);
  };

  const { run: handleFinish, loading: submitting } = useRequest(submit, {
    manual: true,
    onSuccess: () => {
      message.success('Saved successfully');
    },
  });

  return (
    <Spin spinning={loading && submitting} tip={tip}>
      <CustomBreadcrumb
        list={[
          {
            breadcrumbName: '',
          },
          {
            breadcrumbName: 'test',
          },
        ]}
      />
      <Card title={<Title text="Single list" />}>
        <Form form={form} onFinish={handleFinish}>
          <Form.Item
            {...formItemLayout}
            label="Dynamic Implementation Specialist"
            name="Gerhold"
            rules={[
              ...[
                {
                  whitespace: true,
                },
              ],
              ...getVerificationRules('Gerhold').rules,
            ]}
          >
            <TimePicker />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="International Creative Analyst"
            name="Kilback"
            rules={[
              ...[
                {
                  whitespace: true,
                },
              ],
              ...getVerificationRules('Kilback').rules,
            ]}
          >
            <Input.Password placeholder="Please enter the password" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Forward Factors Administrator"
            name="Cormier"
            rules={[
              ...[
                {
                  whitespace: true,
                },
              ],
              ...getVerificationRules('Cormier').rules,
            ]}
          >
            <Input.TextArea placeholder="Please enter" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="International Integration Facilitator"
            name="Pollich"
            rules={[
              ...[
                {
                  whitespace: true,
                },
              ],
              ...getVerificationRules('Pollich').rules,
            ]}
          >
            <Input placeholder="Please enter" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Regional Security Developer"
            name="Koepp"
            rules={[
              ...[
                {
                  whitespace: true,
                },
              ],
              ...getVerificationRules('Koepp').rules,
            ]}
            valuePropName="fileList"
            getValueFromEvent={e => {
              if (Array.isArray(e)) {
                return e;
              }

              return e && e.fileList;
            }}
          >
            <Upload
              onChange={info => {
                if (info.file.status === 'uploading') {
                  setSubmitBtnDisabled(true);
                } else {
                  setSubmitBtnDisabled(false);
                }
              }}
            >
              <Button>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Principal Assurance Representative"
            name="Jacobs"
            rules={[
              ...[
                {
                  whitespace: true,
                },
              ],
              ...getVerificationRules('Jacobs').rules,
            ]}
          >
            <Rate />
          </Form.Item>
          <Form.Item
            {...submitFormLayout}
            style={{
              marginTop: 32,
            }}
          >
            <Button type="primary" htmlType="submit" loading={submitting} disabled={submitBtnDisabled}>
              submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Spin>
  );
};
