import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import Loader from '../../components/Loader';
import { actions as userActions } from '../../reducers/user';
import * as S from './styles';

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isFetching = useSelector(state => state.survey.isFetching);
  const [formRegister, setFormRegister] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (name, value) => {
    setFormRegister({ ...formRegister, [name]: value });
  };

  const onHandleSubmit = () => {
    const errors = [];
    if (!formRegister?.username) {
      errors.push('username');
    }
    if (!formRegister?.password) {
      errors.push('password');
    }
    if (errors.length) {
      toast.error(`Please fill the remaining empty fields: ${errors.join(', ')}`);
      return;
    }
    dispatch(userActions.registerRequest({ formRegister, history }));
  };

  return (
    <>
      {isFetching && <Loader />}
      <S.Box>
        <S.Title>Register</S.Title>
        <S.DivForm>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username (can be e-mail)"
                maxLength={50}
                value={formRegister.username}
                onChange={e => handleInputChange('username', e.currentTarget.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                maxLength={20}
                value={formRegister.password}
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

export default Register;
