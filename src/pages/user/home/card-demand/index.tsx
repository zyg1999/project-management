import * as React from 'react';
import { Card, Table } from 'antd';
export const CardDemand = () => {
  const columns = [
    {
      title: '需求名称',
      dataIndex: 'title',
    },
    {
      title: '所属业务线',
      dataIndex: 'business_line',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      dataIndex: 'status',
    },
  ];
  return (
    <Card>
      <h4>我的需求</h4>

      <Table style={{ marginTop: 20 }} columns={columns} />
    </Card>
  );
};

export default CardDemand;
