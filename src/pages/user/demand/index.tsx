import * as React from 'react';
import { Button } from 'antd';
import DemandItem from './demand-item/index';

import styles from './index.less';
const data = [
  {
    title: 'xxx需求',
    process: '需求内部评估',
    user_info: {
      avatar: '',
      name: 'zyg',
    },
    date: '01-10~02-15',
    link: 'https://www.baidu.com.',
  },
  {
    title: 'xxx需求',
    process: '需求内部评估',
    user_info: {
      avatar: '',
      name: 'zyg',
    },
    date: '01-10~02-15',
    link: 'https://www.baidu.com.',
  },
  {
    title: 'xxx需求',
    process: '需求内部评估',
    user_info: {
      avatar: '',
      name: 'zyg',
    },
    date: '',
    link: 'https://www.baidu.com.',
  },
];

export const Demand = () => {
  return (
    <div>
      <Button type="primary">创建需求</Button>
      <div className={styles['wrapper']}>
        <DemandItem title="需求评审池(50)" demandList={data} />
        <DemandItem title="开发池(50)" demandList={data} />
        <DemandItem title="测试池(50)" demandList={data} />
        <DemandItem title="验收池(50)" demandList={data} />
        <DemandItem title="已完成(52)" demandList={data} />
      </div>
    </div>
  );
};

export default Demand;
