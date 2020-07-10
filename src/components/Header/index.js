import React from 'react';
import { useHistory } from 'react-router-dom';

import { HOME_PATH } from '../../constants';
import hands from '../../assets/icons/hands.svg';
import * as S from './styles';

const Header = () => {
  const history = useHistory();
  return (
    <S.App onClick={() => history.push(HOME_PATH)}>
      <img src={hands} alt="logo" />
      <S.LogoName>Survey Playground</S.LogoName>
    </S.App>
  );
};

export default Header;
