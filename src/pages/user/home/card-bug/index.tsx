import * as React from 'react';
import { Card, Radio, Select, Table } from 'antd';
import { BUG_STATUS, BUG_PRIORITY } from '@constant/index';

export const CardBug = () => {
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '优先级',
      dataIndex: 'priority_status',
    },
    {
      title: '附件',
      dataIndex: 'imgs',
    },
    {
      title: '操作',
      dataIndex: 'status',
    },
  ];

  return (
    <Card style={{ marginBottom: 20 }}>
      <h4>我的bug</h4>
      <Radio.Group
        options={['指派给我的 Bug', '我创建的 Bug']}
        onChange={() => {
          console.log(1);
        }}
        value={'指派给我的 Bug'}
        optionType="button"
      />
      <Select style={{ margin: '0 10px' }} placeholder="请选择 Bug 状态" options={BUG_STATUS} />
      <Select placeholder="请选择 Bug 优先级" options={BUG_PRIORITY} />
      <Table style={{ marginTop: 20 }} columns={columns} />
    </Card>
  );
};

export default CardBug;
