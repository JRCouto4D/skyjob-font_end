import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function NewProviders({ location }) {
  console.tron.log(location.state.item);

  return (
    <Container>
      <h1>Providers</h1>
    </Container>
  );
}

export default NewProviders;

NewProviders.propTypes = {
  location: PropTypes.shape(),
};

NewProviders.defaultProps = {
  location: null,
};
