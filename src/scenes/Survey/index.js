import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

import Loader from '../../components/Loader';
import { actions as surveyActions } from '../../reducers/survey';
import copy from '../../assets/icons/copy.svg';
import * as S from './styles';

const Survey = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const survey = useSelector((state) => state.survey.byId[id]);
  const isFetching = useSelector((state) => state.survey.isFetching);

  useEffect(() => {
    const onLoadPage = () => {
      dispatch(surveyActions.getRequest(id));
    };
    onLoadPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHandleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Copied!');
  };

  return (
    <>
      {isFetching && <Loader />}
      <S.Box>
        <S.Title>{survey?.title}</S.Title>
        <S.Description>{survey?.description}</S.Description>
        <Form>
          {survey?.options.map((option) => (
            <Form.Check type="radio" name="surveyAnswer" label={option.answer} key={option.id} />
          ))}
          <S.DivSubmit>
            <Button variant="success" type="button" onClick={() => console.log('submit')}>
              Submit
            </Button>
          </S.DivSubmit>
        </Form>
        <S.DivShare>
          Share with your friends: {window.location.href}{' '}
          <S.CopyIcon src={copy} width="15" height="15" alt="copy" onClick={onHandleCopy} />
        </S.DivShare>
      </S.Box>
    </>
  );
};

export default Survey;
