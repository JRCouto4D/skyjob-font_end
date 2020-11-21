/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';

import BoxPDV from '../../components/Box_point-sale';
import Menu from '../../components/Operations/Menu';

import LisSales from '../../components/Operations/ListSales';
import Bleed from '../../components/Operations/Bleed';
import Reinforcement from '../../components/Operations/Reinforcement';
import Closure from '../../components/Operations/Closure';
import ComOperations from '../../components/Operations/ComOperations';

import waterMark1 from '../../assets/img2.png';
import waterMark2 from '../../assets/img1.png';
import waterMark3 from '../../assets/img3.png';
import waterMark4 from '../../assets/img4.png';

import { Container, Content, BoxWaterMark } from './styles';

function Operations() {
  const [valueMenu, setValueMenu] = useState(0);

  return (
    <Container>
      <BoxPDV poup={false}>
        <Content>
          <BoxWaterMark>
            <img
              src={
                valueMenu === 0
                  ? waterMark1
                  : valueMenu === 1
                  ? waterMark2
                  : valueMenu === 2
                  ? waterMark2
                  : valueMenu === 3
                  ? waterMark3
                  : waterMark4
              }
              alt="waterMark"
            />
          </BoxWaterMark>

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
