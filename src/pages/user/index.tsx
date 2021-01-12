import * as React from 'react';
import Nav from '@components/nav/index';
import Router from './route';
import styles from './index.less';

export const User: React.FC<any> = () => {
  return (
    <div>
      <Nav />
      <div className={styles['right-section']}>
        <Router />
      </div>
    </div>
  );
};

export default User;
