import * as React from 'react';
import cs from 'classnames';
import dayjs from 'dayjs';
import {
  Card,
  Radio,
  Table,
  DatePicker,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Popconfirm,
} from 'antd';
import { Link } from 'react-router-dom';

import { RadioChangeEvent } from 'antd/lib/radio/interface';
import '../../../../../mock/demand-list';
import { demandList, setDemandTime, sloveDemand } from '@api/demand';
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
  // const [bugDetailVisible, setVisible] = React.useState(false);
  const [deleteVisible, setDeleteVisible] = React.useState(false);
  const [pagination, setPagination] = React.useState({ current: 1, pageSize: 10, total: 0 });
  const phone = localStorage.getItem('phone') || '';
  const handleClick = React.useCallback((e: RadioChangeEvent) => {
    setStatus(e.target.value);
  }, []);

  const handleComplete = React.useCallback(
    (id: number, row) => () => {
      sloveDemand({
        demand_id: id,
        item_id: row.info[0]?.item_id,
        user_id: phone,
      }).then(() => {
        message.success('操作成功');
      });
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
  const handleTimeChange = React.useCallback((date, id, info) => {
    setDemandTime({
      demand_id: id,
      start_time: new Date(date[0]).getTime(),
      end_time: new Date(date[1]).getTime(),
      item_id: info[0].item_id,
      user_id: phone,
    }).then(() => {
      message.success('设置成功');
      handleTableChange({ pageSize: 10, current: 1 });
    });
  }, []);
  const columns = [
    {
      title: '序号',
      dataIndex: 'demand_id',
    },
    {
      title: '需求名称',
      dataIndex: 'name',
    },
    // {
    //   title: '所属业务线',
    //   dataIndex: 'business_line',
    // },
    {
      title: '状态',
      dataIndex: 'status',
      render: (_) => (status === 1 ? '进行中' : '已完成'),
    },
    {
      title: '排期',
      dataIndex: 'start_time',
      render: (date, row) =>
        row.info[0].start_time ? (
          <div className={styles.date}>
            <span>
              {dayjs(row.info[0].start_time).format('YYYY-MM-DD')}~
              {dayjs(row.info[0].end_time).format('YYYY-MM-DD')}
            </span>
            <i
              className={cs('iconfont iconclose', styles.close)}
              onClick={handleCloseClick(row.id)}
            />
          </div>
        ) : (
          <RangePicker
            placeholder={['设置开始时间', '设置结束时间']}
            onChange={(date) => handleTimeChange(date, row.demand_id, row.info)}
          />
        ),
    },
    {
      title: '操作',
      dataIndex: 'demand_id',
      render: (id, row) => (
        <div>
          <Button type="primary" size="small">
            <Link to={`/user/create-demand?id=${id}`}>查看</Link>
          </Button>
          {status === 1 && (
            <Popconfirm
              title={'确定要完成改需求吗？'}
              onConfirm={handleComplete(id, row)}
              cancelText="取消"
              okText="确认"
            >
              <Button
                style={{ marginLeft: 5, backgroundColor: '#2db7f5' }}
                type="primary"
                size="small"
              >
                完成
              </Button>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  const handleTableChange = (paginationNext) => {
    const { current, pageSize } = paginationNext;
    const offset = (current - 1) * pageSize;
    const phone = localStorage.getItem('phone');
    demandList({ limit: pageSize, offset, phone, is_all: false, status }).then((res) => {
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
    handleTableChange({ pageSize: 10, current: 1 });
  }, [status]);

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
        <Table
          rowKey="demand_id"
          pagination={pagination}
          dataSource={list}
          style={{ marginTop: 20 }}
          columns={columns}
          onChange={handleTableChange}
        />
      </Card>
      {/* <Modal
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
      </Modal> */}
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
