import { SettingDrawer } from '@ant-design/pro-layout';
import { useState } from 'react';

export const NextSettingDrawer = () => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  // const { settings } = initialState || {};
  const [settings, setSetting] = useState();
  // "umi-plugin-antd-theme": "^2.1.2", //* install in and it will generate theme
  return (
    <SettingDrawer
      {...{
        settings,
        onSettingChange: (changeSetting) => {
          setSetting(changeSetting as any);
          // setInitialState({
          //   ...initialState,
          //   settings: { ...initialState?.settings, ...changeSetting } as ProSettings,
          // });
        },
      }}
    />
  );
};
