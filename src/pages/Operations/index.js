/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';

import BoxPDV from '../../components/Box_point-sale';
import Menu from '../../components/Operations/Menu';

import LisSales from '../../components/Operations/ListSales';
import Bleed from '../../components/Operations/Bleed';
import Reinforcement from '../../components/Operations/Reinforcement';
import Closure from '../../components/Operations/Closure';
import ComOperations from '../../components/Operations/ComOperations';

import { Container, Content } from './styles';

function Operations() {
  const [valueMenu, setValueMenu] = useState(0);

  return (
    <Container>
      <BoxPDV poup={false}>
        <Content>
          <nav>
            <Menu
              handleListSales={() => setValueMenu(0)}
              handleBleed={() => setValueMenu(1)}
              handleReinforcement={() => setValueMenu(2)}
              handleClosure={() => setValueMenu(3)}
              handleOperations={() => setValueMenu(4)}
            />
          </nav>
          <main>
            {valueMenu === 0 ? (
              <LisSales />
            ) : valueMenu === 1 ? (
              <Bleed />
            ) : valueMenu === 2 ? (
              <Reinforcement />
            ) : valueMenu === 3 ? (
              <Closure />
            ) : (
              <ComOperations />
            )}
          </main>
        </Content>
      </BoxPDV>
    </Container>
  );
}

export default Operations;
