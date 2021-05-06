import request from './ajax';

type LoginParams = {
  phoneNumber: string;
  password: string;
};
export const login = (params: LoginParams) => request.post('/login', params);
