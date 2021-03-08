import * as React from 'react';
import { Card, Radio, Table, DatePicker, Button } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import '../../../../../mock/demand-list';
import { getDemandList } from '../../../../api/home';
const { RangePicker } = DatePicker;

import styles from './index.less';

const DEMAND_LIST = [
  { label: '未完成需求', value: 1 },
  { label: '已完成需求', value: 2 },
];

export const CardTask = () => {
  const [status, setStatus] = React.useState(1);
  const [list, setList] = React.useState();
  const [pagination, setPagination] = React.useState({ current: 1, pageSize: 10, total: 0 });

  const handleClick = React.useCallback((e: RadioChangeEvent) => {
    setStatus(e.target.value);
  }, []);

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
      title: '排期',
      dataIndex: 'date',
      render: (date, _) => <span>{date ? date : '设置排期'}</span>,
    },
    {
      title: '操作',
      render: () => (
        <div>
          <Button type="primary" size="small">
            查看
          </Button>
          <Button style={{ marginLeft: 5, backgroundColor: '#2db7f5' }} type="primary" size="small">
            完成
          </Button>
        </div>
      ),
    },
  ];

  React.useEffect(() => {
    getDemandList().then((res) => {
      setList(res?.list || []);
      setPagination({
        ...pagination,
        total: res.total,
      });
    });
  }, []);

  return (
    <Card style={{ marginBottom: 20 }}>
      <h4>分配给我的任务</h4>
      <Radio.Group
        options={DEMAND_LIST}
        onChange={handleClick}
        value={status}
        optionType="button"
      />
      {status === 2 && (
        <div className={styles.time}>
          <span>时间查询区间：</span>
          <RangePicker allowClear style={{ marginLeft: 20 }} />
        </div>
      )}
      <Table
        rowKey="demand_id"
        pagination={pagination}
        dataSource={list}
        style={{ marginTop: 20 }}
        columns={columns}
      />
    </Card>
  );
};

export default CardTask;
