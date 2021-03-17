import request from './ajax';

export const getPeopleList = () => request.get('/get_people_list');
