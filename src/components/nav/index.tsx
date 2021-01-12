import * as React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { AppstoreOutlined, BugOutlined, BarsOutlined, BarChartOutlined } from '@ant-design/icons';

import styles from './index.less';

export const Nav: React.FC<any> = () => {
  const [actKey, setActKey] = React.useState('1');
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
        style={{ width: 256 }}
      >
        <Menu.Item key="1" icon={<AppstoreOutlined />}>
          <Link to="/user/home">个人看板</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<BugOutlined />}>
          <Link to="/user/buglist">bug列表</Link>
        </Menu.Item>
        <Menu.Item key="/user/demand-list" icon={<BarsOutlined />}>
          需求列表
        </Menu.Item>
        <Menu.Item key="/user/data-analysis" icon={<BarChartOutlined />}>
          数据分析
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Nav;
