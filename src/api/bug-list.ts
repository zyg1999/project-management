import request from './ajax';

export const getBugList = () => request.get('/api/bug/list');
