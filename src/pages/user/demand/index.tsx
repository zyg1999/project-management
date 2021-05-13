import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import DemandItem from './demand-item/index';
import { demandPool } from '@api/demand';
import styles from './index.less';

export const Demand = () => {
  const [pollList, setPollList] = React.useState({});
  React.useEffect(() => {
    demandPool().then((res) => {
      setPollList(res);
    });
  }, []);

  return (
    <div>
      <Button type="primary">
        <Link to="/user/create-demand">创建需求</Link>
      </Button>
      <div className={styles['wrapper']}>
        <DemandItem
          title={`需求评审池(${pollList?.review_pool?.total})`}
          demandList={pollList?.review_pool?.list || []}
        />

        <DemandItem
          title={`开发池(${pollList?.development_poll?.total})`}
          demandList={pollList?.development_poll?.list}
        />
        <DemandItem
          title={`测试池(${pollList?.test_poll?.total})`}
          demandList={pollList?.test_poll?.list}
        />
        <DemandItem
          title={`验收池(${pollList?.acceptance_poll?.total})`}
          demandList={pollList?.acceptance_poll?.list}
        />
        <DemandItem
          title={`已完成(${pollList?.complete_poll?.total})`}
          demandList={pollList?.complete_poll?.list}
        />
      </div>
    </div>
  );
};

export default Demand;
