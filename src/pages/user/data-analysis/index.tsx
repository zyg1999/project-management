import * as React from 'react';
import { ReactEchartsCommon } from '@components/echart/index';

export const Chart: React.FC = () => {
  const option = {
    title: {
      text: 'ECharts 入门示例',
    },
    tooltip: {},
    legend: {
      data: ['销量'],
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  };
  const option2 = {
    title: {
      text: '流程图',
      x: 'center',
      y: '20',
      textStyle: {
        fontWeight: 'normal',
      },
    },
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    textStyle: {
      color: '#000',
    },
    series: [
      {
        type: 'graph',
        layout: 'none',
        symbolSize: 10,
        roam: true,
        label: {
          normal: {
            show: true,
          },
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          normal: {
            textStyle: {
              fontSize: 12,
            },
          },
        },
        data: [
          {
            name: 'Start',
            x: 100,
            y: 300,
            symbolSize: 15, //节点的长和宽
            itemStyle: {
              normal: {
                color: '#1890ff',
              },
            },
            label: {
              position: 'bottom',
              distance: 10,
            },
          },
          {
            name: '签发',
            x: 200,
            y: 300,
            symbolSize: 15,
            itemStyle: {
              normal: {
                color: '#1890ff',
              },
            },
            label: {
              position: 'bottom',
              distance: 10,
            },
          },
          {
            name: '单专业会签',
            x: 400,
            y: 400,
            symbolSize: 15,
            itemStyle: {
              normal: {
                color: '#1890ff',
              },
            },
            label: {
              position: 'bottom',
              distance: 10,
            },
          },
          {
            name: '运行接收',
            x: 400,
            y: 300,
            symbolSize: 15,
            itemStyle: {
              normal: {
                color: '#1890ff',
              },
            },
            label: {
              position: 'bottom',
              distance: 10,
            },
          },
          {
            name: '运行班许可',
            x: 500,
            y: 300,
            symbolSize: 15,
            itemStyle: {
              normal: {
                color: '#1890ff',
              },
            },
            label: {
              position: 'bottom',
              distance: 10,
            },
          },
          {
            name: '运行执行',
            x: 600,
            y: 300,
            symbolSize: 15,
            itemStyle: {
              normal: {
                color: '#1890ff',
              },
            },
            label: {
              position: 'bottom',
              distance: 10,
            },
          },
          {
            name: '运行终结工作票',
            x: 700,
            y: 300,
            symbolSize: 15,
            itemStyle: {
              normal: {
                color: '#1890ff',
              },
            },
            label: {
              position: 'bottom',
              distance: 10,
            },
          },
          {
            name: 'END',
            x: 800,
            y: 300,
            symbolSize: 15,
            itemStyle: {
              normal: {
                color: '#1890ff',
              },
            },
            label: {
              position: 'bottom',
              distance: 10,
            },
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
            source: 1,
            target: 3,
          },
          {
            source: 3,
            target: 4,
          },
          {
            source: 3,
            target: 4,
          },
          {
            source: 4,
            target: 5,
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
      },
    ],
  };

  return (
    <>
      <ReactEchartsCommon style={{ width: 400 }} option={option} />
      <ReactEchartsCommon style={{ width: 800 }} option={option2} />
    </>
  );
};

export default Chart;
