import * as React from 'react';
import styles from './index.less';

export const Header = () => {
  return (
    <div>
      <span className={styles['logo']} />
      <div>
        企业项目管理系统<span>个人端</span>
      </div>
    </div>
  );
};

export default Header;
