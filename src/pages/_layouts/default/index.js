import React from 'react';
import PropTypes from 'prop-types';

import RenderHeader from '../../../components/RenderHeader';
import Footer from '../../../components/Footer';
import { Wrapper, Content } from './styles';

function deafultLayout({ children }) {
  return (
    <Wrapper>
      <RenderHeader />
      <Footer />
      <Content>{children}</Content>
    </Wrapper>
  );
}

export default deafultLayout;

deafultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
