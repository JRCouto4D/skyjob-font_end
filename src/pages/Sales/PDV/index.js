import React from 'react';
import { useSelector } from 'react-redux';

import OpenPDV from '../../../components/Open_point-sale';
import BoxPDV from '../../../components/Box_point-sale';
import StartSale from './StartSale';

import { Container } from './styles';

function PDV() {
  const { open, pdv } = useSelector((state) => state.statusPDV);
  const { company } = useSelector((state) => state.user.profile);

  return (
    <Container>
      {open && pdv.company_id === company.id ? (
        <BoxPDV poup>
          <StartSale />
        </BoxPDV>
      ) : (
        <OpenPDV />
      )}
    </Container>
  );
}

export default PDV;
