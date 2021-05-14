import request from './ajax';

export const getBugNum = (params: { type: number }) => request.get('/api/data/bug_num', params);

export const getDemand = () => request.get('/api/data/demand');
