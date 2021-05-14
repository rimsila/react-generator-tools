import React, { useContext } from 'react';
import { Button, Modal, Form, Input, Tooltip, Divider, Checkbox, Radio } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import styles from './index.module.less';
import { Store } from 'antd/lib/form/interface';

export default ({
  showCreatePatchCheckbox = false,
  onRemoteCall,
  modalVisible,
  setModalVisible,
  modal = false,
  type,
}: {
  showCreatePatchCheckbox?: boolean;
  type: 'detail' | 'form' | 'table' | 'table1' | 'formWithDetail';
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onRemoteCall: (values: {
    formPath?: string;
    formMenu?: string;
    detailPath?: string;
    detailMenu?: string;
    path?: string;
    menu?: string;
    formDirName?: string;
    detailDirName?: string;
    dirName?: string;
  }) => void;
  modal?: boolean;
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: Store) => {
    if (!modal) {
      if (type !== 'formWithDetail') {
        const { path, menu } = values;
        onRemoteCall({
          path: path.startsWith('/') ? path : `/${path}`,
          menu,
        });
      } else {
        const { formPath, formMenu, detailPath, detailMenu } = values;
        onRemoteCall({
          formPath: formPath.startsWith('/') ? formPath : `/${formPath}`,
          formMenu,
          detailPath: detailPath.startsWith('/') ? detailPath : `/${detailPath}`,
          detailMenu,
        });
      }
    } else {
      if (type !== 'formWithDetail') {
        const { path, dirName } = values;
        onRemoteCall({
          path: path.startsWith('/') ? path : `/${path}`,
          dirName,
        });
      } else {
        const { formPath, formDirName, detailPath, detailDirName } = values;
        onRemoteCall({
          formPath: formPath.startsWith('/') ? formPath : `/${formPath}`,
          formDirName,
          detailPath: detailPath.startsWith('/') ? detailPath : `/${detailPath}`,
          detailDirName,
        });
      }
    }
  };

  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const normalContent = (
    <>
      <Form.Item
        label={
          <label>
            <span style={{ paddingRight: 10 }}>Add to path</span>
            <Tooltip overlay="Multi-level path separated by /">
              <QuestionCircleOutlined />
            </Tooltip>
          </label>
        }
        name="path"
        required
        rules={[{ required: true, message: 'Please enter the path you want to add' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={
          <label>
            <span style={{ paddingRight: 10 }}>Menu</span>
            <Tooltip overlay="Multi-level menu separated by /">
              <QuestionCircleOutlined />
            </Tooltip>
          </label>
        }
        name="menu"
      >
        <Input />
      </Form.Item>
    </>
  );
  const normalModalContent = (
    <>
      <Form.Item
        label="add to directory"
        name="path"
        required
        rules={[{ required: true, message: 'Please enter the directory you want to add' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="file name"
        name="dirName"
        required
        rules={[
          { required: true, message: 'Please enter the file name' },
          {
            pattern: /^[A-Z][a-zA-Z]+$/,
            message: 'The file name should use the big hump naming method',
          },
        ]}
      >
        <Input />
      </Form.Item>
    </>
  );
  const formWithDetailContent = (
    <>
      <Divider plain>Form path</Divider>
      <Form.Item
        label={
          <label>
            <span style={{ paddingRight: 10 }}>Add to path</span>
            <Tooltip overlay="Multi-level path separated by /">
              <QuestionCircleOutlined />
            </Tooltip>
          </label>
        }
        name="formPath"
        required
        rules={[{ required: true, message: 'Please enter the path you want to add' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={
          <label>
            <span style={{ paddingRight: 10 }}>Menu</span>
            <Tooltip overlay="Multi-level menu separated by /">
              <QuestionCircleOutlined />
            </Tooltip>
          </label>
        }
        name="formMenu"
        required
        rules={[{ required: true, message: 'Please enter the menu you want to add' }]}
      >
        <Input />
      </Form.Item>
      <Divider plain>Detailed path</Divider>
      <Form.Item
        label={
          <label>
            <span style={{ paddingRight: 10 }}>Add to path</span>
            <Tooltip overlay="Multi-level path separated by /">
              <QuestionCircleOutlined />
            </Tooltip>
          </label>
        }
        name="detailPath"
        required
        rules={[{ required: true, message: 'Please enter the path you want to add' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={
          <label>
            <span style={{ paddingRight: 10 }}>Menu</span>
            <Tooltip overlay="Multi-level menu separated by /">
              <QuestionCircleOutlined />
            </Tooltip>
          </label>
        }
        name="detailMenu"
        requiredrules={[{ required: true, message: 'Please enter the menu you want to add' }]}
      >
        <Input />
      </Form.Item>
    </>
  );
  const formWithDetailModalContent = (
    <>
      <Divider plain>Form directory</Divider>
      <Form.Item
        label="add to directory"
        name="formPath"
        required
        rules={[{ required: true, message: 'Please enter the directory you want to add' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="file name"
        name="formDirName"
        required
        rules={[
          { required: true, message: 'Please enter the file name' },
          {
            pattern: /^[A-Z][a-zA-Z]+$/,
            message: 'The file name should use the big hump naming method',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Divider plain>Detailed list</Divider>
      <Form.Item
        label="add to directory"
        name="detailPath"
        required
        rules={[{ required: true, message: 'Please enter the directory you want to add' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="file name"
        name="detailDirName"
        required
        rules={[
          { required: true, message: 'Please enter the file name' },
          {
            pattern: /^[A-Z][a-zA-Z]+$/,
            message: 'The file name should use the big hump naming method',
          },
        ]}
      >
        <Input />
      </Form.Item>
    </>
  );

  const renderFormItems = () => {
    if (modal) {
      if (type === 'formWithDetail') {
        return formWithDetailModalContent;
      }
      return normalModalContent;
    } else {
      if (type === 'formWithDetail') {
        return formWithDetailContent;
      }
      return normalContent;
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setModalVisible(true)}
        className={classNames(styles.bubble, styles.fixed)}
      >
        submit
      </Button>
      <Modal
        title="Add routing and menu configuration"
        forceRender
        width={650}
        visible={modalVisible}
        onOk={() => form.submit()}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} onFinish={handleSubmit} {...formLayout}>
          {renderFormItems()}
        </Form>
      </Modal>
    </>
  );
};
