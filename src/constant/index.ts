export const BUGTYPE = [
  { label: '异常边界', value: 1 },
  { label: '兼容性问题', value: 2 },
  { label: 'UI问题', value: 3 },
  { label: '统计埋点问题', value: 4 },
  { label: '功能逻辑问题', value: 5 },
  { label: '性能问题', value: 6 },
];

export const BUGTIME = [
  {
    label: '一轮测试',
    value: 1,
  },
  {
    label: '二轮测试',
    value: 2,
  },
  {
    label: 'UI验收',
    value: 3,
  },
  {
    label: '产品验收',
    value: 4,
  },
  {
    label: '线上',
    value: 5,
  },
];

export const SYSTEM_TYPE = [
  { label: 'FE', value: 1 },
  { label: 'iOS', value: 2 },
  { label: 'Android', value: 3 },
  { label: 'Serve', value: 4 },
  { label: 'PM', value: 5 },
  { label: 'QA', value: 6 },
];

export const BUG_STATUS = [
  { label: '重新打开', value: 1 },
  { label: '开始', value: 2 },
  { label: '关闭', value: 3 },
  { label: '已解决', value: 4 },
];

export const BUG_PRIORITY = [
  { label: 'P0', value: 1 },
  { label: 'P1', value: 2 },
  { label: 'P2', value: 3 },
  { label: 'P3', value: 4 },
];

export const RESOLUTION = [
  { label: '已修复', value: 1 },
  { label: '拒绝修复', value: 2 },
  { label: '未复现', value: 3 },
  { label: '设计如此', value: 4 },
  { label: '未来修复', value: 5 },
];
