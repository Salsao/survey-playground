import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { toast } from 'react-toastify';

import Loader from '../../components/Loader';
import { actions as surveyActions } from '../../reducers/survey';
import { actions as answerActions } from '../../reducers/answer';
import { SURVEYS_PATH } from '../../constants';
import copy from '../../assets/icons/copy.svg';
import * as S from './styles';

const Survey = () => {
  const dispatch = useDispatch();
  const { id, answerId } = useParams();
  const history = useHistory();
  const survey = useSelector(state => state.survey.byId[id]);
  const surveyError = useSelector(state => state.survey.error);
  const isFetching = useSelector(state => state.survey.isFetching);
  const answered = useSelector(state => state.answer.answered);
  const answer = useSelector(state => state.answer.byId[answerId]);
  const [formAnswer, setFormAnswer] = useState('');
  const [editAnswer, setEditAnswer] = useState(false);

  useEffect(() => {
    const onLoadPage = () => {
      dispatch(surveyActions.getRequest(id));
      if (answerId) {
        dispatch(answerActions.getOneRequest(answerId));
      }
    };
    onLoadPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onLoadAnswer = () => {
      setFormAnswer(answer?.answer);
    };
    onLoadAnswer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer]);

  const onHandleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Copied!');
  };

  const onHandleSubmit = () => {
    if (!formAnswer) {
      toast.error('Please fill the survey with your answer');
      return;
    }
    if (answerId) {
      dispatch(answerActions.updateRequest({ answer: formAnswer, id: answerId }));
    } else {
      dispatch(answerActions.createRequest({ answer: formAnswer, surveyId: parseInt(id, 10) }));
    }
    setEditAnswer(false);
  };

  const onHandleEdit = () => {
    history.push(`${SURVEYS_PATH}/${id}/results/${answered}`);
    setEditAnswer(true);
  };

  if (surveyError?.message) {
    return (
      <S.Box>
        <S.Title>{surveyError.message}</S.Title>
      </S.Box>
    );
  }

  if (answered && !editAnswer) {
    return (
      <S.Box>
        <S.Title>Thanks for the answer!</S.Title>
        <S.EditAnswerContainer onClick={onHandleEdit}>Edit answer</S.EditAnswerContainer>
      </S.Box>
    );
  }

  return (
    <>
      {isFetching && <Loader />}
      <S.Box>
        <S.Title>{survey?.title}</S.Title>
        <S.Description>{survey?.description}</S.Description>
        <Form>
          {survey?.options.map(option => (
            <Form.Check
              key={option.id}
              type="radio"
              name="surveyAnswer"
              label={option.answer}
              checked={formAnswer === option.id}
              onChange={() => setFormAnswer(option.id)}
            />
          ))}
          <S.DivSubmit>
            <Button variant="success" type="button" onClick={onHandleSubmit}>
              Submit
            </Button>
          </S.DivSubmit>
        </Form>
        {!answerId && (
          <S.DivShare>
            <S.ShareContainer>
              <S.SpanShare>Share with your friends:</S.SpanShare> {window.location.href}{' '}
              <OverlayTrigger placement="top" overlay={<Tooltip>Copy to your clipboard!</Tooltip>}>
                <S.CopyIcon src={copy} width="15" height="15" alt="copy" onClick={onHandleCopy} />
              </OverlayTrigger>
            </S.ShareContainer>
            <S.LinksContainer>
              <S.LinkSpan onClick={() => history.push(`${SURVEYS_PATH}/${id}/results`)}>Results</S.LinkSpan>
              <S.LinkSpan onClick={() => history.push(`${SURVEYS_PATH}/${id}/edit`)}>Edit</S.LinkSpan>
            </S.LinksContainer>
          </S.DivShare>
        )}
      </S.Box>
    </>
  );
};

export default Survey;
