import * as React from 'react';
import { Card, Button, Form, Select, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;
const { Item } = Form;
export const BugList = () => {
  return (
    <div>
      <Card>
        <Button style={{ margin: '10px 0' }} type="primary">
          创建Bug
        </Button>
        <Form layout="inline">
          <Item label="系统类型">
            <Select
              placeholder="请选择系统类型"
              options={[
                { label: 'FE', key: '1' },
                { label: 'iOS', key: ' 2' },
                { label: 'Android', key: '3' },
                { label: 'Serve', key: '4' },
              ]}
            />
          </Item>
          <Item label="状态">
            <Select
              placeholder="请选择状态"
              options={[
                { label: '重新打开', key: '1' },
                { label: '开始', key: '2' },
                { label: '关闭', key: '3' },
                { label: '已解决', key: '4' },
              ]}
            />
          </Item>
          <Item label="创建日期">
            <RangePicker />
          </Item>
          <Item label="bug优先级">
            <Select
              placeholder="请选择 Bug 优先级"
              options={[
                { label: 'p0', key: '1' },
                { label: 'p1', key: '2' },
                { label: 'p2', key: '3' },
                { label: 'p3', key: '4' },
              ]}
            />
          </Item>
          <Item>
            <Button icon={<SearchOutlined />} style={{ marginRight: 15 }} type="primary">
              搜索
            </Button>
            <Button>重置</Button>
          </Item>
        </Form>
      </Card>
    </div>
  );
};

export default BugList;
