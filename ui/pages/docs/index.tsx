import { IUiApi } from '@umijs/ui-types';
import { Layout, Tabs } from 'antd';
import { ReactNode } from 'react';

const { Header, Content } = Layout;

type docTabData = {
  name: string;
  content?: ReactNode;
  iframeLink?: string;
};

export default ({ api }: { api: IUiApi }) => {
  const { callRemote } = api;
/**
 * render tab contend base on content or iframe
 */
  const menuData: docTabData[] = [

    {
      name: 'Next Dev',
      iframeLink: 'https://rimsila.github.io/next-dev/',
    },
    {
      name: 'Ant Design Pro',
      iframeLink: 'https://procomponents.ant.design/en-US/components/table/?current=1&pageSize=5',
    },
    {
      name: 'Ant Design',
      iframeLink: 'https://ant.design/components/button/',
    },
    {
      name: 'Ahook',
      iframeLink: 'https://ahooks.js.org/hooks/async',
    },
    {
      name: 'RN Component',
      iframeLink: 'https://thundersdata-frontend.github.io/td-design/react-native',
    },
  ];

  return (
    <Layout style={{ overflowY: 'auto' }}>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', maxHeight: 70 }}>
        <Tabs defaultActiveKey="1" tabPosition="top">
          {menuData.map((v, i) => (
            <Tabs.TabPane tab={v.name} key={`next-dev${i}`}>
              <Content>
                {v?.iframeLink && (
                  <iframe style={{ width: '90%', minHeight: '90vh' }} src={v?.iframeLink} />
                )}
                {v?.content}
              </Content>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Header>
    </Layout>
  );
};
