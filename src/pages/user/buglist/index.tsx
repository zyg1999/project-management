import * as React from 'react';
import dayjs from 'dayjs';
import { Card, Button, Form, Select, DatePicker, Table, Tag, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
  BUGTYPE,
  BUGTIME,
  SYSTEM_TYPE,
  BUG_STATUS,
  BUG_PRIORITY,
  RESOLUTION,
} from '@constant/index';
import SolveBugModal from '@components/solve-bug/index';
import { BugCreate } from '../components/bug-create/index';
import { getBugList, solveBug } from '../../../api/bug';
import { getPeopleList } from '@api/people';
import { demandList } from '@api/demand';
// import { PeopleList } from '@constant/const';

const { RangePicker } = DatePicker;
const { Item } = Form;
import styles from './index.less';

export const BugList = () => {
  const [createVisible, setVisible] = React.useState(false);
  const [bugList, setBugList] = React.useState([]);
  const [pagination, setPagination] = React.useState({ current: 1, pageSize: 20, total: 0 });
  const [bugVisible, setBugVisible] = React.useState<boolean>(false);
  const [selectBug, setSelect] = React.useState(0);
  const [params, setParams] = React.useState({});
  const [form] = Form.useForm();
  const [demand, setList] = React.useState([]);
  const [peopleList, setPlist] = React.useState<any[]>();
  const [rowInfo, setRowInfo] = React.useState();

  const handleClick = React.useCallback(() => {
    setVisible(true);
  }, []);

  React.useEffect(() => {
    getPeopleList({
      limit: 0,
      offset: 0,
    }).then((res) => {
      setPlist(res?.user || []);
    });
  }, []);

  const handleDetailClick = React.useCallback(
    (row: any) => () => {
      setRowInfo(row);
      setBugVisible(true);
    },
    []
  );
  const columns = [
    {
      title: '创建日期',
      dataIndex: 'begin_time',
      key: 'begin_time',
      render: (val, _) => dayjs(val).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '系统类型',
      dataIndex: 'system_id',
      key: 'system_id',
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
      title: '报告人',
      dataIndex: 'reporter_id',
      render: (val) => peopleList?.find((item) => item.phone_number === val)?.name || '',
    },
    {
      title: '经办人',
      dataIndex: 'handler_id',
      render: (val) => peopleList?.find((item) => item.phone_number === val)?.name || '',
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
    //     imgs?.map((it, index) => (
    //       <p key={index} className="line-1" style={{ width: 150 }}>
    //         <a>{it}</a>
    //       </p>
    //     )),
    // },
    {
      title: '需求',
      dataIndex: 'demand_id',
      render: (val, _) => demand?.find((item) => item.value === val)?.label,
    },
    {
      width: 200,
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
    },
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
                    update();
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
                    update();
                  });
                }}
              >
                关闭问题
              </Button>
            )}
            <Button
              className={styles.btn}
              size="small"
              type="primary"
              onClick={handleDetailClick(record)}
            >
              详情
            </Button>
          </div>
        );
      },
    },
  ];

  const onQuery = () => {
    const { time, ...rest } = form.getFieldsValue();
    let filters = {};
    if (time?.length > 1) {
      filters = {
        ...rest,
        begin_time: new Date(time[0]).getTime(),
        end_time: new Date(time[1]).getTime(),
      };
    } else {
      filters = rest;
    }
    setParams(filters);
  };

  const onReset = () => {
    form.resetFields();
    setParams({});
  };

  const update = React.useCallback(() => {
    getBugList({
      ...params,
      limit: 20,
      offset: 0,
      is_assign: 3,
      user_id: localStorage.getItem('phone'),
    }).then((data) => {
      const { bug_list: list, total } = data;
      setBugList(list || []);
      setPagination({
        ...pagination,
        total,
      });
    });
  }, []);
  React.useEffect(() => {
    demandList({
      limit: 0,
      offset: 0,
      is_all: true,
      status: 1,
      phone: localStorage.getItem('phone') || '',
    }).then((res) => {
      setList(res.list.map((item) => ({ value: item.demand_id, label: item.name })));
    });
  }, []);

  React.useEffect(() => {
    const { current, pageSize } = pagination;
    const offset = (current - 1) * pageSize;

    getBugList({
      ...params,
      limit: pageSize,
      offset,
      is_assign: 3,
      user_id: localStorage.getItem('phone'),
    }).then((data) => {
      const { bug_list: list, total } = data;
      setBugList(list || []);
      setPagination({
        ...pagination,
        total,
      });
    });
  }, [params]);

  return (
    <div>
      <Card>
        <Button style={{ margin: '10px 0' }} type="primary" onClick={handleClick}>
          创建Bug
        </Button>
        <Form layout="inline" form={form}>
          <Item label="系统类型" style={{ marginBottom: 10 }} name="system_id">
            <Select
              style={{ width: 150 }}
              allowClear
              placeholder="请选择系统类型"
              options={SYSTEM_TYPE}
            />
          </Item>
          <Item label="状态" name="status">
            <Select
              style={{ width: 130 }}
              allowClear
              placeholder="请选择状态"
              options={BUG_STATUS}
            />
          </Item>
          <Item label="创建日期" name="time">
            <RangePicker />
          </Item>
          <Item label="bug优先级" name="priority_status">
            <Select
              style={{ width: 170 }}
              allowClear
              placeholder="请选择 Bug 优先级"
              options={BUG_PRIORITY}
            />
          </Item>
          <Item label="解决方案" name="solve_type">
            <Select
              style={{ width: 150 }}
              allowClear
              placeholder="请选择解决方案"
              options={RESOLUTION}
            />
          </Item>
          <Item label="bug分类" name="type">
            <Select
              style={{ width: 150 }}
              allowClear
              placeholder="请选择bug分类"
              options={BUGTYPE}
            />
          </Item>
          <Item label="bug发现时机" name="opportunity">
            <Select
              style={{ width: 170 }}
              allowClear
              placeholder="请选择bug发现时机"
              options={BUGTIME}
            />
          </Item>
          <Item>
            <Button
              icon={<SearchOutlined />}
              style={{ marginRight: 15 }}
              type="primary"
              onClick={onQuery}
            >
              搜索
            </Button>
            <Button onClick={onReset}>重置</Button>
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
      <BugCreate visible={createVisible} demand={demand} setVisible={setVisible} update={update} />
      <SolveBugModal
        visible={bugVisible}
        setVisible={setBugVisible}
        bugId={selectBug}
        onOk={update}
      />
    </div>
  );
};

export default BugList;
