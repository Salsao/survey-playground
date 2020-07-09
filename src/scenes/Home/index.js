import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { SURVEYS_PATH } from '../../constants';
import * as S from './styles';

const Home = () => {
  const history = useHistory();
  return (
    <>
      <S.Div>
        <Button onClick={() => history.push(SURVEYS_PATH)}>Create new survey</Button>
      </S.Div>
    </>
  );
};

export default Home;
