import API from '../index';

export const post = payload => API.post('/surveys', payload);

export const getAll = () => API.get('/surveys');

export const getOne = id => API.get(`/surveys/${id}`);

export const putOne = payload => API.put(`/surveys/${payload.id}`, payload);
