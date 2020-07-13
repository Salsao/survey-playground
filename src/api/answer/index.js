import API from '../index';

export const post = payload => API.post('/answers', payload);

export const getAll = id => API.get(`/answers?surveyId=${id}`);
