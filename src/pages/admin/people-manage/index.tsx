import * as React from 'react';
import { Table, Popconfirm, Button, Modal, Tag, Form, Input, Select } from 'antd';

import { SYSTEM_TYPE } from '@constant/index';
import { getPeopleList } from '../../../api/admin';

import '../../../../mock/people';
export const PeopleManage = () => {
  const [list, setList] = React.useState();
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [form] = Form.useForm();

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
        <Tag color="blue">{SYSTEM_TYPE.find((item) => item.value === val)?.label}</Tag>
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
  // const onFinish =
  const handleOk = React.useCallback(() => {
    form
      .validateFields()
      .then((values) => {
        console.log(values, 'val');
      })
      .catch((errorInfo) => {
        console.log(errorInfo, 'info');
      });
    console.log(123);
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
      <Table style={{ marginTop: 20 }} columns={columns} rowKey="phone" dataSource={list} />
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
            rules={[
              { required: true, message: '请填写手机号' },
              { type: 'number', message: '手机号必须是数字' },
            ]}
          >
            <Input maxLength={11} placeholder="请输入手机号" allowClear></Input>
          </Form.Item>
          <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请填写姓名' }]}>
            <Input maxLength={10} placeholder="请输入姓名" allowClear></Input>
          </Form.Item>
          <Form.Item
            label="权限"
            name="is_admin"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="请选择权限">
              <Select.Option value={0}>非管理员</Select.Option>
              <Select.Option value={1}>管理员</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="角色" name="role" rules={[{ required: true, message: '请选择角色' }]}>
            <Select placeholder="请选择角色" options={SYSTEM_TYPE} allowClear />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PeopleManage;
