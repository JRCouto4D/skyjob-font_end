import React, { useState } from 'react';
import { Input } from '@rocketseat/unform';

import left from '../../assets/left.png';
import right from '../../assets/right.png';

import { Container } from './styles';

function Payment1() {
  const [output, setOutput] = useState(0);

  return (
    <Container>
      <strong>VALOR PAGO</strong>

      <div className="box-money">
        <div className="money-block">
          <Input
            type="number"
            id="output"
            name="output"
            onChange={(e) => setOutput(e.target.value)}
            value={output}
            placeholder="R$0,00"
          />

          <img src={left} alt="left" />

          <div className="box-right">
            <div className="box-string">
              <strong>VALOR PAGO EM DINHEIRO</strong>
              <span>INFORME O VALOR RECEBIDO EM DINHEIRO</span>
            </div>
          </div>
        </div>

        <div className="money-block">
          <div className="box-right">
            <div className="box-string">
              <strong>VALOR DO TROCO EM DINHEIRO</strong>
              <span>ESTE É O VALOR À SER PASSADO AO CLIENTE</span>
            </div>
          </div>

          <img src={right} alt="left" />

          <Input
            type="number"
            id="change"
            name="change"
            onChange={(e) => setOutput(e.target.value)}
            placeholder="R$0,00"
            disabled
            value={20}
          />
        </div>
      </div>
    </Container>
  );
}

export default Payment1;
