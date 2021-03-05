import mockJs from 'mockjs';

const demandList = {
  total: 15,
  list: [
    {
      title: '大放送活动',
      business_line: '营销',
      status: '未开始',
      date: '08-20 00:00 ~ 08-21 23:59',
    },
    {
      title: '购车工具',
      business_line: '营销',
      status: '进行中',
      date: '',
    },
  ],
};

export default mockJs.mock('/api/get_demand_list', 'get', demandList);
