import request from './ajax';

type AddParams = {
  title: string;
  node_id: string;
  mode_id: number;
  link: string;
  note?: string;
  business_id: string;
  user_id: string;
  info: any[];
};

export const addDemand = (params: AddParams) => request.post('/api/demand/add', params);

type Params = {
  limit: number;
  offset: number;
  phone: string;
};
export const myDemandList = (params: Params) => request.get('/api/demand/my_list', params);

type ListParams = {
  limit: number;
  offset: number;
  is_all: boolean;
  status?: number;
  phone: string;
};
export const demandList = (params: ListParams) => request.get('/api/demand/list', params);

type TimeParams = {
  demand_id: number;
  start_time: number;
  end_time: number;
  item_id: number;
  user_id: string;
};
export const setDemandTime = (params: TimeParams) => request.post('/api/demand/set_time', params);

type Solve = {
  demand_id: number;
  item_id: number;
  user_id: string;
};
export const sloveDemand = (params: Solve) => request.post('/api/demand/solve', params);

type Detail = {
  demand_id: number;
};
export const getDemandDetail = (params: Detail) => request.get('/api/demand/detail', params);

type Item = {
  item_id: number;
  demand_id: number;
  user_id: string;
  user_name: string;
};
export const modifyItem = (params: Item) => request.post('/api/demand/item', params);

export const demandPool = () => request.get('/api/demand/pool_list');
