const NAME = 'USER';

export const types = {
  REGISTER_REQUEST: `${NAME}/REGISTER_REQUEST`,
  SET: `${NAME}/SET`,
  LOGIN_REQUEST: `${NAME}/LOGIN_REQUEST`,
  LOGOUT_REQUEST: `${NAME}/LOGOUT_REQUEST`,
  LOGOUT: `${NAME}/LOGOUT`,
  ERROR: `${NAME}/ERROR`
};

export const actions = {
  registerRequest: payload => ({ type: types.REGISTER_REQUEST, payload }),
  set: payload => ({ type: types.SET, payload }),
  loginRequest: payload => ({ type: types.LOGIN_REQUEST, payload }),
  logoutRequest: payload => ({ type: types.LOGOUT_REQUEST, payload }),
  logout: payload => ({ type: types.LOGOUT, payload }),
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
    case types.LOGIN_REQUEST:
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
    case types.LOGOUT:
      return initialState;
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
