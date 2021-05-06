import * as React from 'react';
import { Table, Button, Popconfirm, Input, message } from 'antd';

import { getBusinessLine, addBusinessLine, delBusinessLine } from '../../../api/business';

import styles from './index.less';
import Modal from 'antd/lib/modal/Modal';

export const BusinessLine = () => {
  const [businessList, setList] = React.useState();
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [businessName, setBusiness] = React.useState('');
  const [pagination, setPagination] = React.useState({ current: 1, pageSize: 2, total: 0 });

  const pageRef = React.useRef<any>();
  const listRef = React.useRef([]);
  const handleTableChange = (paginationNext) => {
    const { current, pageSize } = paginationNext;
    const offset = (current - 1) * pageSize;
    getBusinessLine({
      limit: pagination.pageSize,
      offset,
    }).then((res) => {
      const { total, business } = res;
      setList(business || []);
      listRef.current = business || [];
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

  const confirm = React.useCallback(
    (id: number) => () => {
      let { current, pageSize } = pageRef.current;

      if (listRef.current && listRef.current.length === 1) {
        current = current - 1 !== 0 ? current - 1 : 1;
        setPagination({
          ...pagination,
          current,
        });
      }
      delBusinessLine([id]).then(() => {
        message.success('删除成功');
        handleTableChange({ pageSize, current });
      });
    },
    []
  );
  const columns = [
    {
      title: '业务线名称',
      dataIndex: 'business_name',
    },
    {
      title: '操作',
      render: (_, row) => (
        <>
          <Popconfirm
            title={`确定要删除业务线 “${row.business_name}” 吗？`}
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

  const handleOk = React.useCallback(() => {
    addBusinessLine(businessName)
      .then(() => {
        message.success('添加成功');
        handleTableChange(pagination);
      })
      .finally(() => {
        setModalVisible(false);
        setBusiness('');
      });
  }, [businessName]);

  const handleCancel = React.useCallback(() => {
    setModalVisible(false);
    setBusiness('');
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
        columns={columns}
        rowKey="business_name"
        dataSource={businessList}
        pagination={pagination}
        onChange={handleTableChange}
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
          <Input
            placeholder="请填写业务线名称"
            value={businessName}
            onChange={(e) => setBusiness(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default BusinessLine;
