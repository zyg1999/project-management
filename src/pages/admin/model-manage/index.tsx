import * as React from 'react';
import { ReactEchartsCommon } from '@components/echart/index';
import { BE_SERIES, FE_SERIES, ALL_SERIES, getOptions } from '@constant/graph';
export const ModelManage = () => {
  return (
    <div>
      <h3>前端模版</h3>
      <ReactEchartsCommon style={{ width: 1000 }} option={getOptions(FE_SERIES)} />
      <h3>后端模版</h3>
      <ReactEchartsCommon style={{ width: 1000 }} option={getOptions(BE_SERIES)} />
      <h3>通用模版</h3>
      <ReactEchartsCommon style={{ width: 1000 }} option={getOptions(ALL_SERIES)} />
    </div>
  );
};

export default ModelManage;
