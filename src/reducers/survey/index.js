const NAME = 'SURVEY';

export const types = {
  CREATE_REQUEST: `${NAME}/CREATE_REQUEST`,
  CREATE: `${NAME}/CREATE`,
  GET_REQUEST: `${NAME}/GET_REQUEST`,
  SET: `${NAME}/SET`,
  POST_ANSWER_REQUEST: `${NAME}/POST_ANSWER_REQUEST`,
  ERROR: `${NAME}/ERROR`
};

export const actions = {
  createRequest: payload => ({ type: types.CREATE_REQUEST, payload }),
  create: payload => ({ type: types.CREATE, payload }),
  getRequest: payload => ({ type: types.GET_REQUEST, payload }),
  set: payload => ({ type: types.SET, payload }),
  postAnswerRequest: payload => ({ type: types.POST_ANSWER_REQUEST, payload }),
  error: payload => ({ type: types.ERROR, payload })
};

const initialState = {
  allIds: [],
  byId: {},
  isFetching: false,
  error: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_REQUEST:
    case types.GET_REQUEST:
    case types.POST_ANSWER_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: {}
      };
    case types.CREATE:
      return {
        ...state,
        allIds: [...new Set([...state.allIds, payload.id])],
        byId: { ...state.byId, [payload.id]: payload },
        isFetching: false
      };
    case types.SET:
      return {
        ...state,
        allIds: [...new Set([...state.allIds, payload.id])],
        byId: { ...state.byId, [payload.id]: payload },
        isFetching: false
      };
    case types.ERROR: {
      return {
        ...state,
        error: payload,
        isFetching: false
      };
    }
    default:
      return state;
  }
};
