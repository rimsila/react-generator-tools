import { Button, Card, message, Table } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { ColumnType } from 'antd/lib/table/interface';
import copy from 'copy-to-clipboard';
import React, { useContext, useEffect, useState } from 'react';
import { mockData } from '../../../../../../example/src/constant';
import { AjaxResponse } from '../../../../../../interfaces/common';
import Title from '../../../../../components/Title';
import useConfig from '../../../../../hooks/useConfig';
import useConfigVisible from '../../../../../hooks/useConfigVisible';
import useTable from '../../../../../hooks/useTable';
import { filterEmpty } from '../../../../../utils';
import Context from '../../../Context';
import ApiConfigDrawer from '../../drawers/ApiConfigDrawer';
import TableColumnConfigDrawer from '../../drawers/TableColumnConfigDrawer';
import TableConfigDrawer from '../../drawers/TableConfigDrawer';
import ExportActions from '../../ExportActions';
import PathMenuAction from '../../PathMenuAction';
import TitleWithActions from './TitleWithActions';

export default () => {
  const { api, impConfigJson, constantConfig } = useContext(Context);
  const [tableConfig, setTableConfig] = useState<Store>({
    headerTitle: 'Form configuration',
    rowKey: 'id',
    bordered: false,
  });

  const { initialFetch, setInitialFetch, submitFetch, setSubmitFetch } = useConfig();

  console.log('setInitialFetch', submitFetch);

  const {
    pathModalVisible,
    setPathModalVisible,
    tableConfigDrawerVisible,
    setTableConfigDrawerVisible,
    columnConfigDrawerVisible,
    setColumnConfigDrawerVisible,
    apiConfigDrawerVisible,
    setApiConfigDrawerVisible,
  } = useConfigVisible();

  const {
    columns,
    index,
    moveUp,
    moveDown,
    copyColumn,
    configColumn,
    deleteColumn,
    currentColumn,
    setIndex,
    setCurrentColumn,
    onConfirm,
  } = useTable();

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
      if (columns.length === 0) {
        message.error('You have not configured the table column');
        return;
      }
      message.loading({ content: 'File is being generated, please wait...', key });
      const result = await api.callRemote({
        type: 'org.umi-plugin-page-creator.table1',
        payload: {
          tableConfig,
          columns,
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
        tableConfig = {
          headerTitle: 'Form Configuration',
          bordered: true,
        },
        columns = [],
        initialFetch = [],
        submitFetch = [],
      } = JSON.parse(impConfigJson);
      setTableConfig(tableConfig);
      (columns as ColumnType<any>[]).map(item => onConfirm(item));
      setInitialFetch(initialFetch);
      setSubmitFetch(submitFetch);
    }
  }, [impConfigJson]);

  /** Export */
  const handleExport = () => {
    copy(
      JSON.stringify(
        {
          tableConfig,
          columns,
          initialFetch,
          submitFetch,
        },
        null,
        2,
      ),
    );
    message.success('Configuration copied to clipboard');
  };

  // console.log('constantConfig', columns);

  return (
    <>
      <Card
        title={<Title text={tableConfig.headerTitle} />}
        extra={
          <Button type="primary" onClick={() => setTableConfigDrawerVisible(true)}>
            Configuration
          </Button>
        }
      >
        <Table
          bordered
          pagination={{
            pageSize: 10,
            current: 1,
            total: 10,
            showQuickJumper: true,
          }}
          columns={columns.map((column, index) => ({
            ...(column as any),
            title: (
              <TitleWithActions
                title={column?.title}
                moveUp={moveUp(index)}
                moveDown={moveDown(index)}
                deleteItem={deleteColumn(index)}
                copyItem={copyColumn(index)}
                configItem={() => {
                  configColumn(column, index);
                  setColumnConfigDrawerVisible(true);
                }}
              />
            ),
          }))}
          dataSource={mockData()}
        />
        <Button
          type="primary"
          style={{ margin: 24 }}
          onClick={() => setApiConfigDrawerVisible(true)}
        >
          Generator GraphQl here
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setIndex(0);
            setCurrentColumn(undefined);
            setColumnConfigDrawerVisible(true);
          }}
        >
          Add column
        </Button>
      </Card>

      {/**Generator GraphQl here */}
      <ApiConfigDrawer
        visible={apiConfigDrawerVisible}
        setVisible={setApiConfigDrawerVisible}
        onSubmit={handleApiSubmit}
        initialFetch={initialFetch}
        submitFetch={submitFetch}
      />

      <TableConfigDrawer
        visible={tableConfigDrawerVisible}
        setVisible={setTableConfigDrawerVisible}
        tableConfig={tableConfig}
        onSubmit={values => {
          setTableConfig(values);
          setTableConfigDrawerVisible(false);
        }}
      />

      <TableColumnConfigDrawer
        visible={columnConfigDrawerVisible}
        setVisible={setColumnConfigDrawerVisible}
        onSubmit={values => {
          const findIndex = columns.findIndex(item => item.dataIndex === values.dataIndex);
          // If index does not exist, or findIndex and index are the same, it means that Add or modify has not been changed to dataIndex
          if ((!index && findIndex > -1) || (index && index === findIndex)) {
            message.error('This dataIndex already exists, please modify and submit again');
            return;
          }
          onConfirm(filterEmpty(values));
          setColumnConfigDrawerVisible(false);
        }}
        current={currentColumn}
        initialFetch={initialFetch}
      />

      {/**The input file path that pops up when submitting */}
      <PathMenuAction
        type="table"
        onRemoteCall={remoteCall}
        modalVisible={pathModalVisible}
        setModalVisible={setPathModalVisible}
      />

      <ExportActions onClick={handleExport} />
    </>
  );
};
