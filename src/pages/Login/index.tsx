import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import { login } from '@api/login';
import styles from './index.less';

interface InitProp {
  history: any;
}
function Login(props: InitProp) {
  const [phone, setUserPhone] = useState<string>('18329968200');
  const [password, setPassword] = useState<string>('123');

  /**
   * @desc 提交登陆
   */
  const handleSubmit = () => {
    login({
      phoneNumber: phone,
      password,
    }).then((res) => {
      const { token = '' } = res;
      const info = JSON.parse(window.atob(token));
      const { history } = props;
      if (info?.role === 1) {
        history.push('/admin');
      } else {
        history.push('/user');
      }
      localStorage.setItem('authorized_token', token);
      localStorage.setItem('phone', info?.phoneNumber);
    });
  };

  return (
    <div className={styles.loginWrap} onKeyDown={(e) => e.keyCode === 13 && handleSubmit()}>
      <div className={styles.formDom}>
        <div className={styles.formLeft}>
          <i />
          <div>
            <p>企业项目管理</p>
            <p>高效、清晰</p>
          </div>
        </div>
        <div className={styles.formRight}>
          <div>
            <h3>登陆</h3>
            <Input
              defaultValue={phone}
              prefix={<UserOutlined className={styles.iconDom} />}
              className={styles.inputDom}
              onChange={(e) => setUserPhone(e.target.value)}
              placeholder="请输入手机号"
            />
            <Input
              defaultValue={password}
              prefix={<LockOutlined className={styles.iconDom} />}
              className={styles.inputDom}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
            />
            <Button type="primary" className={styles.btnDom} onClick={() => handleSubmit()}>
              登陆
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
