import API from '../index';

export const post = (payload) => API.post('/surveys', payload);