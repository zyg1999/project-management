import request from './ajax';

type PeopleParams = {
  name: string;
  pwd: string;
  phone: string;
  number: boolean;
  role_type: number;
};
export const addPeople = (params: PeopleParams) => request.post('/api/people/add', params);

type ListParams = {
  limit: number;
  offset: number;
};
export const getPeopleList = (params: ListParams) => request.get('/api/people/list', params);

export const delPeople = (params: { phone: string }) => request.post('/api/people/del', params);
