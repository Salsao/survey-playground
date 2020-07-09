import React from 'react';

import hands from '../../assets/icons/hands.svg';
import * as S from './styles';

const Header = () => (
  <S.App>
    <img src={hands} alt="logo" />
    <S.LogoName>Survey Playground</S.LogoName>
  </S.App>
);

export default Header;
