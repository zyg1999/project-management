import * as React from 'react';
import styles from './index.less';

export const DemandItem = () => {
  return (
    <div className={styles['demand-item']}>
      <div className={styles['section-title']}>需求评审池(50)</div>
      <div className={styles['card-box']}>
        <div className={styles['small-card']}>
          <p className={styles['demand-title']}>XXXX需求优化</p>
          <div className={styles['people-info']}>
            <div>
              <span>需求内部评估</span>
              <img className={styles['avatar']} src={require('@assets/avatar.jpeg').default} />
              <span className={styles['people-name']}>zyg</span>
            </div>
            <div>未排期</div>
          </div>
          <div>文档</div>
        </div>
        <div className={styles['small-card']}>
          <p className={styles['demand-title']}>XXXX需求优化</p>
          <div className={styles['people-info']}>
            <div>
              <span>需求内部评估</span>
              <img className={styles['avatar']} src={require('@assets/avatar.jpeg').default} />
              <span className={styles['people-name']}>zyg</span>
            </div>
            <div>未排期</div>
          </div>
          <div>文档</div>
        </div>
        <div className={styles['small-card']}>
          <p className={styles['demand-title']}>XXXX需求优化</p>
          <div className={styles['people-info']}>
            <div>
              <span>需求内部评估</span>
              <img className={styles['avatar']} src={require('@assets/avatar.jpeg').default} />
              <span className={styles['people-name']}>zyg</span>
            </div>
            <div>未排期</div>
          </div>
          <div>文档</div>
        </div>
        <div className={styles['small-card']}>
          <p className={styles['demand-title']}>XXXX需求优化</p>
          <div className={styles['people-info']}>
            <div>
              <span>需求内部评估</span>
              <img className={styles['avatar']} src={require('@assets/avatar.jpeg').default} />
              <span className={styles['people-name']}>zyg</span>
            </div>
            <div>未排期</div>
          </div>
          <div>文档</div>
        </div>
        <div className={styles['small-card']}>
          <p className={styles['demand-title']}>XXXX需求优化</p>
          <div className={styles['people-info']}>
            <div>
              <span>需求内部评估</span>
              <img className={styles['avatar']} src={require('@assets/avatar.jpeg').default} />
              <span className={styles['people-name']}>zyg</span>
            </div>
            <div>未排期</div>
          </div>
          <div>文档</div>
        </div>
      </div>
    </div>
  );
};

export default DemandItem;
