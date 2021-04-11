import * as React from 'react';
import { Card, Radio, Select, Table, Button, Tag } from 'antd';
import { BUG_STATUS, BUG_PRIORITY } from '@constant/index';
import SolveBugModal from '@components/solve-bug/index';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import { getBugList } from '../../../../api/bug-list';
import '../../../../../mock/bug-list';
import styles from './index.less';

const BUG_TYPE = [
  { label: '指派给我的 Bug', value: 1 },
  { label: '我创建的 Bug', value: 2 },
];
export const CardBug = () => {
  const [bugType, setBugType] = React.useState(1);
  const [bugList, setBugList] = React.useState();
  const [pagination, setPagination] = React.useState({ current: 1, pageSize: 10, total: 0 });
  const [bugVisible, setBugVisible] = React.useState<boolean>(false);
  const [selectBug, setSelect] = React.useState(0);
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
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
    {
      title: '附件',
      dataIndex: 'imgs',
      key: 'imgs',
      render: (imgs, _) =>
        imgs.map((it, index) => (
          <p key={index} className="line-1" style={{ width: 150 }}>
            <a href={it} target="_blank">
              {it}
            </a>
          </p>
        )),
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

  React.useEffect(() => {
    getBugList().then((res) => {
      const { list, total } = res;
      setBugList(list);
      setPagination({
        ...pagination,
        total,
      });
    });
  }, []);

  const handleRadioChange = React.useCallback((e: RadioChangeEvent) => {
    setBugType(e.target.value);
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
        style={{ margin: '0 10px' }}
        allowClear
        placeholder="请选择 Bug 状态"
        options={BUG_STATUS}
      />
      <Select placeholder="请选择 Bug 优先级" allowClear options={BUG_PRIORITY} />
      <Table
        rowKey="bug_id"
        style={{ marginTop: 20 }}
        pagination={pagination}
        dataSource={bugList}
        columns={columns}
      />
      <SolveBugModal visible={bugVisible} setVisible={setBugVisible} bugId={selectBug} />
    </Card>
  );
};

export default CardBug;
