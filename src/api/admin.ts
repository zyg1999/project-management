import request from './ajax';

export const getPeopleList = () => request.get('/people/list');
