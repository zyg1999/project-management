import * as React from 'react';
import dayjs from 'dayjs';
import { Card } from 'antd';
import { ReactEchartsCommon } from '@components/echart/index';
import { BUGTYPE, RESOLUTION } from '@constant/index';
import { getBugNum, getDemand } from '@api/data';
import styles from './index.less';

export const Chart: React.FC = () => {
  const [option, setOp] = React.useState({
    color: '#4c7beb',
    legend: {
      data: ['数量统计'],
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    xAxis: {
      data: ['T-6', 'T-5', 'T-4', 'T-3', 'T-2', 'T-1'],
    },
    yAxis: {},
    series: [
      {
        name: '数据',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  });

  const [bugTypeOption, setBugTypeOption] = React.useState({});

  const [resolutionOption, setResolut] = React.useState({});

  React.useEffect(() => {
    getBugNum({
      type: 1,
    }).then((res) => {
      const data = BUGTYPE.map((item) => {
        if (res[item.value]) {
          return { name: item.label, value: res[item.value] };
        }
        return { name: item.label, value: undefined };
      });
      setBugTypeOption({
        color: ['#4c7beb', '#ff995a', '#fa595c', '#aa73ee', '#58dada', '#54cc46'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'horizontal',
          data: BUGTYPE.map((item) => item.label),
        },
        series: [
          {
            name: 'Bug类型数',
            type: 'pie',
            radius: ['50%', '70%'],
            data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      });
    });
    getBugNum({
      type: 2,
    }).then((res) => {
      const data = RESOLUTION.map((item) => {
        if (res[item.value]) {
          return { name: item.label, value: res[item.value] };
        }
        return { name: item.label, value: undefined };
      });
      setResolut({
        color: ['#4c7beb', '#ff995a', '#fa595c', '#aa73ee', '#58dada', '#54cc46'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'horizontal',
          data: RESOLUTION.map((item) => item.label),
        },
        series: [
          {
            name: 'Bug 解决方案类型数',
            type: 'pie',
            radius: ['50%', '70%'],
            data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      });
    });
    getDemand().then((res) => {
      setOp({
        color: '#4c7beb',
        legend: {
          data: ['数量统计'],
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        xAxis: {
          data: ['T-7', 'T-6', 'T-5', 'T-4', 'T-3', 'T-2', 'T-1'],
        },
        yAxis: {},
        series: [
          {
            name: '数据',
            type: 'bar',
            data: Object.values(res),
          },
        ],
      });
    });
  }, []);
  return (
    <div className={styles.wrapper}>
      {option && (
        <Card>
          <h3>需求统计</h3>
          <ReactEchartsCommon style={{ width: 600 }} option={option} />
        </Card>
      )}
      {bugTypeOption && (
        <Card>
          <h3>Bug类型看板</h3>
          <ReactEchartsCommon style={{ width: 600 }} option={bugTypeOption} />
        </Card>
      )}
      {resolutionOption && (
        <Card>
          <h3>Bug解决方案看板</h3>
          <ReactEchartsCommon style={{ width: 600 }} option={resolutionOption} />
        </Card>
      )}
    </div>
  );
};

export default Chart;
