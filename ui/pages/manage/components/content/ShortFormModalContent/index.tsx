import React, { useContext, useState, useEffect } from 'react';
import { Form, Button, Card, message, Switch } from 'antd';
import Title from '../../../../../components/Title';
import renderFormItem from '../../../../../components/FormItemConfig';
import FormItemsDrawer from '../../../../../components/FormItemsDrawer';
import { FormItemType, AjaxResponse } from '../../../../../../interfaces/common';
import FormItemConfigDrawer from '../../../../../components/FormItemConfigDrawer';
import Context from '../../../Context';
import PathMenuAction from '../../PathMenuAction';
import { Store } from 'antd/lib/form/interface';
import ShortFormConfigDrawer from '../../drawers/ShortFormConfigDrawer';
import useConfigVisible from '../../../../../hooks/useConfigVisible';
import useFormItem from '../../../../../hooks/useFormItem';
import faker from 'faker';
import ApiConfigDrawer from '../../drawers/ApiConfigDrawer';
import useConfig from '../../../../../hooks/useConfig';
import copy from 'copy-to-clipboard';
import ExportActions from '../../ExportActions';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
    md: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 14 },
  },
};

export default () => {
  const { api, impConfigJson } = useContext(Context);
  const [formConfig, setFormConfig] = useState<Store>({
    title: 'Single list',
  });
  const [checked, setChecked] = useState(true);
  const [fromTable, setFromTable] = useState(true);

  const { submitFetch, setSubmitFetch } = useConfig();

  const {
    formItemsDrawerVisible,
    setFormItemsDrawerVisible,
    pathModalVisible,
    setPathModalVisible,
    formConfigDrawerVisible,
    setFormConfigDrawerVisible,
    formItemConfigDrawerVisible,
    setFormItemConfigDrawerVisible,
    apiConfigDrawerVisible,
    setApiConfigDrawerVisible,
  } = useConfigVisible();

  const {
    formItems,
    setFormItems,
    moveUp,
    moveDown,
    configItem,
    deleteItem,
    copyItem,
    index,
    currentItem,
    onConfirm,
  } = useFormItem();

  const handleApiSubmit = (submitFetch?: string[]) => {
    setSubmitFetch(submitFetch);
  };

  /**
   * Add form elements
   * @param checkedComponents
   */
  const handleSubmit = (checkedComponents: FormItemType[]) => {
    const newFormItems = checkedComponents.map(type => ({
      type,
      label: faker.name.title(),
      name: faker.name.lastName(),
    }));
    setFormItems(formItems => [...formItems, ...newFormItems]);
    setFormItemsDrawerVisible(false);
    message.success('添加成功');
  };

  /**
   * Pass the configured form information and the added form item configuration to the server
   */
  const remoteCall = async ({
    path,
    dirName,
    formPath,
    formDirName,
    detailPath,
    detailDirName,
  }: {
    path?: string;
    dirName?: string;
    formPath?: string;
    formDirName?: string;
    detailPath?: string;
    detailDirName?: string;
  }) => {
    // Traverse the formItems, if any of them is not configured with label/name, then submission is not allowed
    if (formItems.length === 0) {
      message.error('You have not added a form item, you cannot submit it!');
      return;
    }
    const key = 'message';
    try {
      message.loading({ content: 'File is being generated, please wait...', key });
      const result = await api.callRemote({
        type: 'org.umi-plugin-page-creator.shortFormModal',
        payload: {
          formConfig,
          formItems,
          path,
          dirName,
          formPath,
          formDirName,
          detailPath,
          detailDirName,
          submitFetch,
          generateDetail: checked,
          fromTable,
        },
      });
      message.success({ content: (result as AjaxResponse<string>).message, key });
      setPathModalVisible(false);
    } catch (error) {
      message.error({ content: error.message, key });
    }
  };

  /** Analyze the imported configuration information */
  useEffect(() => {
    if (impConfigJson) {
      const { formConfig = { title: 'Single list' }, formItems = [], submitFetch = [] } = JSON.parse(
        impConfigJson,
      );
      setFormConfig(formConfig);
      setFormItems(formItems);
      setSubmitFetch(submitFetch);
    }
  }, [impConfigJson]);

/** Export */
  const handleExport = () => {
    copy(
      JSON.stringify(
        {
          formConfig,
          formItems,
          submitFetch,
        },
        null,
        2,
      ),
    );
    message.success('Configuration copied to clipboard');
  };

  return (
    <>
      <Card
        title={<Title text={formConfig.title} />}
        extra={
          <Button type="primary" onClick={() => setFormConfigDrawerVisible(true)}>
            Configuration
          </Button>
        }
      >
        <Form {...formItemLayout}>
          {formItems.map((formItem, index) =>
            renderFormItem({
              formItem,
              config: true,
              moveUp: moveUp(index),
              moveDown: moveDown(index),
              configItem: () => {
                configItem(formItem, index);
                setFormItemConfigDrawerVisible(true);
              },
              deleteItem: deleteItem(index),
              copyItem: copyItem(index),
            }),
          )}
          <Button
            onClick={() => setFormItemsDrawerVisible(true)}
            type="dashed"
            style={{ width: '100%', marginBottom: 32 }}
          >
            Add form elements
          </Button>
        </Form>
        <Form.Item label="默认生成详情弹窗" style={{ marginBottom: 0 }}>
          <Switch checked={checked} onChange={setChecked} />
        </Form.Item>
        <Form.Item label="从Table页打开弹窗" style={{ marginBottom: 0 }}>
          <Switch checked={fromTable} onChange={setFromTable} />
        </Form.Item>
      </Card>
      <Button
        type="primary"
        style={{ marginBottom: 28 }}
        onClick={() => setApiConfigDrawerVisible(true)}
      >
        Page interface configuration
      </Button>

      {/**Page interface configuration  */}
      <ApiConfigDrawer
        visible={apiConfigDrawerVisible}
        setVisible={setApiConfigDrawerVisible}
        onSubmit={handleApiSubmit}
        submitFetch={submitFetch}
      />

      {/**Form configuration */}
      <ShortFormConfigDrawer
        visible={formConfigDrawerVisible}
        setVisible={setFormConfigDrawerVisible}
        onFinish={setFormConfig}
        formConfig={formConfig}
      />

      {/**Form item collection */}
      <FormItemsDrawer
        visible={formItemsDrawerVisible}
        setVisible={setFormItemsDrawerVisible}
        onSubmit={handleSubmit}
      />

      {/**Configure a single form item */}
      {currentItem && (
        <FormItemConfigDrawer
          visible={formItemConfigDrawerVisible}
          onVisible={setFormItemConfigDrawerVisible}
          index={index}
          formItem={currentItem}
          onConfirm={onConfirm}
        />
      )}

      {/**The input file path that pops up when submitting */}
      <PathMenuAction
        type={checked ? 'formWithDetail' : 'form'}
        onRemoteCall={remoteCall}
        modalVisible={pathModalVisible}
        setModalVisible={setPathModalVisible}
        modal
      />

      <ExportActions onClick={handleExport} />
    </>
  );
};
