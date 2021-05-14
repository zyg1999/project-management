import * as React from 'react';
import { Modal, Form, Select, Input, message } from 'antd';
import { BUGTYPE, BUGTIME, SYSTEM_TYPE, BUG_PRIORITY } from '@constant/index';
import styles from './index.less';
import { addBug } from '@api/bug';
import { PeopleList } from '../people-list/index';

const { Item } = Form;

type BugCreateProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  demand: any[];
  update: () => void;
  rowInfo: any;
  peopleList: any[];
};
export const BugCreate: React.FC<BugCreateProps> = ({
  visible,
  setVisible,
  demand,
  update,
  rowInfo,
  peopleList,
}) => {
  const [form] = Form.useForm();
  const name = localStorage.getItem('name');
  const [isRead, setIsRead] = React.useState(false);

  const handleOk = React.useCallback(() => {
    form
      .validateFields()
      .then((values) => {
        const phone = localStorage.getItem('phone') || '';
        addBug({
          ...values,
          reporter_id: phone,
        }).then(() => {
          message.success('创建成功');
          setVisible(false);
          update();
        });
      })
      .then((err) => {
        console.log(err, 'err');
      });
  }, []);

  const handleCancel = React.useCallback(() => {
    form.resetFields();
    setVisible(false);
  }, [setVisible]);

  React.useEffect(() => {
    if (!!rowInfo?.bug_id) {
      form.setFieldsValue({ ...rowInfo, reporter_id: peopleList });
      setIsRead(true);
    }
  }, [rowInfo]);

  return (
    <Modal
      title="创建 Bug"
      visible={visible}
      width={700}
      okText="确定"
      cancelText="取消"
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form className={styles.form} form={form} initialValues={{ reporter_id: name }}>
        <Item
          label="系统类型"
          required
          name="system_id"
          rules={[
            {
              required: true,
              message: 'Please input your name',
            },
          ]}
        >
          <Select disabled={isRead} placeholder="请选择系统类型" options={SYSTEM_TYPE} allowClear />
        </Item>
        <Item label="关联需求" name="demand_id" required>
          <Select disabled={isRead} placeholder="请设置关联需求" allowClear options={demand} />
        </Item>
        <Item label="主题" required name="title">
          <Input disabled={isRead} placeholder="请填写主题" allowClear />
        </Item>
        <Item label="优先级" required name="priority_status">
          <Select
            disabled={isRead}
            placeholder="请选择 Bug 优先级"
            options={BUG_PRIORITY}
            allowClear
          />
        </Item>
        <Item label="报告人" required name="reporter_id">
          <Input disabled />
        </Item>
        <Item label="经办人" required name="handler_id">
          {/* <Select placeholder="请选择经办人" options={peopleList} allowClear /> */}
          <PeopleList disabled={isRead} placeholder="请选择经办人" />
        </Item>
        <Item label="bug分类" required name="type">
          <Select disabled={isRead} placeholder="请选择bug分类" options={BUGTYPE} allowClear />
        </Item>
        <Item label="bug发现时机" required name="opportunity">
          <Select disabled={isRead} placeholder="请选择bug发现时机" options={BUGTIME} allowClear />
        </Item>
        {/* <Item label="附件">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from uploading company data or
              other band files
            </p>
          </Dragger>
        </Item> */}
        <Item label="描述" name="desc">
          <Input.TextArea disabled={isRead} allowClear />
        </Item>
      </Form>
    </Modal>
  );
};

export default BugCreate;
