import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdMoreHoriz } from 'react-icons/md';

import { Container, ActionList } from './styles';

function ActionsPopUp({ children }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [popup, setPopup] = useState(false);

  function close() {
    setPopup(false);
  }

  function togglePopUp(e) {
    setPopup(!popup);
    setCoords({
      x: e.nativeEvent.clientX,
      y: e.nativeEvent.clientY,
    });
  }

  return (
    <Container>
      <button
        type="button"
        onClick={(e) => {
          close();
          togglePopUp(e);
        }}
      >
        <MdMoreHoriz color="#666" size={20} />
      </button>
      <ActionList onClick={close} visible={popup} coords={coords}>
        {children}
      </ActionList>
    </Container>
  );
}

export default ActionsPopUp;

ActionsPopUp.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

ActionsPopUp.defaultProps = {
  children: null,
};
