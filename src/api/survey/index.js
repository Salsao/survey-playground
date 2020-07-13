import API from '../index';

export const post = payload => API.post('/surveys', payload);

export const getOne = id => API.get(`/surveys/${id}`);
