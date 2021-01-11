import React from 'react';
import { Spin } from 'antd';

const DelayLoading = ({ pastDelay, error }) => {
  if (pastDelay) {
    // 加载时间大于 pastDelay（默认 200ms）,目前设置为 3000ms,则显示 Loading...
    return  <div
    style={{
      width: '100%',
      height: '90vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Spin />
  </div>;
  } else if (error) {
    // 加载错误时的提示模块
    return <div>Sorry, there was a problem loading the page.</div>;
  } else {
    // 加载时间短于 pastDelay（默认 200ms）,目前设置为 3000ms,则不显示 Loading...
    return null;
  }
};

export default DelayLoading;
