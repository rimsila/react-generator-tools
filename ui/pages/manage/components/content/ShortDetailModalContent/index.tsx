import { Button, Card, Form, Input, message } from 'antd';
import { Store } from 'antd/lib/form/interface';
import copy from 'copy-to-clipboard';
import faker from 'faker';
import produce from 'immer';
import React, { useContext, useEffect, useState } from 'react';
import { AjaxResponse } from '../../../../../../interfaces/common';
import ConfigActions from '../../../../../components/ConfigActions';
import FormItemConfigDrawer from '../../../../../components/FormItemConfigDrawer';
import Title from '../../../../../components/Title';
import useConfig from '../../../../../hooks/useConfig';
import useConfigVisible from '../../../../../hooks/useConfigVisible';
import useFormItem from '../../../../../hooks/useFormItem';
import Context from '../../../Context';
import ApiConfigDrawer from '../../drawers/ApiConfigDrawer';
import ShortFormConfigDrawer from '../../drawers/ShortFormConfigDrawer';
import ExportActions from '../../ExportActions';
import PathMenuAction from '../../PathMenuAction';
import styles from './index.module.less';

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
    title: 'Single column details',
  });

  const { initialFetch, setInitialFetch, submitFetch, setSubmitFetch } = useConfig();

  const {
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
    currentItem,
    index,
    onConfirm,
  } = useFormItem();

  /**
   * 添加详情展示项
   */
  const addDetailItem = () => {
    setFormItems(
      produce(formItems, draft => {
        draft.push({
          label: faker.name.title(),
          name: faker.name.lastName(),
          type: 'input',
        });
      }),
    );
  };

  const handleApiSubmit = (initialFetch?: string[], submitFetch?: string[]) => {
    setInitialFetch(initialFetch);
    setSubmitFetch(submitFetch);
  };

  /**
   * Pass the configured form information and the added form item configuration to the server
   */
  const remoteCall = async ({ path, dirName }: { path?: string; dirName?: string }) => {
    // Traverse the formItems, if any of them is not configured with label/name, then submission is not allowed
    if (formItems.length === 0) {
      message.error('您还没有添加详情展示项，不能submit ！');
      return;
    }
    const key = 'message';
    try {
      message.loading({ content: 'File is being generated, please wait...', key });
      const result = await api.callRemote({
        type: 'org.umi-plugin-page-creator.shortDetailModal',
        payload: {
          formConfig,
          formItems,
          path,
          dirName,
          initialFetch,
          submitFetch,
        },
      });
      message.success({ content: (result as AjaxResponse<string>).message, key });
      setPathModalVisible(false);
    } catch (error) {
      message.error({ content: error.message, key });
    }
  };

  /** 把导入的配置信息进行解析 */
  useEffect(() => {
    if (impConfigJson) {
      const {
        formConfig = { title: 'Single column details' },
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
            Configuration
          </Button>
        }
      >
        <Form {...formItemLayout}>
          {formItems.map((formItem, index) => (
            <div className={styles.formItemConfig}>
              <ConfigActions
                moveUp={moveUp(index)}
                moveDown={moveDown(index)}
                configItem={() => {
                  configItem(formItem, index);
                  setFormItemConfigDrawerVisible(true);
                }}
                deleteItem={deleteItem(index)}
                copyItem={copyItem(index)}
              />
              <Form.Item label={formItem.label} name={formItem.name}>
                <Input disabled />
              </Form.Item>
            </div>
          ))}
          <Button onClick={addDetailItem} type="dashed" style={{ width: '100%', marginBottom: 32 }}>
            Add display item
          </Button>
          <Button type="primary" onClick={() => setApiConfigDrawerVisible(true)}>
            Add GraphQl configuration
          </Button>
        </Form>
      </Card>

      {/**Add GraphQL Operation and DataSouce  */}
      <ApiConfigDrawer
        visible={apiConfigDrawerVisible}
        setVisible={setApiConfigDrawerVisible}
        onSubmit={handleApiSubmit}
        initialFetch={initialFetch}
        submitFetch={submitFetch}
      />

      {/**Form configuration */}
      <ShortFormConfigDrawer
        visible={formConfigDrawerVisible}
        setVisible={setFormConfigDrawerVisible}
        onFinish={setFormConfig}
        formConfig={formConfig}
      />

      {/**Configure a single form item */}
      {currentItem && (
        <FormItemConfigDrawer
          visible={formItemConfigDrawerVisible}
          onVisible={setFormItemConfigDrawerVisible}
          index={index}
          formItem={currentItem}
          onConfirm={onConfirm}
          from="detail"
          initialFetch={initialFetch}
        />
      )}

      {/**The input file path that pops up when submitting */}
      <PathMenuAction
        type="detail"
        onRemoteCall={remoteCall}
        modalVisible={pathModalVisible}
        setModalVisible={setPathModalVisible}
        modal
      />

      <ExportActions onClick={handleExport} />
    </>
  );
};
