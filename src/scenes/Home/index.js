import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { actions as surveyActions } from '../../reducers/survey';
import { actions as userActions } from '../../reducers/user';
import { SURVEYS_PATH, REGISTER_PATH, LOGIN_PATH } from '../../constants';
import * as S from './styles';

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const surveyAllIds = useSelector(state => state.survey.allIds);
  const surveyById = useSelector(state => state.survey.byId);
  const currentUser = useSelector(state => state.user);

  useEffect(() => {
    const onLoadPage = () => {
      dispatch(surveyActions.getAllRequest());
    };
    onLoadPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHandleLogout = () => {
    dispatch(userActions.logoutRequest());
  };

  return (
    <>
      <S.Div>
        <Button onClick={() => history.push(SURVEYS_PATH)}>Create new survey</Button>
      </S.Div>
      <S.SurveyList>
        {surveyAllIds?.map(surveyId => {
          const survey = surveyById[surveyId];
          return (
            <S.Box key={survey.id} onClick={() => history.push(`${SURVEYS_PATH}/${survey.id}`)}>
              {survey.title}
            </S.Box>
          );
        })}
      </S.SurveyList>
      <S.Div>
        {currentUser?.username ? (
          <Button onClick={onHandleLogout}>Logout</Button>
        ) : (
          <>
            <Button className="mr-20" onClick={() => history.push(LOGIN_PATH)}>
              Login
            </Button>
            <Button onClick={() => history.push(REGISTER_PATH)}>Register</Button>
          </>
        )}
      </S.Div>
    </>
  );
};

export default Home;
