import React from 'react';
import { Input } from '@rocketseat/unform';
import { MdForward } from 'react-icons/md';

import left from '../../../assets/left.png';

import { Container, Content } from './styles';

function Bleed() {
  return (
    <Container>
      <Content>
        <header />
        <footer>
          <div className="box-body">
            <div className="box-left">
              <strong>VALOR EM DINHEIRO</strong>
              <div className="box-input">
                <strong>R$</strong>
                <Input
                  type="number"
                  id="money"
                  name="money"
                  placeholder="0.00"
                />
              </div>
            </div>

            <img src={left} alt="left" />

            <div className="box-label">
              <strong>SANGRIA DO CAIXA</strong>
              <span>DIGITE O VALOR QUE SERÁ RETIRADO DO CAIXA</span>
            </div>
          </div>

          <button type="button" onClick={() => {}}>
            <MdForward size={45} color="#fff" />
            <strong>CONFIMAR SANGRIA</strong>
          </button>
        </footer>
      </Content>
    </Container>
  );
}

export default Bleed;
