const NAME = 'ANSWER';

export const types = {
  CREATE_REQUEST: `${NAME}/CREATE_REQUEST`,
  CREATE: `${NAME}/CREATE`,
  GET_REQUEST: `${NAME}/GET_REQUEST`,
  GET_ONE_REQUEST: `${NAME}/GET_ONE_REQUEST`,
  SET: `${NAME}/SET`,
  SET_ONE: `${NAME}/SET_ONE`,
  UPDATE_REQUEST: `${NAME}/UPDATE_REQUEST`,
  ERROR: `${NAME}/ERROR`
};

export const actions = {
  createRequest: payload => ({ type: types.CREATE_REQUEST, payload }),
  create: payload => ({ type: types.CREATE, payload }),
  getRequest: payload => ({ type: types.GET_REQUEST, payload }),
  getOneRequest: payload => ({ type: types.GET_ONE_REQUEST, payload }),
  set: payload => ({ type: types.SET, payload }),
  setOne: payload => ({ type: types.SET_ONE, payload }),
  updateRequest: payload => ({ type: types.UPDATE_REQUEST, payload }),
  error: payload => ({ type: types.ERROR, payload })
};

const initialState = {
  allIds: [],
  byId: {},
  answered: false,
  isFetching: false,
  error: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_REQUEST:
    case types.GET_REQUEST:
    case types.GET_ONE_REQUEST:
    case types.UPDATE_REQUEST:
      return {
        ...state,
        isFetching: true,
        answered: false,
        error: {}
      };
    case types.CREATE:
      return {
        ...state,
        allIds: [...new Set([...state.allIds, payload.id])],
        byId: { ...state.byId, [payload.id]: payload },
        answered: payload.id,
        isFetching: false
      };
    case types.SET:
      return {
        ...state,
        allIds: [...new Set([...state.allIds, payload.id])],
        byId: { ...state.byId, [payload[0]?.surveyId]: payload },
        isFetching: false
      };
    case types.SET_ONE:
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
