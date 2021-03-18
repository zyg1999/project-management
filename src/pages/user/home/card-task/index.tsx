import * as React from 'react';
import cs from 'classnames';
import { Card, Radio, Table, DatePicker, Button, Modal, Form, Input, Select } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import '../../../../../mock/demand-list';
import { getDemandList } from '../../../../api/home';
const { RangePicker } = DatePicker;

import styles from './index.less';
const { Item } = Form;

const DEMAND_LIST = [
  { label: '未完成需求', value: 1 },
  { label: '已完成需求', value: 2 },
];

export const CardTask = () => {
  const [status, setStatus] = React.useState(1);
  const [list, setList] = React.useState();
  const [bugDetailVisible, setVisible] = React.useState(false);
  const [deleteVisible, setDeleteVisible] = React.useState(false);
  const [pagination, setPagination] = React.useState({ current: 1, pageSize: 10, total: 0 });

  const handleClick = React.useCallback((e: RadioChangeEvent) => {
    setStatus(e.target.value);
  }, []);

  const handleComplete = React.useCallback(
    (id: number) => () => {
      setVisible(true);
      console.log(id, 'id');
    },
    []
  );

  const handleCloseClick = React.useCallback(
    (id: number) => () => {
      console.log(id);
      setDeleteVisible(true);
    },
    []
  );
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
      render: (date, row) =>
        date ? (
          <div className={styles.date}>
            <span>{date}</span>
            <i
              className={cs('iconfont iconclose', styles.close)}
              onClick={handleCloseClick(row.id)}
            />
          </div>
        ) : (
          <RangePicker placeholder={['设置开始时间', '设置结束时间']} />
        ),
    },
    {
      title: '操作',
      render: (id) => (
        <div>
          <Button type="primary" size="small">
            查看
          </Button>
          <Button
            style={{ marginLeft: 5, backgroundColor: '#2db7f5' }}
            type="primary"
            size="small"
            onClick={handleComplete(id)}
          >
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
    <>
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
          rowKey="id"
          pagination={pagination}
          dataSource={list}
          style={{ marginTop: 20 }}
          columns={columns}
        />
      </Card>
      <Modal
        title="相关信息"
        visible={bugDetailVisible}
        onCancel={() => setVisible(false)}
        okText="确定"
        cancelText="取消"
      >
        <Form>
          <Item label="提测建议">
            <Input placeholder="请填写提测建议" />
          </Item>
          <Item label="设计文档">
            <Input placeholder="请填写设计文档" />
          </Item>
          <Item label="工时" style={{ width: 200 }}>
            <Input type="number" placeholder="请填写天数" />
          </Item>
        </Form>
      </Modal>
      <Modal
        title="删除排期"
        visible={deleteVisible}
        onCancel={() => setDeleteVisible(false)}
        okText="确定"
        cancelText="取消"
      >
        <Form>
          <Item label="原因" required>
            <Select
              allowClear
              options={[
                { label: '需求变更', value: 1 },
                { label: '其他', value: 2 },
              ]}
            />
          </Item>
          <Item label="补充">
            <Input.TextArea maxLength={200} autoSize={{ minRows: 3, maxRows: 5 }} />
          </Item>
        </Form>
      </Modal>
    </>
  );
};

export default CardTask;
