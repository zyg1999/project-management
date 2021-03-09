import * as React from 'react';
import { Table, Button, Popconfirm, Input } from 'antd';

import { getBusinessLine } from '../../../api/business';
import '../../../../mock/business';

import styles from './index.less';
import Modal from 'antd/lib/modal/Modal';

export const BusinessLine = () => {
  const [businessList, setList] = React.useState();
  const [isModalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    getBusinessLine().then((res) => {
      setList(res?.list || []);
    });
  }, []);

  const confirm = React.useCallback(
    (id: number) => () => {
      console.log(id, 'id');
    },
    []
  );
  const colums = [
    {
      title: '业务线名称',
      dataIndex: 'business_name',
    },
    {
      title: '操作',
      render: (_, row) => (
        <>
          <Popconfirm
            title={`确定要删除${row.business_name}吗？`}
            onConfirm={confirm(row.business_id)}
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
      <Button
        type="primary"
        onClick={() => {
          setModalVisible((v) => !v);
        }}
      >
        创建业务线
      </Button>
      <Table
        className={styles.table}
        columns={colums}
        rowKey="business_name"
        dataSource={businessList}
      />
      <Modal
        title="添加业务线"
        visible={isModalVisible}
        maskClosable
        okText="确定"
        cancelText="取消"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <span>名称：</span>
          <Input placeholder="请填写业务线名称" />
        </div>
      </Modal>
    </div>
  );
};

export default BusinessLine;
