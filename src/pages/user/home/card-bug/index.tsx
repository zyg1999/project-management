import * as React from 'react';
import { Card, Radio, Select } from 'antd';

export const CardBug = () => {
  return (
    <Card style={{ marginBottom: 20 }}>
      <h4>我的bug</h4>
      <Radio.Group
        options={['指派给我的 Bug', '我创建的 Bug']}
        onChange={() => {
          console.log(1);
        }}
        value={'指派给我的 Bug'}
        optionType="button"
      />
      <Select
        style={{ margin: '0 10px' }}
        placeholder="请选择 Bug 状态"
        options={[
          { label: '重新打开', key: '1' },
          { label: '开始', key: '2' },
          { label: '关闭', key: '3' },
          { label: '已解决', key: '4' },
        ]}
      />
      <Select
        placeholder="请选择 Bug 优先级"
        options={[
          { label: 'p0', key: '1' },
          { label: 'p1', key: '2' },
          { label: 'p2', key: '3' },
          { label: 'p3', key: '4' },
        ]}
      />
    </Card>
  );
};

export default CardBug;
