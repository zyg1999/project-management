import * as React from 'react';
import { Card, Form, Input, Select } from 'antd';
const FormItem = Form.Item;

export const CreateDemand: React.FC = () => {
  return (
    <Card title="新建需求">
      <Form layout="vertical">
        <FormItem label="需求名称" rules={[{ required: true, message: '请填写需求名称!' }]}>
          <Input placeholder="请填写需求名称" />
        </FormItem>
        <FormItem label="文档链接">
          <Input placeholder="请填写需求文档地址" />
        </FormItem>
        <FormItem label="优先级">
          <Select
            placeholder="请选择需求优先级"
            defaultValue="1"
            options={[
              { value: '1', label: '普通(p2)' },
              { value: '2', label: '紧急(p1)' },
              { value: '3', label: '紧急(p0)' },
            ]}
          />
        </FormItem>
        <FormItem label="备注">
          <Input placeholder="请填写备注" />
        </FormItem>
        <FormItem label="所属业务"></FormItem>
        <FormItem label="需求负责人"></FormItem>
      </Form>
    </Card>
  );
};

export default CreateDemand;
