import React, { useState } from 'react';
import { MdFilterList, MdDone } from 'react-icons/md';

import { Container, Content, Filters } from './styles';

function ComOperations() {
  const [opened, setOpened] = useState(true);
  const [bleed, setBleed] = useState(true);
  const [reinforcement, setReinforcement] = useState(true);
  const [closure, setClosure] = useState(true);

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
      </Content>
    </Container>
  );
}

export default ComOperations;
