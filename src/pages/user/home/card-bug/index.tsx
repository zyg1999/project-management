/* eslint-disable react/jsx-no-target-blank */
import * as React from 'react';
import dayjs from 'dayjs';
import { Card, Radio, Select, Table, Button, Tag, message } from 'antd';
import { BUG_STATUS, BUG_PRIORITY } from '@constant/index';
import SolveBugModal from '@components/solve-bug/index';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import { getBugList, solveBug } from '../../../../api/bug';
import styles from './index.less';
import { PeopleList } from '@constant/const';
const BUG_TYPE = [
  { label: '指派给我的 Bug', value: 0 },
  { label: '我创建的 Bug', value: 1 },
];
export const CardBug = () => {
  const [bugType, setBugType] = React.useState(0);
  const [bugList, setBugList] = React.useState();
  const [bugStatus, setBugStatus] = React.useState();
  const [pagination, setPagination] = React.useState({ current: 1, pageSize: 10, total: 0 });
  const [bugVisible, setBugVisible] = React.useState<boolean>(false);
  const [selectBug, setSelect] = React.useState(0);
  const [priority, setPriority] = React.useState();
  const columns = [
    {
      title: '序号',
      dataIndex: 'bug_id',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '创建日期',
      dataIndex: 'begin_time',
      key: 'begin_time',
      render: (val, _) => dayjs(val).format('YYYY-MM-DD HH:mm:ss'),
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
      title: '优先级',
      dataIndex: 'priority_status',
      key: 'priority_status',
      render: (priority, _) => (
        <Tag color={`${priority === 1 ? 'red' : '#108ee9'} `}>
          {BUG_PRIORITY.find((it) => it.value === priority)?.label ?? '-'}
        </Tag>
      ),
    },
    // {
    //   title: '附件',
    //   dataIndex: 'imgs',
    //   key: 'imgs',
    //   render: (imgs, _) =>
    //     imgs.map((it, index) => (
    //       <p key={index} className="line-1" style={{ width: 150 }}>
    //         <a href={it} target="_blank">
    //           {it}
    //         </a>
    //       </p>
    //     )),
    // },
    {
      title: '操作',
      render: (_, record) => {
        return (
          <div>
            {[1, 2].includes(record.status) && (
              <Button
                className={styles.btn}
                size="small"
                type="primary"
                onClick={() => {
                  setBugVisible(true);
                  setSelect(record.bug_id);
                }}
              >
                解决问题
              </Button>
            )}
            {[3, 4].includes(record.status) && (
              <Button
                className={styles.btn}
                size="small"
                type="primary"
                onClick={() => {
                  solveBug({
                    bug_id: record.bug_id,
                    solve_type: record.solve_type,
                    status: 2,
                  }).then(() => {
                    message.success('开启成功');
                    update({ pageSize: 20, current: 0 });
                  });
                }}
              >
                恢复开启问题
              </Button>
            )}
            {record.status === 4 && (
              <Button
                className={styles.btn}
                size="small"
                type="primary"
                onClick={() => {
                  solveBug({
                    bug_id: record.bug_id,
                    solve_type: record.solve_type,
                    status: 3,
                  }).then(() => {
                    message.success('关闭成功');
                    update({ pageSize: 20, current: 0 });
                  });
                }}
              >
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

  const update = React.useCallback(
    (paginationN) => {
      const { current, pageSize } = paginationN;
      const offset = (current - 1) * pageSize;
      getBugList({
        limit: pageSize,
        offset,
        is_assign: bugType,
        status: bugStatus,
        priority_status: priority,
        user_id: localStorage.getItem('phone') || '',
      }).then((res) => {
        const { bug_list: list, total } = res;
        setBugList(list);
        setPagination({
          ...pagination,
          total,
        });
      });
    },
    [bugType, bugStatus, priority]
  );
  React.useEffect(() => {
    update(pagination);
  }, [bugStatus, bugType, priority]);

  const handleRadioChange = React.useCallback((e: RadioChangeEvent) => {
    setBugType(e.target.value);
  }, []);
  const handleStatusChange = React.useCallback((val) => {
    setBugStatus(val);
  }, []);

  const handlePriorityChange = React.useCallback((val) => {
    setPriority(val);
  }, []);
  return (
    <Card style={{ marginBottom: 20 }}>
      <h4>我的bug</h4>
      <Radio.Group
        options={BUG_TYPE}
        onChange={handleRadioChange}
        value={bugType}
        optionType="button"
      />
      <Select
        style={{ margin: '0 10px', width: 160 }}
        allowClear
        placeholder="请选择 Bug 状态"
        value={bugStatus}
        options={BUG_STATUS}
        onChange={handleStatusChange}
      />
      <Select
        placeholder="请选择 Bug 优先级"
        allowClear
        options={BUG_PRIORITY}
        onChange={handlePriorityChange}
        style={{ width: 160 }}
      />
      <Table
        rowKey="bug_id"
        style={{ marginTop: 20 }}
        pagination={pagination}
        dataSource={bugList}
        columns={columns}
        onChange={update}
      />
      <SolveBugModal visible={bugVisible} setVisible={setBugVisible} bugId={selectBug} />
    </Card>
  );
};

export default CardBug;
