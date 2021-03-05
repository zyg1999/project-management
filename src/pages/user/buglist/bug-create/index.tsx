import * as React from 'react';
import { Modal, Form, Select, Input, Upload, message } from 'antd';
import { BUGTYPE, BUGTIME, SYSTEM_TYPE, BUG_PRIORITY } from '@constant/index';
import styles from './index.less';

const { Item } = Form;
import { InboxOutlined } from '@ant-design/icons';
type BugCreateProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};
export const BugCreate: React.FC<BugCreateProps> = ({ visible, setVisible }) => {
  const { Dragger } = Upload;

  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <Modal
      title="创建 Bug"
      visible={visible}
      width={700}
      okText="确定"
      cancelText="取消"
      onCancel={() => setVisible(false)}
    >
      <Form className={styles.form}>
        <Item
          label="系统类型"
          required
          rules={[
            {
              required: true,
              message: 'Please input your name',
            },
          ]}
        >
          <Select placeholder="请选择系统类型" options={SYSTEM_TYPE} allowClear />
        </Item>
        <Item label="关联需求" required>
          <Select placeholder="请设置关联需求" />
        </Item>
        <Item label="主题" required>
          <Input placeholder="请填写主题" />
        </Item>
        <Item label="优先级" required>
          <Select placeholder="请选择 Bug 优先级" options={BUG_PRIORITY} />
        </Item>
        <Item label="报告人">
          <Input disabled />
        </Item>
        <Item label="经办人" required>
          <Select />
        </Item>
        <Item label="bug分类" required>
          <Select placeholder="请选择bug分类" options={BUGTYPE} />
        </Item>
        <Item label="bug发现时机" required>
          <Select placeholder="请选择bug发现时机" options={BUGTIME} />
        </Item>
        <Item label="附件">
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
        </Item>
        <Item label="描述">
          <Input.TextArea />
        </Item>
      </Form>
    </Modal>
  );
};

export default BugCreate;
