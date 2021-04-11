import * as React from 'react';
import { Modal, Select } from 'antd';
import { RESOLUTION } from '@constant/index';
type Props = {
  visible: boolean;
  bugId: number;
  setVisible: (val: boolean) => void;
  onOk?: () => void;
  onCancel?: () => void;
};
const SolveBug: React.FC<Props> = ({ visible, bugId, setVisible, onOk, onCancel }) => {
  const handleOk = React.useCallback(() => {
    onOk?.();
    setVisible(false);
    console.log(bugId, 'bugId');
  }, []);
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
        <Select placeholder="请选择解决方案" options={RESOLUTION} style={{ width: 200 }} />
      </div>
    </Modal>
  );
};

export default SolveBug;
