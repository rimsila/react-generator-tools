import React, { useContext } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import classNames from 'classnames';
import styles from './index.module.less';
import { Store } from 'antd/lib/form/interface';
import Context from '../../Context';

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export default ({
  modalVisible,
  setModalVisible,
  onSubmit,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onSubmit: (values: Store) => void;
}) => {
  const [form] = Form.useForm();

  const { templateType } = useContext(Context);

  const handleFinish = (values: Store) => {
    form.resetFields();
    onSubmit(values);
  };
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          if (templateType) {
            setModalVisible(true);
          } else {
            message.warning('Please select a template first');
          }
        }}
        className={classNames(styles.bubble, styles.fixed)}
      >
        Import
      </Button>
      <Modal
        title="Import page"
        forceRender
        width={650}
        visible={modalVisible}
        onOk={() => form.submit()}
        onCancel={() => setModalVisible(false)}
        bodyStyle={{ maxHeight: 650, overflowY: 'auto' }}
      >
        <Form form={form} onFinish={handleFinish} {...formLayout}>
          <Form.Item
            label="Configuration parameters"
            name="importConfig"
            required
            rules={[
              {
                required: true,
                message: 'Please enter the configuration parameters you want to import',
              },
            ]}
          >
            <Input.TextArea
              cols={10}
              placeholder="Please enter the configuration parameters you want to import"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
