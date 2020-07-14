import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import Loader from '../../components/Loader';
import { actions as userActions } from '../../reducers/user';
import * as S from './styles';
import { LOGIN_PATH } from '../../constants';

const Auth = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_PATH;
  const isFetching = useSelector(state => state.survey.isFetching);
  const [formAuth, setFormAuth] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (name, value) => {
    setFormAuth({ ...formAuth, [name]: value });
  };

  const onHandleSubmit = () => {
    const errors = [];
    if (!formAuth?.username) {
      errors.push('username');
    }
    if (!formAuth?.password) {
      errors.push('password');
    }
    if (errors.length) {
      toast.error(`Please fill the remaining empty fields: ${errors.join(', ')}`);
      return;
    }
    if (isLogin) {
      dispatch(userActions.loginRequest({ formAuth, history }));
    } else {
      dispatch(userActions.registerRequest({ formAuth, history }));
    }
  };

  return (
    <>
      {isFetching && <Loader />}
      <S.Box>
        <S.Title>{isLogin ? 'Login' : 'Register'}</S.Title>
        <S.DivForm>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username (can be e-mail)"
                maxLength={50}
                value={formAuth.username}
                onChange={e => handleInputChange('username', e.currentTarget.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                maxLength={20}
                value={formAuth.password}
                onChange={e => handleInputChange('password', e.currentTarget.value)}
              />
            </Form.Group>
            <S.DivSubmit>
              <Button variant="success" type="button" onClick={onHandleSubmit}>
                Submit
              </Button>
            </S.DivSubmit>
          </Form>
        </S.DivForm>
      </S.Box>
    </>
  );
};

export default Auth;
