const NAME = 'USER';

export const types = {
  REGISTER_REQUEST: `${NAME}/REGISTER_REQUEST`,
  SET: `${NAME}/SET`,
  ERROR: `${NAME}/ERROR`
};

export const actions = {
  registerRequest: payload => ({ type: types.REGISTER_REQUEST, payload }),
  set: payload => ({ type: types.SET, payload }),
  error: payload => ({ type: types.ERROR, payload })
};

const initialState = {
  user: '',
  isFetching: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.REGISTER_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.SET:
      return {
        ...state,
        ...payload,
        isFetching: false
      };
    case types.ERROR: {
      return {
        ...state,
        ...payload,
        isFetching: false
      };
    }
    default:
      return state;
  }
};
