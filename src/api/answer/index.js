import API from '../index';

export const post = payload => API.post('/answers', payload);

export const putOne = payload => API.put(`/answers/${payload.id}`, payload);

export const getOne = id => API.get(`/answers/${id}`);

export const getAll = id => API.get(`/answers?surveyId=${id}`);
