import * as React from 'react';
import { Card, Form, Input, Select, Button } from 'antd';
import { ReactEchartsCommon } from '@components/echart/index';

import styles from './index.less';

const FormItem = Form.Item;

const process = [
  '需求内部评估',
  'UI设计',
  '埋点设计及验收',
  '开发评审',
  'server开发',
  '前端开发',
  'QA验收',
  'PM验收',
];
export const CreateDemand: React.FC = () => {
  const option2 = {
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
        roam: false,
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
            name: '需求内部评估',
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
            name: 'UI设计',
            x: 300,
            y: 250,
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
            name: '埋点设计及验收',
            x: 300,
            y: 350,
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
            name: '开发评审',
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
            name: 'server开发',
            x: 650,
            y: 250,
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
            name: '前端开发',
            x: 650,
            y: 350,
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
            name: 'QA验收',
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
          {
            name: 'PM验收',
            x: 900,
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
      },
    ],
  };
  return (
    <Card title="新建需求">
      <Form layout="vertical">
        <FormItem label="需求名称" rules={[{ required: true, message: '请填写需求名称!' }]}>
          <Input placeholder="请填写需求名称" />
        </FormItem>
        <FormItem label="文档链接">
          <Input placeholder="请填写需求文档地址" />
        </FormItem>
        <FormItem label="优先级">
          <Select
            placeholder="请选择需求优先级"
            value={1}
            options={[
              { value: 1, label: '普通(p2)' },
              { value: 2, label: '紧急(p1)' },
              { value: 3, label: '非常紧急(p0)' },
            ]}
          />
        </FormItem>
        <FormItem label="备注">
          <Input placeholder="请填写备注" />
        </FormItem>
        <FormItem label="所属业务">
          <Select />
        </FormItem>
        <FormItem label="需求负责人">
          <Input readOnly disabled />
        </FormItem>
      </Form>
      <ReactEchartsCommon style={{ width: 1000, margin: '0 auto' }} option={option2} />
      <div className={styles.process}>
        {process.map((item, index) => (
          <div className={styles['process-item']} key={index}>
            <h4>{item}</h4>
            <Button style={{ padding: 0 }} type="link" size="small">
              设置负责人
            </Button>
            <div className={styles.action}>
              <Button style={{ padding: 0 }} type="link" size="small">
                设置排期
              </Button>
              <Button style={{ padding: 0 }} type="link" size="small">
                完成
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CreateDemand;
