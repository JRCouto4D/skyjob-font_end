import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Wrapper, Content } from './styles';

export default function authLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Wrapper>
  );
}

authLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
