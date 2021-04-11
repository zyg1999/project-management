import mockJs from 'mockjs';

const data = {
  list: [
    {
      business_name: '业务线1',
      business_id: 1,
    },
    {
      business_name: '业务线2',
      business_id: 2,
    },
    {
      business_name: '业务线3',
      business_id: 3,
    },
    {
      business_name: '业务线4',
      business_id: 4,
    },
  ],
};

export default mockJs.mock('/api/business_line/list', 'get', data);
