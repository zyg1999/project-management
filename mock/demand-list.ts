import mockJs from 'mockjs';

const demandList = {
  total: 15,
  list: [
    {
      title: '大放送活动',
      id: 1,
      business_line: '营销',
      status: '未开始',
      date: '2020-08-20 ~ 2020-08-21',
    },
    {
      title: '购车工具',
      id: 2,
      business_line: '营销',
      status: '进行中',
      date: '',
    },
  ],
};

export default mockJs.mock('/api/demand/list', 'get', demandList);
