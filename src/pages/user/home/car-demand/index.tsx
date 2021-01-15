import * as React from 'react';
import { Card, Radio } from 'antd';
export const CardDemand = () => {
  return (
    <Card>
      <h4>我的需求</h4>
      <Radio.Group
        options={['我创建的需求', '我关注的需求']}
        onChange={() => {
          console.log(1);
        }}
        value={'我创建的需求'}
        optionType="button"
      />
    </Card>
  );
};

export default CardDemand;
