import {
  AppstoreOutlined,
  BugOutlined,
  BarsOutlined,
  BarChartOutlined,
  ApartmentOutlined,
  UsergroupAddOutlined,
  ProjectOutlined,
} from '@ant-design/icons';

export const userMenu = [
  {
    name: '个人看板',
    key: 'home',
    path: '/user/home',
    icon: AppstoreOutlined,
  },
  {
    name: 'Bug 列表',
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

export const adminMenu = [
  {
    name: '业务线管理',
    key: 'business',
    path: '/admin/business-line',
    icon: ApartmentOutlined,
  },
  {
    name: '人员管理',
    key: 'people',
    path: '/admin/people-manage',
    icon: UsergroupAddOutlined,
  },
  {
    name: '模版管理',
    key: 'model',
    path: '/admin/model-manage',
    icon: ProjectOutlined,
  },
];
