import { Button, Card, Col, Form, Input, message, Row } from 'antd';
import copy from 'copy-to-clipboard';
import faker from 'faker';
import produce from 'immer';
import React, { useContext, useEffect } from 'react';
import { AjaxResponse } from '../../../../../../interfaces/common';
import ConfigActions from '../../../../../components/ConfigActions';
import FormItemConfigDrawer from '../../../../../components/FormItemConfigDrawer';
import Title from '../../../../../components/Title';
import useCard from '../../../../../hooks/useCard';
import useConfig from '../../../../../hooks/useConfig';
import useConfigVisible from '../../../../../hooks/useConfigVisible';
import { transformFormItemLines } from '../../../../../utils';
import Context from '../../../Context';
import ApiConfigDrawer from '../../drawers/ApiConfigDrawer';
import CardConfigDrawer from '../../drawers/CardConfigDrawer';
import ExportActions from '../../ExportActions';
import PathMenuAction from '../../PathMenuAction';
import styles from './index.module.less';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 14 },
  },
};
const colLayout = {
  lg: {
    span: 8,
  },
  md: {
    span: 12,
  },
  sm: {
    span: 24,
  },
};

export default () => {
  const { api, impConfigJson } = useContext(Context);

  const { initialFetch, setInitialFetch, submitFetch, setSubmitFetch } = useConfig();

  const {
    formItemsDrawerVisible,
    pathModalVisible,
    setFormItemsDrawerVisible,
    setPathModalVisible,
    cardDrawerVisible,
    setCardDrawerVisible,
    formItemConfigDrawerVisible,
    setFormItemConfigDrawerVisible,
    apiConfigDrawerVisible,
    setApiConfigDrawerVisible,
  } = useConfigVisible();

  const {
    setCardIndex,
    moveCardUp,
    moveCardDown,
    deleteCard,
    copyCard,
    configCard,
    cards,
    setCards,
    addFormItemsToCard,
    moveItemUp,
    moveItemDown,
    configItem,
    deleteItem,
    copyItem,
    currentItem,
    setCurrentItem,
    itemIndex,
    setItemIndex,
  } = useCard();

  /**
   * 添加详情展示项
   */
  const addDetailItem = (cardIndex: number) => () => {
    setCards(
      produce(cards, draft => {
        draft[cardIndex].formItems.push({
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
  const remoteCall = async ({ path, menu }: { path?: string; menu?: string }) => {
    const key = 'message';
    try {
      if (cards.length === 0) {
        message.error('你还没有添加Card');
        return;
      }
      if (cards.some(item => item.formItems.length === 0)) {
        message.error('你有Card里面没有配置展示项');
        return;
      }
      message.loading({ content: 'File is being generated, please wait...', key });
      const result = await api.callRemote({
        type: 'org.umi-plugin-page-creator.longDetail',
        payload: {
          cards,
          path,
          menu,
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
        cards = [{ title: '自定义Card0', formItems: [] }],
        initialFetch = [],
        submitFetch = [],
      } = JSON.parse(impConfigJson);
      setCards(cards);
      setInitialFetch(initialFetch);
      setSubmitFetch(submitFetch);
    }
  }, [impConfigJson]);

  /** Export */
  const handleExport = () => {
    copy(
      JSON.stringify(
        {
          cards,
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
      <Form {...formItemLayout}>
        {cards.map((card, cardIndex) => {
          const { title, formItems = [] } = card;
          const cols = 3;
          // Divide formItems into 3 columns
          const formItemLines = transformFormItemLines(formItems, cols);
          return (
            <Card
              bordered={false}
              title={<Title text={title} />}
              extra={
                <ConfigActions
                  moveUp={moveCardUp(cardIndex)}
                  moveDown={moveCardDown(cardIndex)}
                  deleteItem={deleteCard(cardIndex)}
                  copyItem={copyCard(cardIndex)}
                  configItem={() => {
                    setCardDrawerVisible(true);
                    setCardIndex(cardIndex);
                  }}
                />
              }
            >
              {formItemLines.map((line, index) => (
                <Row key={index} gutter={16}>
                  {line?.map((formItem, itemIndex) => (
                    <Col key={formItem.name} {...colLayout}>
                      <div className={styles.formItemConfig}>
                        <ConfigActions
                          position="top"
                          moveUp={moveItemUp(index * cols + itemIndex, cardIndex)}
                          moveDown={moveItemDown(index * cols + itemIndex, cardIndex)}
                          configItem={() => {
                            setCardIndex(cardIndex);
                            setCurrentItem(formItem);
                            setItemIndex(index * cols + itemIndex);
                            setFormItemConfigDrawerVisible(true);
                          }}
                          deleteItem={deleteItem(index * cols + itemIndex, cardIndex)}
                          copyItem={copyItem(index * cols + itemIndex, cardIndex)}
                        />
                        <Form.Item label={formItem.label} name={formItem.name}>
                          <Input disabled />
                        </Form.Item>
                      </div>
                    </Col>
                  ))}
                </Row>
              ))}
              <Button onClick={addDetailItem(cardIndex)} type="dashed" style={{ width: '100%' }}>
                Add display item
              </Button>
            </Card>
          );
        })}
      </Form>
      <Button
        type="primary"
        onClick={() =>
          setCards(cards => cards.concat([{ title: `自定义Card${cards.length}`, formItems: [] }]))
        }
        style={{ margin: 24 }}
      >
        Add Card
      </Button>
      <Button type="primary" onClick={() => setApiConfigDrawerVisible(true)}>
        Add GraphQL Operation and DataSouce
      </Button>

      {/**Add GraphQL Operation and DataSouce   */}
      <ApiConfigDrawer
        visible={apiConfigDrawerVisible}
        setVisible={setApiConfigDrawerVisible}
        onSubmit={handleApiSubmit}
        initialFetch={initialFetch}
        submitFetch={submitFetch}
      />

      {/**Card editor drawer */}
      <CardConfigDrawer
        visible={cardDrawerVisible}
        setVisible={setCardDrawerVisible}
        onFinish={configCard}
      />

      {currentItem && (
        <FormItemConfigDrawer
          visible={formItemConfigDrawerVisible}
          onVisible={setFormItemConfigDrawerVisible}
          index={itemIndex}
          formItem={currentItem}
          onConfirm={configItem}
          from="detail"
          initialFetch={initialFetch}
        />
      )}

      <PathMenuAction
        showCreatePatchCheckbox
        type="detail"
        onRemoteCall={remoteCall}
        modalVisible={pathModalVisible}
        setModalVisible={setPathModalVisible}
      />

      {/* Export */}
      <ExportActions onClick={handleExport} />
    </>
  );
};
