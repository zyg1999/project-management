import request from './ajax';

export const getBugList = () => request.get('/bug/list');
