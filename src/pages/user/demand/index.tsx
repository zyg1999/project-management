import * as React from 'react';
import { Button, Card } from 'antd';
import DemandItem from './demand-item/index';
export const Demand = () => {
  return (
    <div>
      <Button type="primary">创建需求</Button>
      <Card style={{ marginTop: 10 }}>
        <DemandItem />
      </Card>
    </div>
  );
};

export default Demand;
