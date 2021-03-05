import mockJs from 'mockjs';

const bugList = {
  total: 30,
  list: [
    {
      bug_id: 1,
      create_time: '2021-02-02 18:48',
      system_type: 1,
      status: 3,
      title: '筛选未通过, 会有默认的3',
      desc: '筛选选择未通过、点击查看/审核、返回不操作、筛选框里有默认的值',
      priority_status: 3,
      imgs: ['https://sf3-ttcdn-tos.pstatp.com/obj/motor-img/4c943b91f8ea01880f7367651b74a866'],
      reporter: 'yangyueping',
      handler: 'zhangyinge',
      business_line: '在线营销',
      resolution: '已修复',
    },
    {
      bug_id: 2,
      create_time: '2021-02-02 18:48',
      system_type: 1,
      status: 3,
      title: '筛选未通过, 会有默认的3',
      desc: '筛选选择未通过、点击查看/审核、返回不操作、筛选框里有默认的值',
      priority_status: 3,
      imgs: ['https://sf3-ttcdn-tos.pstatp.com/obj/motor-img/4c943b91f8ea01880f7367651b74a866'],
      reporter: 'yangyueping',
      handler: 'zhangyinge',
      business_line: '在线营销',
      resolution: '已修复',
    },
  ],
};

export default mockJs.mock('/api/get_bug_list', 'get', bugList);
