import request from './ajax';

export const getBugList = () => request.get('/get_bug_list');
