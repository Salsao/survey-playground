import React from 'react';

import loader from '../../assets/icons/loader.svg';
import * as S from './styles';

const Loader = () => (
  <S.Loader>
    <S.Gif src={loader} alt="loader" />
  </S.Loader>
);

export default Loader;
