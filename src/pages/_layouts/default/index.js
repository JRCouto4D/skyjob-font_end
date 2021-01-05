import React from 'react';
import PropTypes from 'prop-types';

import RenderHeader from '../../../components/RenderHeader';
import { Wrapper, Content } from './styles';

function deafultLayout({ children }) {
  return (
    <Wrapper>
      <RenderHeader />
      <Content>{children}</Content>
    </Wrapper>
  );
}

export default deafultLayout;

deafultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
