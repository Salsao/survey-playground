import API from '../index';

export const post = payload => API.post('/users', payload);
