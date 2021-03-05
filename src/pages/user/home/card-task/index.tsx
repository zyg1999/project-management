import * as React from 'react';
import { Card, Radio, Table, DatePicker } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import '../../../../../mock/demand-list';

const { RangePicker } = DatePicker;

import styles from './index.less';

const DEMAND_LIST = [
  { label: '未完成需求', value: 1 },
  { label: '已完成需求', value: 2 },
];

export const CardTask = () => {
  const [status, setStatus] = React.useState(1);
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
      dataIndec: 'date',
    },
    {
      title: '操作',
    },
  ];

  return (
    <Card style={{ marginBottom: 20 }}>
      <h4>分配给我的任务</h4>
      <Radio.Group
        options={DEMAND_LIST}
        onChange={handleClick}
        value={status}
        optionType="button"
      />
      {status === 2 && <RangePicker style={{ marginLeft: 20 }} />}
      <Table style={{ marginTop: 20 }} columns={columns} />
    </Card>
  );
};

export default CardTask;
