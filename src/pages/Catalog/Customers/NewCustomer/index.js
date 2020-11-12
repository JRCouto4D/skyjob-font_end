import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdClear } from 'react-icons/md';

import history from '../../../../services/history';

import { Container, Modal, Content, ButtonActive } from './styles';

function NewCustomer({ location }) {
  if (location.state) console.tron.log(location.state.customer);

  const [active, setActive] = useState(true);

  return (
    <Container>
      <Modal>
        <button type="button" onClick={() => history.goBack()}>
          <MdClear size={25} color="#fff" />
        </button>

        <Content>
          <header>
            <h1>NOVO CLIENTE</h1>

            <div className="box-right">
              <strong>ATIVO</strong>
              <ButtonActive
                type="button"
                onClick={() => setActive(!active)}
                active={active}
              >
                <div>
                  <div>
                    <div />
                  </div>
                </div>
              </ButtonActive>
            </div>
          </header>
        </Content>
      </Modal>
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
