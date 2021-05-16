import { Button, Card, Col, Form, Input, message, Row } from 'antd';
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
import { transformFormItemLines } from '../../../../../utils';
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
    title: 'Two columns of details',
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
   * Add detailed display items
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
      message.error('You havent added a detailed display item yet, you cant submit it!');
      return;
    }
    const key = 'message';
    try {
      message.loading({ content: 'File is being generated, please wait...', key });
      const result = await api.callRemote({
        type: 'org.umi-plugin-page-creator.longDetailModal',
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

  /** parse the imported configuration information */
  useEffect(() => {
    if (impConfigJson) {
      const {
        formConfig = { title: 'Two columns of details' },
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

  const cols = 2;
  // Divide formItems into 2 columns
  const formItemLines = transformFormItemLines(formItems, cols);

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
          {formItemLines.map((line, index) => (
            <Row>
              {line.map((formItem, itemIndex) => (
                <Col span={12}>
                  <div className={styles.formItemConfig}>
                    <ConfigActions
                      position="top"
                      moveUp={moveUp(index * cols + itemIndex)}
                      moveDown={moveDown(index * cols + itemIndex)}
                      configItem={() => {
                        configItem(formItem, index * cols + itemIndex);
                        setFormItemConfigDrawerVisible(true);
                      }}
                      deleteItem={deleteItem(index * cols + itemIndex)}
                      copyItem={copyItem(index * cols + itemIndex)}
                    />
                    <Form.Item label={formItem.label} name={formItem.name}>
                      <Input disabled />
                    </Form.Item>
                  </div>
                </Col>
              ))}
            </Row>
          ))}
          <Button onClick={addDetailItem} type="dashed" style={{ width: '100%', marginBottom: 32 }}>
            Add display item
          </Button>
          <Button type="primary" onClick={() => setApiConfigDrawerVisible(true)}>
            Add GraphQL Operation and DataSouce
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
