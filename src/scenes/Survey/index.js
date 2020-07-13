import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
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
  const [formAnswer, setFormAnswer] = useState('');

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

  const onHandleSubmit = () => {
    if (!formAnswer) {
      toast.error('Please fill the survey with your answer');
      return;
    }
    // dispatch(surveyActions.postAnswerRequest(id));
  };

  return (
    <>
      {isFetching && <Loader />}
      <S.Box>
        <S.Title>{survey?.title}</S.Title>
        <S.Description>{survey?.description}</S.Description>
        <Form>
          {survey?.options.map((option) => (
            <Form.Check
              type="radio"
              name="surveyAnswer"
              label={option.answer}
              key={option.id}
              onChange={() => setFormAnswer(option.id)}
            />
          ))}
          <S.DivSubmit>
            <Button variant="success" type="button" onClick={onHandleSubmit}>
              Submit
            </Button>
          </S.DivSubmit>
        </Form>
        <S.DivShare>
          <S.SpanShare>Share with your friends:</S.SpanShare> {window.location.href}{' '}
          <OverlayTrigger placement="top" overlay={<Tooltip>Copy to your clipboard!</Tooltip>}>
            <S.CopyIcon src={copy} width="15" height="15" alt="copy" onClick={onHandleCopy} />
          </OverlayTrigger>
        </S.DivShare>
      </S.Box>
    </>
  );
};

export default Survey;
