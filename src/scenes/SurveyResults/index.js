import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar';

import Loader from '../../components/Loader';
import { actions as surveyActions } from '../../reducers/survey';
import { actions as answerActions } from '../../reducers/answer';
import * as S from './styles';

const SurveyResults = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const survey = useSelector(state => state.survey.byId[id]);
  const surveyError = useSelector(state => state.survey.error);
  const isFetching = useSelector(state => state.survey.isFetching);
  const answers = useSelector(state => state.answer.byId[id]);

  useEffect(() => {
    const onLoadPage = () => {
      dispatch(surveyActions.getRequest(id));
      dispatch(answerActions.getRequest(id));
    };
    onLoadPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (surveyError?.message) {
    return (
      <S.Box>
        <S.Title>{surveyError.message}</S.Title>
      </S.Box>
    );
  }

  return (
    <>
      {isFetching && <Loader />}
      <S.Box>
        <S.Title>{survey?.title}</S.Title>
        <S.Description>{survey?.description}</S.Description>
        <S.Votes>{answers?.length || 0} votes</S.Votes>
        {answers?.length > 0 && (
          <Form>
            {survey?.options.map((option, index) => {
              const percentage = (
                (answers?.filter(answer => answer.answer === option.id).length * 100) /
                answers?.length
              ).toFixed(2);
              return (
                <S.DivProgress key={option.id}>
                  <ProgressBar className={`progress-bar-${index + 1}`} striped label={`${percentage}%`} now={percentage} />
                </S.DivProgress>
              );
            })}
          </Form>
        )}
      </S.Box>
    </>
  );
};

export default SurveyResults;
