import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function ContractForm({ location }) {
  const contract = location.state ? location.state.contract : null;
  if (contract) {
    console.tron.log(contract.type);
  }

  return (
    <Container>
      <h1>set contract</h1>
    </Container>
  );
}

export default ContractForm;

ContractForm.propTypes = {
  location: PropTypes.shape(),
};

ContractForm.defaultProps = {
  location: null,
};
