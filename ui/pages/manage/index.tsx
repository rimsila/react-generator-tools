/*
 * @File Description:
 * @公司: thundersdata
 * @Author: Chen Jie
 * @Date: 2020-04-29 11:06:58
 * @LastEditors: Huang Shanshan
 * @LastEditTime: 2020-05-29 14:27:52
 */
import React, {useState, useEffect} from'react'; // -> Temporarily solve the error first, delete all later
import {Layout, message} from'antd';
import {IUiApi} from'@umijs/ui-types';
import Context from'./Context';
import'./index.module.less';
import {CascaderOptionType} from'antd/lib/cascader';
import {Store} from'antd/lib/form/interface';
import {TemplateType} from'../../../interfaces/common';
import {BaseClass} from'../../../interfaces/api';
import TemplateList from'./components/TemplateList';
import Dashboard from'./components/Dashboard';
import ImportAction from'./components/ImportAction';
import ConstantConfigAction from'./components/ConstantConfigAction';

const {Header, Content} = Layout;

export default ({ api }: {api: IUiApi }) => {
  const [databases, setDatabases] = useState<CascaderOptionType[]>([]);
  const [baseClasses, setBaseClasses] = useState<BaseClass[]>([]);
  const [templateType, setTemplate] = useState<TemplateType>();
  const [importModalVisible, setImportModalVisible] = useState(false);
  const [impConfigJson, setImpConfigJson] = useState<string>(''); // imported json
  const [constantModalVisible, setConstantModalVisible] = useState(false);
  const [constantConfig, setConstantConfig] = useState('');

  /** The back-end interface is called when the page is loaded, the back-end reads data from services/api-lock.json, and generates the corresponding interface and type */
  useEffect(() => {
    (async () => {
      const result = (await api.callRemote({
        type:'org.umi-plugin-page-creator.apiGenerator',
        payload: {
          fetchApiJson: true,
        },
      })) as {databases: CascaderOptionType[]; success: boolean; baseClasses: BaseClass[] };

      if (!result.success) {
        message.warning('Your project does not integrate pont');
      } else {
        setDatabases(result.databases);
        setBaseClasses(result.baseClasses);
      }
    })();
  }, []);

  /**
   * After the page is initialized, read the constant.ts file under the project through the server, and return the content of the file
   */
  useEffect(() => {
    (async () => {
      const result = (await api.callRemote({
        type:'org.umi-plugin-page-creator.constantLoad',
      })) as {success: boolean; data: string };
      if (result.success) {
        setConstantConfig(result.data);
      }
    })();
  }, []);

  const addTemplate = (templateType: TemplateType) => {
    setTemplate(templateType);
    setImpConfigJson('');
    message.success('The template is added successfully, you can start to configure');
  };

  /** Import */
  const handleImportSubmit = (values: Store) => {
    setImportModalVisible(false);
    const {importConfig} = values;
    setImpConfigJson(importConfig);
  };

  /**
   * Save the constant configuration, call the server interface to write back the data
   * @param code
   */
  const saveConstantConfig = async (code: string) => {
    const key ='message';
    message.loading({ content:'Save, please wait...', key });
    await api.callRemote({
      type:'org.umi-plugin-page-creator.constantSave',
      payload: {
        code,
      }
    });
    message.success({ content:'Constant configuration saved successfully', key });
  };

  return (
    <Context.Provider
      value={{
        api,
        templateType,
        addTemplate,
        databases,
        baseClasses,
        impConfigJson,
        setImpConfigJson,
        constantConfig,
      }}
    >
      <Layout style={{ overflowY:'auto' }}>
        <Header>
          <TemplateList />
        </Header>
        <Content>
          {/* import */}
          <ImportAction
            modalVisible={importModalVisible}
            setModalVisible={setImportModalVisible}
            onSubmit={handleImportSubmit}
          />
          <ConstantConfigAction
            visible={constantModalVisible}
            setVisible={setConstantModalVisible}
            onSubmit={saveConstantConfig}
          />
          <Dashboard />
        </Content>
      </Layout>
    </Context.Provider>
  );
};
