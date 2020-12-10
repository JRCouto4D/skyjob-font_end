import React, { useState, useMemo } from 'react';
import { parseISO, format } from 'date-fns';
import { MdFilterList, MdDone } from 'react-icons/md';

import { formatPrice } from '../../../util/format';

import { Container, Content, Filters, TableOperations } from './styles';

function ComOperations() {
  const [opened, setOpened] = useState(false);
  const [bleed, setBleed] = useState(true);
  const [reinforcement, setReinforcement] = useState(true);
  const [closure, setClosure] = useState(true);
  const operations = [];

  function handleOptions(op) {
    switch (op) {
      case 1: {
        setOpened(!opened);
        break;
      }

      case 2: {
        setBleed(!bleed);
        break;
      }

      case 3: {
        setReinforcement(!reinforcement);
        break;
      }

      case 4: {
        setClosure(!closure);
        break;
      }
      default:
    }
  }

  function setStyle(op) {
    if (op === 1) {
      return (
        <div
          style={{
            background: '#BAD2FF',
            border: 1,
            borderColor: '#DFF0DF',
            borderRadius: 50,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: 130,
            height: 27,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              background: '#4D85EE',
              borderRadius: 50,
            }}
          />
          <strong
            style={{
              fontSize: 14,
              color: '#4D85EE',
              marginLeft: 5,
              fontWeight: 'bold',
            }}
          >
            ABERTURA
          </strong>
        </div>
      );
    }

    if (op === 2) {
      return (
        <div
          style={{
            background: '#FAB0B0',
            borderRadius: 50,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: 130,
            height: 27,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              background: '#DE3B3B',
              borderRadius: 50,
            }}
          />
          <strong
            style={{
              fontSize: 14,
              color: '#DE3B3B',
              marginLeft: 5,
              fontWeight: 'bold',
            }}
          >
            SANGRIA
          </strong>
        </div>
      );
    }

    if (op === 3) {
      return (
        <div
          style={{
            background: '#DFF0DF',
            border: 1,
            borderColor: '#DFF0DF',
            borderRadius: 50,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: 130,
            height: 27,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              background: '#2CA42B',
              borderRadius: 50,
            }}
          />
          <strong
            style={{
              fontSize: 14,
              color: '#2CA42B',
              marginLeft: 5,
              fontWeight: 'bold',
            }}
          >
            REFORÇO
          </strong>
        </div>
      );
    }

    if (op === 4) {
      return (
        <div
          style={{
            background: '#F0F0DF',
            border: 1,
            borderColor: '#DFF0DF',
            borderRadius: 50,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: 130,
            height: 27,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              background: '#C1BC35',
              borderRadius: 50,
            }}
          />
          <strong
            style={{
              fontSize: 14,
              color: '#C1BC35',
              marginLeft: 5,
              fontWeight: 'bold',
            }}
          >
            FECHAMENTO
          </strong>
        </div>
      );
    }

    return this;
  }

  const tableMemo = useMemo(
    () => (
      <TableOperations>
        <li className="table-header">
          <strong style={{ marginLeft: 5 }}>OPERAÇÃO</strong>
          <strong>HORÁRIO</strong>
          <strong>VALOR (R$)</strong>
        </li>

        <div className="result-table">
          {operations.length >= 1 ? (
            operations.map((op) => (
              <li>
                <div>{setStyle(op.operation)}</div>
                <strong>{format(parseISO(op.hour), "HH:mm 'hs'")}</strong>
                <strong>{formatPrice(op.value)}</strong>
              </li>
            ))
          ) : (
            <div
              style={{
                width: 658,
                height: 245,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <strong
                style={{
                  fontSize: 30,
                  color: '#ccc',
                }}
              >
                NENHUM RESULTADO
              </strong>
            </div>
          )}
        </div>
      </TableOperations>
    ),
    [operations]
  );

  return (
    <Container>
      <Content>
        <Filters>
          <MdFilterList color="#fff" size={30} />

          <div className="box-options">
            <div className="option-block">
              <button
                type="button"
                className="option-button"
                onClick={() => handleOptions(1)}
              >
                <div className="option-container">
                  {opened && (
                    <div className="option-content">
                      <MdDone color="#fff" size={12} />
                    </div>
                  )}
                </div>

                <strong>ABERTURA</strong>
              </button>
            </div>

            <div className="option-block">
              <button
                type="button"
                className="option-button"
                onClick={() => handleOptions(2)}
              >
                <div className="option-container">
                  {bleed && (
                    <div className="option-content">
                      <MdDone color="#fff" size={12} />
                    </div>
                  )}
                </div>

                <strong>SANGRIA</strong>
              </button>
            </div>

            <div className="option-block">
              <button
                type="button"
                className="option-button"
                onClick={() => handleOptions(3)}
              >
                <div className="option-container">
                  {reinforcement && (
                    <div className="option-content">
                      <MdDone color="#fff" size={12} />
                    </div>
                  )}
                </div>

                <strong>REFORÇO</strong>
              </button>
            </div>

            <div className="option-block">
              <button
                type="button"
                className="option-button"
                onClick={() => handleOptions(4)}
              >
                <div className="option-container">
                  {closure && (
                    <div className="option-content">
                      <MdDone color="#fff" size={12} />
                    </div>
                  )}
                </div>

                <strong>FECHAMENTO</strong>
              </button>
            </div>
          </div>
        </Filters>
        {tableMemo}
      </Content>
    </Container>
  );
}

export default ComOperations;
