import { Button, Card, Form, message, Switch } from 'antd';
import { Store } from 'antd/lib/form/interface';
import copy from 'copy-to-clipboard';
import faker from 'faker';
import React, { useContext, useEffect, useState } from 'react';
import { AjaxResponse, FormItemType } from '../../../../../../interfaces/common';
import renderFormItem from '../../../../../components/FormItemConfig';
import FormItemConfigDrawer from '../../../../../components/FormItemConfigDrawer';
import FormItemsDrawer from '../../../../../components/FormItemsDrawer';
import Title from '../../../../../components/Title';
import useConfig from '../../../../../hooks/useConfig';
import useConfigVisible from '../../../../../hooks/useConfigVisible';
import useFormItem from '../../../../../hooks/useFormItem';
import Context from '../../../Context';
import ApiConfigDrawer from '../../drawers/ApiConfigDrawer';
import ShortFormConfigDrawer from '../../drawers/ShortFormConfigDrawer';
import ExportActions from '../../ExportActions';
import PathMenuAction from '../../PathMenuAction';

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

  const { initialFetch, setInitialFetch, submitFetch, setSubmitFetch } = useConfig();

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

  const handleApiSubmit = (initialFetch?: string[], submitFetch?: string[]) => {
    setInitialFetch(initialFetch);
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
    menu,
    formPath,
    formMenu,
    detailPath,
    detailMenu,
  }: {
    path?: string;
    menu?: string;
    formPath?: string;
    formMenu?: string;
    detailPath?: string;
    detailMenu?: string;
  }) => {
    if (formItems.length === 0) {
      message.error('You have not added a form item, you cannot submit it!');
      return;
    }
    const key = 'message';
    try {
      message.loading({ content: 'File is being generated, please wait...', key });
      const result = await api.callRemote({
        type: 'org.umi-plugin-page-creator.shortForm',
        payload: {
          formConfig,
          formItems,
          path,
          menu,
          formPath,
          formMenu,
          detailPath,
          detailMenu,
          initialFetch,
          submitFetch,
          generateDetail: checked,
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
      const {
        formConfig = { title: 'Single list' },
        formItems = [],
        initialFetch = [],
        submitFetch = [],
      } = JSON.parse(impConfigJson);
      setFormConfig(formConfig);
      setFormItems(formItems);
      setInitialFetch(initialFetch);
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
          initialFetch,
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
            Card configuration
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
        <Form.Item label="Generate details page by default" style={{ marginBottom: 0 }}>
          <Switch checked={checked} onChange={setChecked} />
        </Form.Item>
      </Card>
      <Button
        type="primary"
        style={{ marginBottom: 28 }}
        onClick={() => setApiConfigDrawerVisible(true)}
      >
        Add GraphQL Operation and DataSouce
      </Button>

      {/**Form configuration */}
      <ShortFormConfigDrawer
        visible={formConfigDrawerVisible}
        setVisible={setFormConfigDrawerVisible}
        onFinish={setFormConfig}
        formConfig={formConfig}
      />

      {/**Add GraphQL Operation and DataSouce   */}
      <ApiConfigDrawer
        visible={apiConfigDrawerVisible}
        setVisible={setApiConfigDrawerVisible}
        onSubmit={handleApiSubmit}
        initialFetch={initialFetch}
        submitFetch={submitFetch}
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
          submitFetch={submitFetch}
        />
      )}

      {/**The input file path that pops up when submitting */}
      <PathMenuAction
        type={checked ? 'formWithDetail' : 'form'}
        onRemoteCall={remoteCall}
        modalVisible={pathModalVisible}
        setModalVisible={setPathModalVisible}
      />

      {/* Export */}
      <ExportActions onClick={handleExport} />
    </>
  );
};
