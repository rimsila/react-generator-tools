import { Tabs } from 'antd';
import React from 'react';
const { TabPane } = Tabs;

export const DynamicTabs = () => {
  return (
    <Tabs defaultActiveKey="1" tabPosition="top" style={{ height: 220 }}>
      {[...Array.from({ length: 30 }, (v, i) => i)].map(i => (
        <TabPane tab={`Tab-${i}`} key={i} disabled={i === 28}>
          Content of tab {i}
        </TabPane>
      ))}
    </Tabs>
  );
};
