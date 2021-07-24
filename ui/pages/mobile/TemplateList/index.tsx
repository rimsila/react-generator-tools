import { EyeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Modal, Space, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import stateTemplateList from './template.json';

export default () => {
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState<string>();
  const [title, setTitle] = useState<string>();
  return (
    <>
      {stateTemplateList?.map(v => {
        return (
          <Card
            key={v.type}
            bodyStyle={{ padding: 6 }}
            hoverable
            style={{ width: 260 }}
            cover={<img key={v.name} src={v.thumb} />}
          >
            <Card.Meta
              style={{ textAlign: 'center' }}
              title={
                <Space style={{ padding: 4 }}>
                  <Tooltip title="View large image">
                    <Button
                      size="small"
                      type="ghost"
                      onClick={() => {
                        setImage(v.thumb);
                        setTitle(v.name);
                        setVisible(true);
                      }}
                    >
                      <EyeOutlined />
                    </Button>
                  </Tooltip>
                  <Typography.Text>Redux</Typography.Text>
                  <Tooltip title="View large image">
                    <Button
                      size="small"
                      type="ghost"
                      onClick={() => {
                        setImage(v.thumb);
                        setTitle(v.name);
                        setVisible(true);
                      }}
                    >
                      <PlusCircleOutlined />
                    </Button>
                  </Tooltip>
                </Space>
              }
            />
          </Card>
        );
      })}
      <Modal
        visible={visible}
        title={title}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
        width="80vw"
        centered
      >
        {image && <img src={image} style={{ width: '100%' }} />}
      </Modal>
    </>
  );
};
