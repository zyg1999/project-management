import * as React from 'react';
import { Button, Tag } from 'antd';
import dayjs from 'dayjs';
import styles from './index.less';
import { Link } from 'react-router-dom';

type DemandItemType = {
  name: string;
  link: string;
  demand_id: number;
  info: [
    {
      user_name: string;
      start_time: string;
      end_time: string;
      title: string;
    }
  ];
};
type DemandItemProps = {
  title: string;
  demandList: DemandItemType[];
};

export const DemandItem: React.FC<DemandItemProps> = ({ title, demandList = [] }) => {
  // if (!demandList.length) {
  //   return null;
  // }
  return (
    <div className={styles['demand-item']}>
      <div className={styles['section-title']}>{title}</div>
      <div className={styles['card-box']}>
        {demandList?.map((item, index) => (
          <Link key={index} to={`/user/create-demand?id=${item.demand_id}`}>
            <div className={styles['small-card']}>
              <p className={styles['demand-title']}>{item?.name}</p>
              <div className={styles['people-info']}>
                {<span className={styles['process']}>{item['info']?.[0]?.title}</span>}
                <div>
                  {/* <img className={styles['avatar']} src={require('@assets/avatar.jpeg').default} /> */}
                  <span className={styles['people-name']}>
                    {item['info']?.[0]?.user_name ?? '暂未安排'}
                  </span>
                </div>
              </div>
              <div>
                <Tag color={item['info']?.[0]?.start_time ? '#108ee9' : '#f52003'}>
                  {item['info']?.[0]?.start_time
                    ? `${dayjs(item.info[0].start_time).format('YYYY-MM-DD')} ~ ${dayjs(
                        item.info[0].end_time
                      ).format('YYYY-MM-DD')}`
                    : '未排期'}
                </Tag>
              </div>
              <Button style={{ padding: 0 }} type="link" href={item.link}>
                文档
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DemandItem;
