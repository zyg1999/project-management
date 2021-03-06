import mockJs from 'mockjs';

const bugList = {
  total: 30,
  list: [
    {
      bug_id: 5,
      create_time: '2021-03-02 11:20:00',
      system_type: 1,
      status: 2,
      name: '接口参数，传参取值不对',
      desc: '应该传为url上面的参数',
      priority_status: 3,
      imgs: ['https://sf3-ttcdn-tos.pstatp.com/obj/motor-img/4c943b91f8ea01880f7367651b74a866'],
      reporter: 'zhangsan',
      handler: 'zhangyinge',
      business_line: '在线营销',
      resolution: '',
    },
    {
      bug_id: 4,
      create_time: '2021-03-01 10:00:03',
      system_type: 1,
      status: 2,
      name: '秒杀后，按钮状态展示不对',
      desc: '立即秒杀后，按钮应该展示查看，而不是结束',
      priority_status: 3,
      imgs: ['https://sf3-ttcdn-tos.pstatp.com/obj/motor-img/4c943b91f8ea01880f7367651b74a866'],
      reporter: 'zhangsan',
      handler: 'zhangyinge',
      business_line: '在线营销',
      resolution: '',
    },
    {
      bug_id: 3,
      create_time: '2021-02-03 18:00',
      system_type: 1,
      status: 2,
      name: '上传9张图后，入口未隐藏',
      desc: '用户进入点评页面',
      priority_status: 2,
      imgs: ['https://sf3-ttcdn-tos.pstatp.com/obj/motor-img/4c943b91f8ea01880f7367651b74a866'],
      reporter: 'zhangsan',
      handler: 'zhangyinge',
      business_line: '在线营销',
      resolution: '',
    },
    {
      bug_id: 1,
      create_time: '2021-02-02 18:48',
      system_type: 1,
      status: 3,
      name: '筛选未通过, 会有默认的3',
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
      create_time: '2021-02-02 20:48',
      system_type: 1,
      status: 3,
      name: '收到字段与所传的字段不符',
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

export default mockJs.mock('/api/bug/list', 'get', bugList);
