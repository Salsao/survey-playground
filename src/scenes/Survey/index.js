import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../components/Loader';
import { actions as surveyActions } from '../../reducers/survey';
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

  return (
    <>
      {isFetching && <Loader />}
      <S.Box>
        <S.Title>{survey?.title}</S.Title>
        {survey?.description}
        {survey?.options.map((option) => (
          <Fragment key={option.id}>{option.answer}</Fragment>
        ))}
        Share with your friends: {window.location.href}
      </S.Box>
    </>
  );
};

export default Survey;
