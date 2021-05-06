import * as React from 'react';
import { Table, Popconfirm, Button, Modal, Tag, Form, Input, Select, message } from 'antd';

import { SYSTEM_TYPE } from '@constant/index';
import { addPeople, getPeopleList, delPeople } from '@api/people';

export const PeopleManage = () => {
  const [list, setList] = React.useState();
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [form] = Form.useForm();
  const [pagination, setPagination] = React.useState({ current: 1, pageSize: 2, total: 0 });

  const pageRef = React.useRef<any>();
  const listRef = React.useRef([]);

  const handleTableChange = (paginationNext) => {
    const { current, pageSize } = paginationNext;
    const offset = (current - 1) * pageSize;
    getPeopleList({
      limit: pagination.pageSize,
      offset,
    }).then((res) => {
      const { total, user } = res;
      setList(user || []);
      listRef.current = user || [];
      setPagination({
        ...pagination,
        current,
        total,
      });

      pageRef.current = {
        ...pagination,
        total,
        current,
      };
    });
  };
  React.useEffect(() => {
    handleTableChange(pagination);
  }, []);

  const handleDel = React.useCallback(
    (phone: string) => () => {
      let { current, pageSize } = pageRef.current;

      if (listRef.current && listRef.current.length === 1) {
        current = current - 1 !== 0 ? current - 1 : 1;
        setPagination({
          ...pagination,
          current,
        });
      }
      delPeople({ phone }).then(() => {
        message.success('添加成功');
        handleTableChange({ pageSize, current });
      });
    },
    []
  );
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'phone_number',
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
        <Tag color="blue">{SYSTEM_TYPE.find((item) => item.value === val)?.label}</Tag>
      ),
    },
    {
      title: '操作',
      render: (_, row) => (
        <>
          <Popconfirm
            title={`确定要删除${row.name}吗？`}
            onConfirm={handleDel(row.phone_number)}
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

  const handleOk = React.useCallback(() => {
    form
      .validateFields()
      .then((values) => {
        addPeople(values).then(() => {
          message.success('添加成功');
          handleTableChange(pagination);
        });
      })
      .catch((errorInfo) => {
        console.log(errorInfo, 'info');
      })
      .finally(() => {
        setModalVisible(false);
      });
  }, [form]);

  const handleCancel = React.useCallback(() => {
    setModalVisible(false);
  }, []);
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setModalVisible(true);
        }}
      >
        添加人员
      </Button>
      <Table
        style={{ marginTop: 20 }}
        columns={columns}
        rowKey="phone"
        dataSource={list}
        onChange={handleTableChange}
        pagination={pagination}
      />
      <Modal
        title="添加人员"
        visible={isModalVisible}
        maskClosable
        okText="确定"
        cancelText="取消"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} initialValues={{ is_admin: 0 }}>
          <Form.Item
            label="手机号"
            name="phone"
            rules={[{ required: true, message: '请填写手机号' }]}
          >
            <Input maxLength={11} placeholder="请输入手机号" allowClear></Input>
          </Form.Item>
          <Form.Item
            label="密码"
            name="pass_word"
            rules={[{ required: true, message: '请填写密码' }]}
          >
            <Input maxLength={20} placeholder="请输入账户密码" allowClear />
          </Form.Item>
          <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请填写姓名' }]}>
            <Input maxLength={10} placeholder="请输入姓名" allowClear></Input>
          </Form.Item>
          <Form.Item
            label="权限"
            name="is_admin"
            rules={[{ required: true, message: '请选择权限' }]}
          >
            <Select placeholder="请选择权限">
              <Select.Option value={0}>非管理员</Select.Option>
              <Select.Option value={1}>管理员</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="角色"
            name="role_type"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="请选择角色" options={SYSTEM_TYPE} allowClear />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PeopleManage;
