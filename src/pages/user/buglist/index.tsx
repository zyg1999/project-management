import * as React from 'react';
import { Card, Button, Form, Select, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { BUGTYPE, BUGTIME } from '@constant/index';

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
          <Item label="系统类型" style={{ marginBottom: 10 }}>
            <Select
              placeholder="请选择系统类型"
              options={[
                { label: 'FE', value: '1' },
                { label: 'iOS', value: ' 2' },
                { label: 'Android', value: '3' },
                { label: 'Serve', value: '4' },
              ]}
            />
          </Item>
          <Item label="状态">
            <Select
              placeholder="请选择状态"
              options={[
                { label: '重新打开', value: '1' },
                { label: '开始', value: '2' },
                { label: '关闭', value: '3' },
                { label: '已解决', value: '4' },
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
                { label: 'p0', value: '1' },
                { label: 'p1', value: '2' },
                { label: 'p2', value: '3' },
                { label: 'p3', value: '4' },
              ]}
            />
          </Item>
          <Item label="bug分类">
            <Select placeholder="请选择bug分类" options={BUGTYPE} />
          </Item>
          <Item label="bug发现时机">
            <Select placeholder="请选择bug发现时机" options={BUGTIME} />
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
