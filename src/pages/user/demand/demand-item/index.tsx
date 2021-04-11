import * as React from 'react';
import { Button, Tag, Modal } from 'antd';

import styles from './index.less';

type DemandItemType = {
  title: string;
  process: string;
  user_info: {
    avatar: string;
    name: string;
  };
  date: string;
  link: string;
};
type DemandItemProps = {
  title: string;
  demandList: DemandItemType[];
};

export const DemandItem: React.FC<DemandItemProps> = ({ title, demandList = [] }) => {
  const [selectCard, setCard] = React.useState<DemandItemType>({} as DemandItemType);

  const handleBack = React.useCallback(
    (item) => () => {
      setCard(item);
    },
    []
  );
  const handleCancel = React.useCallback(() => {
    setCard({} as DemandItemType);
  }, []);
  return (
    <div className={styles['demand-item']}>
      <div className={styles['section-title']}>{title}</div>
      <div className={styles['card-box']}>
        {demandList?.map((item, index) => (
          <div key={index} className={styles['small-card']}>
            <p className={styles['demand-title']}>{item.title}</p>
            <div className={styles['people-info']}>
              <span className={styles['process']}>{item.process}</span>
              <div>
                <img className={styles['avatar']} src={require('@assets/avatar.jpeg').default} />
                <span className={styles['people-name']}>{item.user_info.name}</span>
              </div>
            </div>
            <div>
              <Tag color={item.date ? '#108ee9' : '#f52003'}>
                {item.date ? item.date : '未排期'}
              </Tag>
            </div>
            <Button style={{ padding: 0 }} type="link" href={item.link}>
              文档
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemandItem;
