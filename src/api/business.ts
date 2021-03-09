import request from './ajax';

export const getBusinessLine = () => request.get('/get_business_line');
