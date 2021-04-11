import mockJs from 'mockjs';

const demandBorder = {
  review_poll: {
    total: 65,
    list: [
      {
        title: 'XXX需求',
        link: 'https://www.baidu.com',
        people_info: [
          {
            title: '需求内部评估',
            avatar:
              'https://sf3-ttcdn-tos.pstatp.com/obj/motor-img/4c943b91f8ea01880f7367651b74a866',
            name: 'zyg',
            time: '',
          },
        ],
        priority_status: 1,
      },
      {
        title: 'XXX需求',
        link: 'https://www.baidu.com',
        people_info: [
          {
            title: '需求内部评估',
            avatar:
              'https://sf3-ttcdn-tos.pstatp.com/obj/motor-img/4c943b91f8ea01880f7367651b74a866',
            name: 'zyg',
            time: '',
          },
        ],
        priority_status: 2,
      },
    ],
  },
  development_poll: {},
  test_poll: {},
  acceptance_poll: {},
  complete_poll: {},
};

export default mockJs.mock('/api/demand/board', 'get', demandBorder);
