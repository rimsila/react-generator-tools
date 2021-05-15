import client from '@/client';
import { enUSIntl, IntlProvider } from '@ant-design/pro-table';
import { ApolloProvider } from '@apollo/client';
import '@next-dev/component/es/style/index.less';
import validateMessages from '@next-dev/core/es/validation';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.less';
import enUS from 'antd/lib/locale/en_US';
import React from 'react';

const BlankLayout: React.FC = (props) => (
  <div>
    <ApolloProvider client={client}>
      <ConfigProvider
        {...{
          form: { validateMessages },
          input: {
            autoComplete: 'off',
          },

          locale: enUS,
        }}
      >
        <IntlProvider
          value={{
            intl: enUSIntl,
            valueTypeMap: {},
          }}
        >
          {props.children}
        </IntlProvider>
      </ConfigProvider>
    </ApolloProvider>
  </div>
);

export default BlankLayout;
