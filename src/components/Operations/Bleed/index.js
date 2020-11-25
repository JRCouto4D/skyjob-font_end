import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { MdForward } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';

import api from '../../../services/api';
import history from '../../../services/history';

import { formatPrice } from '../../../util/format';

import left from '../../../assets/left.png';

import { Container, Content, Loading } from './styles';

function Bleed() {
  const { pdv } = useSelector((state) => state.statusPDV);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [inputData, setInputData] = useState('');

  async function handleSubmit() {
    try {
      if (inputData === '') {
        toast.error('O VALOR À SER RETIRADO DO CAIXA É OBRIGATÓRIO');
        setErr(true);
        const inputMoney = document.getElementById('money');
        const boxInput = document.getElementById('box-input');
        inputMoney.focus();
        boxInput.style.borderColor = '#FF1E40';
        return;
      }

      setLoading(true);

      await api.post('/point_sales/bleed', {
        point_sale_id: pdv.id,
        cash_value: inputData,
      });

      toast.success('OPERAÇÃO REALIZADA COM SUCESSO!');
      setInputData('');
      setLoading(false);
    } catch (erro) {
      toast.error(`ALGO DEU ERRADO, POR FAVOR TENTE MAIS TARDE. ERRO: ${erro}`);
      history.push('/operations');
    }
  }

  function handleBleed() {
    confirmAlert({
      title: 'CONFIRMAR SANGRIA',
      message: `DESEJA REALMENTE CONFIRMAR A RETIRADA DE ${formatPrice(
        inputData
      )} NO CAIXA ${pdv.cash_register.description}?`,
      buttons: [
        {
          label: 'SIM',
          onClick: async () => {
            handleSubmit();
          },
        },
        {
          label: 'NÃO',
          onClick: () => {},
        },
      ],
    });
  }

  return (
    <Container>
      <Content>
        <header />
        <footer>
          <div className="box-body">
            <div className="box-left">
              {err ? (
                <strong style={{ color: '#FF1E40' }}>
                  VALOR EM DINHEIRO *
                </strong>
              ) : (
                <strong>VALOR EM DINHEIRO</strong>
              )}
              <div className="box-input" id="box-input" name="box-input">
                <strong>R$</strong>
                <Input
                  type="number"
                  id="money"
                  name="money"
                  placeholder="0.00"
                  value={inputData}
                  onChange={(e) => {
                    setInputData(e.target.value);
                    setErr(false);
                    const boxInput = document.getElementById('box-input');
                    boxInput.style.borderColor = '#ccc';
                  }}
                />
              </div>
            </div>

            <img src={left} alt="left" />

            <div className="box-label">
              <strong>SANGRIA DO CAIXA</strong>
              <span>DIGITE O VALOR QUE SERÁ RETIRADO DO CAIXA</span>
            </div>
          </div>

          <button type="button" onClick={handleBleed}>
            {loading ? (
              <Loading>
                <FaSpinner color="#fff" size={20} />
              </Loading>
            ) : (
              <>
                <MdForward size={45} color="#fff" />
                <strong>CONFIMAR SANGRIA</strong>
              </>
            )}
          </button>
        </footer>
      </Content>
    </Container>
  );
}

export default Bleed;
