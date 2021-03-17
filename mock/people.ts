import mockJs from 'mockjs';

const demandList = {
  total: 15,
  list: [
    {
      name: '张三',
      phone: '1888888888',
      is_admin: false,
      role_type: 1,
    },
    {
      name: '王五',
      phone: '1888888889',
      is_admin: true,
      role_type: 5,
    },
  ],
};

export default mockJs.mock('/api/get_people_list', 'get', demandList);
