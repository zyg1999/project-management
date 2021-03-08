import * as React from 'react';
import { Card, Button, Form, Select, DatePicker, Table, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
  BUGTYPE,
  BUGTIME,
  SYSTEM_TYPE,
  BUG_STATUS,
  BUG_PRIORITY,
  RESOLUTION,
} from '@constant/index';
import { BugCreate } from './bug-create/index';
import { getBugList } from '../../../api/bug-list';
import '../../../../mock/bug-list';

const { RangePicker } = DatePicker;
const { Item } = Form;
import styles from './index.less';

export const BugList = () => {
  const [createVisible, setVisible] = React.useState(false);
  const [bugList, setBugList] = React.useState([]);
  const [pagination, setPagination] = React.useState({ current: 1, pageSize: 20, total: 0 });

  const handleClick = React.useCallback(() => {
    setVisible(true);
  }, []);

  React.useEffect(() => {
    getBugList().then((data) => {
      const { list, total } = data;
      setBugList(list || []);
      setPagination({
        ...pagination,
        total,
      });
    });
  }, []);

  const columns = [
    {
      title: 'bugId',
      dataIndex: 'bug_id',
      key: 'bug_id',
    },
    {
      title: '创建日期',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '系统类型',
      dataIndex: 'system_type',
      key: 'system_type',
      render: (sysytem, _) => (
        <span>{SYSTEM_TYPE.find((it) => it.value === sysytem)?.label || '-'}</span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status, _) => (
        <Tag color={`${[1, 2].includes(status) ? '#108ee9' : '#cecece'}`}>
          {BUG_STATUS.find((it) => it.value === status)?.label || '-'}
        </Tag>
      ),
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      width: 200,
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: '优先级',
      dataIndex: 'priority_status',
      key: 'priority_status',
      render: (priority, _) => (
        <Tag color={`${priority === 1 ? 'red' : '#108ee9'} `}>
          {BUG_PRIORITY.find((it) => it.value === priority)?.label ?? '-'}
        </Tag>
      ),
    },
    {
      title: '附件',
      dataIndex: 'imgs',
      key: 'imgs',
      render: (imgs, _) =>
        imgs.map((it, index) => (
          <p key={index} className="line-1" style={{ width: 150 }}>
            <a>{it}</a>
          </p>
        )),
    },
    {
      title: '报告人',
      dataIndex: 'reporter',
      key: 'reporter',
    },
    {
      title: '模块',
      dataIndex: 'business_line',
      key: 'business_line',
    },
    {
      title: 'resolution',
      dataIndex: 'resolution',
      key: 'resolution',
    },
    {
      title: '操作',
      render: (_, record) => {
        return (
          <div>
            {[1, 2].includes(record.status) && (
              <Button className={styles.btn} size="small" type="primary">
                解决问题
              </Button>
            )}
            {[3, 4].includes(record.status) && (
              <Button className={styles.btn} size="small" type="primary">
                恢复开启问题
              </Button>
            )}
            {record.status === 4 && (
              <Button className={styles.btn} size="small" type="primary">
                关闭问题
              </Button>
            )}
            <Button className={styles.btn} size="small" type="primary">
              详情
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Card>
        <Button style={{ margin: '10px 0' }} type="primary" onClick={handleClick}>
          创建Bug
        </Button>
        <Form layout="inline">
          <Item label="系统类型" style={{ marginBottom: 10 }}>
            <Select
              style={{ width: 150 }}
              allowClear
              placeholder="请选择系统类型"
              options={SYSTEM_TYPE}
            />
          </Item>
          <Item label="状态">
            <Select
              style={{ width: 130 }}
              allowClear
              placeholder="请选择状态"
              options={BUG_STATUS}
            />
          </Item>
          <Item label="创建日期">
            <RangePicker />
          </Item>
          <Item label="bug优先级">
            <Select
              style={{ width: 170 }}
              allowClear
              placeholder="请选择 Bug 优先级"
              options={BUG_PRIORITY}
            />
          </Item>
          <Item label="解决方案">
            <Select
              style={{ width: 150 }}
              allowClear
              placeholder="请选择解决方案"
              options={RESOLUTION}
            />
          </Item>
          <Item label="bug分类">
            <Select
              style={{ width: 150 }}
              allowClear
              placeholder="请选择bug分类"
              options={BUGTYPE}
            />
          </Item>
          <Item label="bug发现时机">
            <Select
              style={{ width: 170 }}
              allowClear
              placeholder="请选择bug发现时机"
              options={BUGTIME}
            />
          </Item>
          <Item>
            <Button icon={<SearchOutlined />} style={{ marginRight: 15 }} type="primary">
              搜索
            </Button>
            <Button>重置</Button>
          </Item>
        </Form>
        <Table
          className={styles.table}
          columns={columns}
          rowKey="bug_id"
          pagination={pagination}
          dataSource={bugList}
        />
      </Card>
      <BugCreate visible={createVisible} setVisible={setVisible} />
    </div>
  );
};

export default BugList;
