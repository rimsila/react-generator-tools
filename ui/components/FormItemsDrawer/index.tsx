import React, { useState } from 'react';
import {
  Drawer,
  Form,
  Cascader,
  Checkbox,
  Input,
  DatePicker,
  InputNumber,
  Radio,
  Switch,
  Slider,
  Select,
  TreeSelect,
  Upload,
  TimePicker,
  Rate,
  Button,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FormItemType } from '../../../interfaces/common';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

const { RangePicker } = DatePicker;
const { Option } = Select;

export default ({
  setVisible,
  visible,
  onSubmit,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSubmit: (checkedComponents: FormItemType[]) => void;
}) => {
  const [checkedComponents, setCheckedComponents] = useState<FormItemType[]>([]);

  /** Whether the check box is selected */
  const handleChange = (type: FormItemType) => (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      // Add to checkedComponents
      setCheckedComponents(checked => [...checked, type]);
    } else {
      // Move out from checkedComponents
      const checked = checkedComponents.slice();
      const index = checked.findIndex(item => item === type);
      if (index > -1) {
        checked.splice(index, 1);
      }
      setCheckedComponents(checked);
    }
  };

  /** Pass out the selected form elements */
  const handleSubmit = () => {
    onSubmit(checkedComponents);
    setCheckedComponents([]);
  };

  const handleClose = () => {
    setVisible(false);
    setCheckedComponents([]);
  };

  return (
    <Drawer
      title="Select form element"
      visible={visible}
      width={360}
      onClose={handleClose}
      destroyOnClose
    >
      <Form labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} labelAlign="left">
        <Form.Item label={<Checkbox onChange={handleChange('input')}>Text input box</Checkbox>}>
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item
          label={<Checkbox onChange={handleChange('password')}>Password input box</Checkbox>}
        >
          <Input.Password autoComplete="off" />
        </Form.Item>
        <Form.Item
          label={<Checkbox onChange={handleChange('textarea')}>Text field input box</Checkbox>}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label={<Checkbox onChange={handleChange('cascader')}>Cascading selection</Checkbox>}
        >
          <Cascader
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                    children: [
                      {
                        value: 'xihu',
                        label: 'West Lake',
                      },
                    ],
                  },
                ],
              },
              {
                value: 'jiangsu',
                label: 'Jiangsu',
                children: [
                  {
                    value: 'nanjing',
                    label: 'Nanjing',
                    children: [
                      {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                      },
                    ],
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label={<Checkbox onChange={handleChange('date')}>Date Picker</Checkbox>}>
          <DatePicker />
        </Form.Item>
        <Form.Item
          label={<Checkbox onChange={handleChange('range')}>Date range selector</Checkbox>}
        >
          <RangePicker />
        </Form.Item>
        <Form.Item label={<Checkbox onChange={handleChange('time')}>Time Picker</Checkbox>}>
          <TimePicker />
        </Form.Item>
        <Form.Item label={<Checkbox onChange={handleChange('number')}>Number input box</Checkbox>}>
          <InputNumber value={24} />
        </Form.Item>
        <Form.Item
          label={<Checkbox onChange={handleChange('radio')}>Single selection box</Checkbox>}
        >
          <Radio.Group defaultValue={1}>
            <Radio value={1}>Male</Radio>
            <Radio value={0}>Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label={<Checkbox onChange={handleChange('checkbox')}>Checkbox</Checkbox>}>
          <Checkbox.Group options={['Apple', 'Pear']} defaultValue={['Apple']} />
        </Form.Item>
        <Form.Item label={<Checkbox onChange={handleChange('switch')}>Switch</Checkbox>}>
          <Switch checked />
        </Form.Item>
        <Form.Item label={<Checkbox onChange={handleChange('slider')}>Slide input bar</Checkbox>}>
          <Slider value={45} />
        </Form.Item>
        <Form.Item
          label={<Checkbox onChange={handleChange('select')}>Drop-down selection</Checkbox>}
        >
          <Select style={{ width: '100%' }}>
            <Option value="A">A</Option>
            <Option value="B">B</Option>
            <Option value="C">C</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={<Checkbox onChange={handleChange('treeselect')}>Tree selection</Checkbox>}
        >
          <TreeSelect
            style={{ width: '100%' }}
            treeData={[
              {
                title: 'Node1',
                value: '0-0',
                children: [
                  {
                    title: 'Child Node1',
                    value: '0-0-1',
                  },
                  {
                    title: 'Child Node2',
                    value: '0-0-2',
                  },
                ],
              },
              {
                title: 'Node2',
                value: '0-1',
              },
            ]}
          />
        </Form.Item>
        <Form.Item label={<Checkbox onChange={handleChange('upload')}>Upload</Checkbox>}>
          <Upload>
            <Button>
              <UploadOutlined /> Click to Upload
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item label={<Checkbox onChange={handleChange('rate')}>Rating</Checkbox>}>
          <Rate allowHalf defaultValue={2.5} />
        </Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          determine
        </Button>
      </Form>
    </Drawer>
  );
};
