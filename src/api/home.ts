import request from './ajax';

export const getDemandList = () => request.get('/get_demand_list');
