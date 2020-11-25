import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Wrapper, Content } from './styles';

function deafultLayout({ children }) {
  return (
    <Wrapper>
      <Content>{children}</Content>
      <Header />
      <Footer />
    </Wrapper>
  );
}

export default deafultLayout;

deafultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
