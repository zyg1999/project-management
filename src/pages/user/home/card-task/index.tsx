import * as React from 'react';
import { Card, Radio } from 'antd';

export const CardTask = () => {
  return (
    <Card style={{ marginBottom: 20 }}>
      <h4>分配给我的任务</h4>
      <Radio.Group
        options={['未完成需求', '已完成需求']}
        onChange={() => {
          console.log(1);
        }}
        value={'未完成需求'}
        optionType="button"
      />
    </Card>
  );
};

export default CardTask;
