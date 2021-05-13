import * as React from 'react';
import { message, Modal, Select } from 'antd';
import { RESOLUTION } from '@constant/index';
import { solveBug } from '@api/bug';
type Props = {
  visible: boolean;
  bugId: number;
  setVisible: (val: boolean) => void;
  onOk?: () => void;
  onCancel?: () => void;
};
const SolveBug: React.FC<Props> = ({ visible, bugId, setVisible, onOk, onCancel }) => {
  const [type, setType] = React.useState();
  const handleChange = React.useCallback((val) => {
    setType(val);
  }, []);
  const handleOk = React.useCallback(() => {
    solveBug({
      bug_id: bugId,
      solve_type: type,
      status: 4,
    }).then(() => {
      message.success('解决成功');
      setVisible(false);
      onOk?.();
    });
  }, [type]);
  const handleCancel = React.useCallback(() => {
    onCancel?.();
    setVisible(false);
  }, []);
  return (
    <Modal
      title="解决问题"
      visible={visible}
      okText="确定"
      cancelText="取消"
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div>
        解决方案：
        <Select
          placeholder="请选择解决方案"
          options={RESOLUTION}
          style={{ width: 200 }}
          onChange={handleChange}
        />
      </div>
    </Modal>
  );
};

export default SolveBug;
