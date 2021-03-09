import * as React from 'react';
import Nav from '@components/nav/index';
import Header from '@components/header/index';
import Router from './route';
import { adminMenu } from '@config/menu';

import styles from './index.less';

export const Admin: React.FC<any> = () => {
  return (
    <div>
      <Header isAdmin />
      <Nav navList={adminMenu} />
      <div className={styles['right-section']}>
        <Router />
      </div>
    </div>
  );
};

export default Admin;
