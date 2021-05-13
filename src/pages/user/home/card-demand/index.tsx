import * as React from 'react';
import { Button, Card, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { myDemandList } from '@api/demand';
import { DEMAND_PRIORITY } from '@constant/index';
export const CardDemand = () => {
  const columns = [
    {
      title: '序号',
      dataIndex: 'demand_id',
    },
    {
      title: '需求名称',
      dataIndex: 'name',
    },
    {
      title: '优先级',
      dataIndex: 'priority_status',
      render: (val, _) => <Tag color="blue">{DEMAND_PRIORITY[val].label}</Tag>,
    },
    {
      title: '备注',
      dataIndex: 'note',
    },
    {
      title: '文档连接',
      dataIndex: 'link',
      render: (val) => (
        <Button type="link" href={val} size="small" target="_blank">
          {val}
        </Button>
      ),
    },
    {
      title: '操作',
      dataIndex: 'demand_id',
      render: (val) => (
        <Button size="small" type="primary">
          <Link to={`/user/create-demand?id=${val}`}>查看</Link>
        </Button>
      ),
    },
  ];
  const [pagination, setPagination] = React.useState({ current: 1, pageSize: 2, total: 0 });
  const [list, setList] = React.useState();
  const handleTableChange = (paginationNext) => {
    const { current, pageSize } = paginationNext;
    const offset = (current - 1) * pageSize;
    const phone = localStorage.getItem('phone');
    myDemandList({ limit: pageSize, offset, phone }).then((res) => {
      const { list, total } = res;
      setList(list);
      setPagination({
        ...pagination,
        total,
        current,
      });
    });
  };

  React.useEffect(() => {
    handleTableChange(pagination);
  }, []);
  return (
    <Card>
      <h4>我的需求</h4>
      <Table
        style={{ marginTop: 20 }}
        columns={columns}
        pagination={pagination}
        rowKey="demand_id"
        dataSource={list}
        onChange={handleTableChange}
      />
    </Card>
  );
};

export default CardDemand;
