import React from 'react';
import { useSelector } from 'react-redux';

import CompanyHomePage from '../../components/CompanyHomePage';

import { Container } from './styles';

function Main() {
  const company = useSelector((state) => state.user.profile.company);

  return (
    <Container>{company ? <CompanyHomePage /> : <h1>Admin</h1>}</Container>
  );
}

export default Main;
