import request from './ajax';

export const getDemandList = () => request.get('/api/demand/list');
