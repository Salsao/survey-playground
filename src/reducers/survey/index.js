const NAME = 'SURVEY';

export const types = {
  CREATE_REQUEST: `${NAME}/CREATE_REQUEST`,
  CREATE: `${NAME}/CREATE`,
  ERROR: `${NAME}/ERROR`,
};

export const actions = {
  createRequest: (payload) => ({ type: types.CREATE_REQUEST, payload }),
  create: (payload) => ({ type: types.CREATE, payload }),
  error: (payload) => ({ type: types.ERROR, payload }),
};

const initialState = {
  allIds: [],
  byId: {},
  isFetching: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.CREATE:
      return {
        ...state,
        allIds: [...state.allIds, payload.allIds],
        byId: { ...state.byId, [payload.allIds]: payload.byId },
        isFetching: false,
      };
    case types.ERROR: {
      return {
        ...state,
        ...payload,
        isFetching: false,
      };
    }
    default:
      return state;
  }
};
