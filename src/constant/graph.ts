export const baseConfig = {
  type: 'graph',
  layout: 'none',
  symbolSize: 5,
  roam: false,
  label: {
    normal: {
      show: true,
    },
  },
  edgeSymbol: [null, 'arrow'],
  edgeSymbolSize: [0, 10],
  edgeLabel: {
    normal: {
      textStyle: {
        fontSize: 12,
      },
    },
  },
};

export const FE_SERIES = {
  data: [
    {
      name: '开发评审',
      x: 100,
      y: 300,
    },
    {
      name: '前端开发',
      x: 200,
      y: 300,
    },
    {
      name: '测试',
      x: 300,
      y: 300,
    },
  ],
  links: [
    {
      source: 0,
      target: 1,
    },
    {
      source: 1,
      target: 2,
    },
    {
      source: 2,
      target: 3,
    },
  ],
};

export const BE_SERIES = {
  data: [
    {
      name: '开发评审',
      x: 100,
      y: 300,
    },
    {
      name: '后端开发',
      x: 200,
      y: 300,
    },
    {
      name: '测试',
      x: 300,
      y: 300,
    },
  ],
  links: [
    {
      source: 0,
      target: 1,
    },
    {
      source: 1,
      target: 2,
    },
    {
      source: 2,
      target: 3,
    },
  ],
};

export const ALL_SERIES = {
  data: [
    {
      name: '需求内部评估',
      x: 100,
      y: 300,
    },
    {
      name: 'UI设计',
      x: 300,
      y: 250,
    },
    {
      name: '埋点设计及验收',
      x: 300,
      y: 350,
    },
    {
      name: '开发评审',
      x: 500,
      y: 300,
    },
    {
      name: 'server开发',
      x: 650,
      y: 250,
    },
    {
      name: '前端开发',
      x: 650,
      y: 350,
    },
    {
      name: 'QA验收',
      x: 800,
      y: 300,
    },
    {
      name: 'PM验收',
      x: 900,
      y: 300,
    },
  ],
  links: [
    {
      source: 0,
      target: 1,
    },
    {
      source: 0,
      target: 2,
    },
    {
      source: 1,
      target: 3,
    },
    {
      source: 2,
      target: 3,
    },
    {
      source: 3,
      target: 4,
    },
    {
      source: 3,
      target: 5,
    },
    {
      source: 4,
      target: 6,
    },
    {
      source: 5,
      target: 6,
    },
    {
      source: 6,
      target: 7,
    },
    {
      source: 7,
      target: 8,
    },
  ],
};
export const getOptions = (series: any) => {
  return {
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    textStyle: {
      color: '#000',
    },
    series: [
      {
        ...baseConfig,
        data: series.data.map((item) => ({
          ...item,
          symbolSize: 10, //节点的长和宽
          itemStyle: {
            normal: {
              color: '#1890ff',
            },
          },
          label: {
            position: 'bottom',
            distance: 10,
          },
        })),
        links: series.links,
      },
    ],
  };
};
