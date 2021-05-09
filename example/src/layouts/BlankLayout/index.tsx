import React from 'react';
import { enUSIntl, IntlProvider } from '@ant-design/pro-table';
import '@next-dev/component/es/style/index.less';
import validateMessages from '@next-dev/core/es/validation';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.less';
import enUS from 'antd/lib/locale/en_US';


const BlankLayout: React.FC = (props) => (
  <div>
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
  </div>
);

export default BlankLayout;
