import * as React from 'react';
import Nav from '@components/nav/index';
import Header from '@components/header/index';
import Router from './route';
import { userMenu } from '@config/menu';
import styles from './index.less';

export const User: React.FC<any> = () => {
  return (
    <div>
      <Header />
      <Nav navList={userMenu} />
      <div className={styles['right-section']}>
        <Router />
      </div>
    </div>
  );
};

export default User;
