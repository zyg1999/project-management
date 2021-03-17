import * as React from 'react';
import { Table, Popconfirm, Button, Modal, Tag } from 'antd';

import { SYSTEM_TYPE } from '@constant/index';
import { getPeopleList } from '../../../api/admin';

import '../../../../mock/people';
export const PeopleManage = () => {
  const [list, setList] = React.useState();
  const [isModalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    getPeopleList().then((res) => {
      setList(res?.list || []);
    });
  }, []);
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '权限',
      dataIndex: 'is_admin',
      render: (val, _) => <Tag color={val ? 'magenta' : 'blue'}>{val ? '管理员' : '普通用户'}</Tag>,
    },
    {
      title: '角色',
      dataIndex: 'role_type',
      render: (val, _) => (
        <Tag color="blue">
          {
            SYSTEM_TYPE.concat([{ label: 'PM', value: 5 }]).find((item) => item.value === val)
              ?.label
          }
        </Tag>
      ),
    },
    {
      title: '操作',
      render: (_, row) => (
        <>
          <Popconfirm
            title={`确定要删除${row.name}吗？`}
            onConfirm={() => {}}
            cancelText="取消"
            okText="确认"
          >
            <Button type="primary" size="small">
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  const handleOk = React.useCallback(() => {}, []);

  const handleCancel = React.useCallback(() => {
    setModalVisible(false);
  }, []);
  return (
    <div>
      <Button type="primary">添加人员</Button>
      <Table style={{ marginTop: 20 }} columns={columns} rowKey="phone" dataSource={list} />
      <Modal
        title="添加人员"
        visible={isModalVisible}
        maskClosable
        okText="确定"
        cancelText="取消"
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
    </div>
  );
};

export default PeopleManage;
