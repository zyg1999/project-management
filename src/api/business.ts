import request from './ajax';

export const getBusinessLine = () => request.get('/business_line/list');
