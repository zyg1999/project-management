import request from './ajax';

export const getDemandList = () => request.get('/demand/list');
