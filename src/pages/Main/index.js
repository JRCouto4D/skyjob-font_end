import React from 'react';
import { useSelector } from 'react-redux';

import CompanyHomePage from '../../components/CompanyHomePage';
import AdminHomePage from '../../components/AdminHomePage';

import { Container } from './styles';

function Main() {
  const company = useSelector((state) => state.user.profile.company);

  return (
    <Container>{company ? <CompanyHomePage /> : <AdminHomePage />}</Container>
  );
}

export default Main;
