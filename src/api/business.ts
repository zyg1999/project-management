import request from './ajax';

type ListParams = {
  limit: number;
  offset: number;
};
export const getBusinessLine = (params: ListParams) => request.get('/api/business/list', params);

export const addBusinessLine = (name: string) =>
  request.post('/api/business/add', {
    name,
  });

export const delBusinessLine = (ids: number[]) =>
  request.post('/api/business/del', { business_id: ids });
