import { IUiApi } from '@umijs/ui-types';
import { Layout } from 'antd';
import TemplateList from './TemplateList/index';

const { Header, Content } = Layout;

export default ({ api }: { api: IUiApi }) => {
  const { callRemote } = api;

  return (
    <Layout style={{ overflowY: 'auto' }}>
      <Header>
        <TemplateList />
      </Header>
    </Layout>
  );
};
