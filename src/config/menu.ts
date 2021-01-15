import { AppstoreOutlined, BugOutlined, BarsOutlined, BarChartOutlined } from '@ant-design/icons';

export const userMenu = [
  {
    name: '个人看板',
    key: 'home',
    path: '/user/home',
    icon: AppstoreOutlined,
  },
  {
    name: 'bug列表',
    key: 'bug',
    path: '/user/buglist',
    icon: BugOutlined,
  },
  {
    name: '需求看板',
    key: 'demand',
    path: '/user/demand-list',
    icon: BarsOutlined,
  },
  {
    name: '数据分析',
    key: 'data',
    path: '/user/data-analysis',
    icon: BarChartOutlined,
  },
];

export const adminMenu = [];
