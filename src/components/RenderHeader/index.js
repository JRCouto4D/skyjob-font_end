import React from 'react';
import { useSelector } from 'react-redux';

import Header from '../Header';
import HeaderAdmin from '../HeaderAdmin';

import { Container } from './styles';

function RenderHeader() {
  const company = useSelector((state) => state.user.profile.company);

  return <Container>{company ? <Header /> : <HeaderAdmin />}</Container>;
}

export default RenderHeader;
