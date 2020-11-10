import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function NewCustomer({ location }) {
  if (location.state) {
    console.tron.log(location.state.customer);
  }
  return (
    <Container>
      <h1>New Customer</h1>
    </Container>
  );
}

export default NewCustomer;

NewCustomer.propTypes = {
  location: PropTypes.shape(),
};

NewCustomer.defaultProps = {
  location: null,
};
