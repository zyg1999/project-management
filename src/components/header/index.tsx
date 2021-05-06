import * as React from 'react';
import styles from './index.less';

type HeaderProps = {
  isAdmin?: boolean;
};

export const Header: React.FC<HeaderProps> = ({ isAdmin = false }) => {
  const [exitvisible, setExit] = React.useState(false);
  const handleAvatarClick = React.useCallback(() => {
    setExit((v) => !v);
  }, []);

  const handleExit = React.useCallback(() => {
    window.location.href = `${window.origin}/userlogin`;
  }, []);

  return (
    <div className={styles['header']}>
      <span className={styles['logo']} />
      <div className={styles['system-title']}>
        企业项目管理系统<span>{isAdmin ? '管理员端' : '个人端'}</span>
      </div>
      <div className={styles['avatar']} onClick={handleAvatarClick}>
        {exitvisible && (
          <span className={styles['exit']} onClick={handleExit}>
            退出登陆
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
