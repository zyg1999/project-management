import * as React from 'react';
import cs from 'classnames';
import dayjs from 'dayjs';
import { Card, Form, Input, Select, Button, DatePicker, message } from 'antd';
import { ReactEchartsCommon } from '@components/echart/index';
import { getBusinessLine } from '@api/business';
import { BE_SERIES, FE_SERIES, ALL_SERIES, getOptions } from '@constant/graph';
import { getPeopleList } from '@api/people';
import { addDemand, getDemandDetail, modifyItem, setDemandTime, sloveDemand } from '@api/demand';
import { DEMAND_PRIORITY } from '@constant/index';
import { GetRequest as getUrlparams } from '@utils/util';
import styles from './index.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

export const CreateDemand: React.FC = () => {
  const [businessList, setBusList] = React.useState();
  const [peopleList, setPeopleList] = React.useState();
  const [process, setInfo] = React.useState<any[]>([]);
  const [form] = Form.useForm();
  const [modelId, setModelId] = React.useState(3);

  const [isRead, setIsRead] = React.useState<boolean>();

  React.useEffect(() => {
    getBusinessLine({ limit: 0, offset: 0 }).then((res) => {
      setBusList(
        res.business.map((item) => ({ value: item.business_id, label: item.business_name }))
      );
    });
    const id = getUrlparams()?.id;
    setIsRead(Boolean(id));
    if (!id) {
      return;
    }
    getDemandDetail({
      demand_id: id,
    }).then((res) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { info, model_id, user_id, ...init } = res;
      setInfo(info);
      setModelId(model_id);
      form.setFieldsValue(init);
    });
  }, []);

  React.useEffect(() => {
    getPeopleList({ limit: 0, offset: 0 }).then((res) => {
      setPeopleList(
        res?.user.map((item) => ({ value: item.phone_number, label: item.name })) || []
      );
    });
  }, []);

  const handleModelChange = (val: number) => {
    setModelId(val);
  };
  const name = localStorage.getItem('name');
  const phone = localStorage.getItem('phone');

  React.useEffect(() => {
    if (isRead) {
      return;
    }
    setInfo([FE_SERIES, BE_SERIES, ALL_SERIES][modelId - 1]?.data);
  }, [modelId, isRead]);

  const handleUserChange = React.useCallback(
    (val, index) => {
      if (isRead) {
        // 只读说明是修改操作
        modifyItem({
          item_id: index + 1,
          demand_id: Number(getUrlparams()?.id || 0),
          user_id: val.value,
          user_name: val.label,
        }).then(() => {
          message.success('修改负责人成功');
        });
      }
      process[index] = {
        ...process[index],
        user_name: val.label,
        info_user_id: val.value,
      };

      setInfo([...process]);
    },
    [isRead, process]
  );

  const handleDateChange = React.useCallback(
    (date, index) => {
      if (isRead) {
        if (!process[index].info_user_id) {
          message.error('请先设负责人');
          return;
        }
        setDemandTime({
          item_id: index + 1,
          demand_id: Number(getUrlparams()?.id || 0),
          user_id: process[index].info_user_id || '',
          start_time: new Date(date[0]).getTime(),
          end_time: new Date(date[1]).getTime(),
        }).then(() => {
          message.success('时间修改成功！');
        });
      }
      process[index] = {
        ...process[index],
        start_time: new Date(date[0]).getTime(),
        end_time: new Date(date[1]).getTime(),
      };
      setInfo([...process]);
    },
    [isRead, process]
  );

  const handleItemSovle = React.useCallback(
    (id, index) => () => {
      if (index > 0 && process[index - 1].status === 1) {
        message.error('前置流程还未完成！');
        return;
      }
      sloveDemand({
        demand_id: Number(getUrlparams()?.id || 0),
        item_id: id,
        user_id: phone,
      }).then(() => {
        message.success('操作成功！');
        process[index] = {
          ...process[index],
          status: 2,
        };
        setInfo([...process]);
      });
    },
    [process]
  );
  const handleCreate = React.useCallback(() => {
    form
      .validateFields()
      .then((values) => {
        const info = process.map((item, index) => ({
          ...item,
          title: item.name,
          item_id: index + 1,
          status: item.status ? item.status : 1,
        }));
        const params = {
          ...values,
          model_id: modelId,
          user_id: phone,
          info,
        };
        addDemand(params).then(() => {
          message.success('创建成功');
          window.location.replace(`${window.location.origin}/user/create-demand`);
        });
      })
      .catch((err) => {
        console.log(err, 'err');
      });
  }, [process]);
  return (
    <Card title={`${isRead ? '需求详情' : '新建需求'}`}>
      <Form layout="vertical" form={form} initialValues={{ user_id: name }}>
        <FormItem
          label="需求名称"
          name="name"
          rules={[{ required: true, message: '请填写需求名称!' }]}
        >
          <Input placeholder="请填写需求名称" disabled={isRead} />
        </FormItem>
        <FormItem label="文档链接" name="link" required>
          <Input placeholder="请填写需求文档地址" disabled={isRead} />
        </FormItem>
        <FormItem label="优先级" name="priority_status" required>
          <Select placeholder="请选择需求优先级" options={DEMAND_PRIORITY} disabled={isRead} />
        </FormItem>
        <FormItem label="备注" name="note">
          <Input placeholder="请填写备注" disabled={isRead} />
        </FormItem>
        <FormItem label="所属业务" name="business_id" required>
          <Select options={businessList} placeholder="请选择所属业务线" disabled={isRead} />
        </FormItem>
        <FormItem label="需求负责人" name="user_id">
          <Input disabled />
        </FormItem>
      </Form>
      <div>
        切换模版：
        <Select value={modelId} onChange={handleModelChange} disabled={isRead}>
          <Select.Option value={1}>前端独立模版</Select.Option>
          <Select.Option value={2}>后端独立模版</Select.Option>
          <Select.Option value={3}>全流程模版</Select.Option>
        </Select>
      </div>
      {process && (
        <ReactEchartsCommon
          style={{ width: 1000, margin: '0 auto' }}
          option={getOptions([FE_SERIES, BE_SERIES, ALL_SERIES][modelId - 1], process)}
        />
      )}
      <div className={styles.process}>
        {process?.map((item, index) => (
          <div className={styles['process-item']} key={index}>
            {item.status === 2 && (
              <>
                <div className={styles.solved}>已完成</div>
                <div className={styles['card-mask']} />
              </>
            )}

            <h4>{item?.name || item?.title}</h4>
            {item.info_user_id ? (
              <div className={styles.name}>
                <span>{item.user_name}</span>
                {item.status === 1 && (
                  <i
                    className={cs('iconfont iconclose', styles.close)}
                    onClick={() => {
                      process[index] = { ...process[index], user_name: '', info_user_id: '' };
                      setInfo([...process]);
                    }}
                  />
                )}
              </div>
            ) : (
              <Select
                defaultValue={item.user_phone}
                placeholder="选择负责人"
                options={peopleList}
                size="small"
                style={{ width: 120 }}
                allowClear
                labelInValue
                onChange={(val) => handleUserChange(val, index)}
              />
            )}

            <div className={styles.action}>
              {item.start_time ? (
                <div className={styles.name}>
                  <span>
                    {dayjs(item.start_time).format('YYYY-MM-DD')}~
                    {dayjs(item.end_time).format('YYYY-MM-DD')}
                  </span>
                  {item.status === 1 && (
                    <i
                      className={cs('iconfont iconclose', styles.close)}
                      onClick={() => {
                        process[index] = { ...process[index], start_time: '', end_time: '' };
                        setInfo([...process]);
                      }}
                    />
                  )}
                </div>
              ) : (
                <RangePicker
                  size="small"
                  suffixIcon={null}
                  disabled={!process[index].info_user_id}
                  onChange={(date) => handleDateChange(date, index)}
                  placeholder={['设置开始时间', '设置结束时间']}
                />
              )}
            </div>
            {item.info_user_id === phone && item.status === 1 && (
              <Button
                style={{ padding: 0, marginTop: 10 }}
                type="link"
                size="small"
                onClick={handleItemSovle(item.item_id, index)}
              >
                完成
              </Button>
            )}
          </div>
        ))}
      </div>
      {!isRead && (
        <Button className={styles.btn} type="primary" onClick={handleCreate}>
          确认创建
        </Button>
      )}
    </Card>
  );
};

export default CreateDemand;
