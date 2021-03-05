import * as React from 'react';
import cs from 'classnames'
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

import styles from './index.less';
type NavProps = {
  navList: {
    name: string;
    key: string;
    path: string;
    icon: React.ReactNode;
  }[];
};
export const Nav: React.FC<NavProps> = ({ navList = [] }) => {
  const { pathname } = window.location;
  const [actKey, setActKey] = React.useState(
    navList.find((it) => it.path === pathname)?.key || navList[0]?.key
  );

  const handleClick = React.useCallback((e) => {
    setActKey(e.key);
  }, []);

  return (
    <div>
      <Menu
        mode="inline"
        className={styles['menu']}
        selectedKeys={[actKey]}
        onClick={handleClick}
        style={{ width: 180 }}
      >
        {navList?.map((item) => (
          <Menu.Item key={item.key} icon={<item.icon />}>
            <Link to={item.path}>{item.name}</Link>
          </Menu.Item>
        ))}
      </Menu>
      {/* <i style={{ fontSize: 16 }} onClick={handleIconClick} className={cs(`iconfont ${collapsed? 'iconzhedie1': 'iconzhedie2'}`, styles.icon) } /> */}
    </div>
  );
};

export default Nav;
