import mockJs from 'mockjs';

const demandList = {
  total: 15,
  list: [
    {
      name: '李颖',
      phone: '18723912982',
      is_admin: false,
      role_type: 4,
    },
    {
      name: 'zhangyinge',
      phone: '18329968200',
      is_admin: true,
      role_type: 5,
    },
    {
      name: '王航',
      phone: '18329968211',
      is_admin: false,
      role_type: 6,
    },
    {
      name: '张三',
      phone: '18888188889',
      is_admin: false,
      role_type: 1,
    },
    {
      name: '李四',
      phone: '18888288890',
      is_admin: false,
      role_type: 2,
    },
    {
      name: 'Mike',
      phone: '18888880883',
      is_admin: false,
      role_type: 3,
    },
    {
      name: 'Amy',
      phone: '18888881112',
      is_admin: false,
      role_type: 4,
    },
    {
      name: '王五',
      phone: '18888888589',
      is_admin: true,
      role_type: 5,
    },
  ],
};

export default mockJs.mock('/api/get_people_list', 'get', demandList);
