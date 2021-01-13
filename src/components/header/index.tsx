import * as React from 'react';
import styles from './index.less';

export const Header = () => {
  const [exitvisible, setExit] = React.useState(false);
  const handleAvatarClick = React.useCallback(() => {
    setExit((v) => !v);
  }, []);
  return (
    <div className={styles['header']}>
      <span className={styles['logo']} />
      <div className={styles['system-title']}>
        企业项目管理系统<span>个人端</span>
      </div>
      <div className={styles['avatar']} onClick={handleAvatarClick}>
        {exitvisible && <span className={styles['exit']}>退出登陆</span>}
      </div>
    </div>
  );
};

export default Header;
