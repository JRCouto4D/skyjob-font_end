import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '@rocketseat/unform';

import left from '../../assets/left.png';
import right from '../../assets/right.png';

import { formatPrice } from '../../util/format';

import { Container } from './styles';

function Payment1() {
  const { total } = useSelector((state) => state.saleData.dataSale);

  const [output, setOutput] = useState(formatPrice(total) || formatPrice(0));
  const [change, setChange] = useState('R$0,00');
  const [inputFucus, setInputFucus] = useState(false);

  const inputOutput = document.getElementById('output');

  function calcPayment() {
    const result = output - total;
    setInputFucus(false);
    setChange(formatPrice(result));
    setOutput(formatPrice(output));
  }

  return (
    <Container inputFucus={inputFucus}>
      <strong>VALOR PAGO</strong>

      <div className="box-money">
        <div className="money-block">
          <Input
            type={inputFucus ? 'number' : 'text'}
            id="output"
            name="output"
            onChange={(e) => setOutput(e.target.value)}
            onKeyPress={(e) => {
              const key = e.which || e.keyCode;

              if (key === 13) {
                calcPayment();
                inputOutput.blur();
              }
            }}
            value={output}
            onFocus={() => {
              setInputFucus(true);
              setOutput('');
            }}
            onBlur={() => {
              if (inputFucus === false) {
                calcPayment();
              }
            }}
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
            type="text"
            id="change"
            name="change"
            onChange={(e) => setOutput(e.target.value)}
            placeholder="R$0,00"
            disabled
            value={change}
          />
        </div>
      </div>
    </Container>
  );
}

export default Payment1;
