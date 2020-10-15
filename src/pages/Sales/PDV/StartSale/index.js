import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

function StartSale() {
  return (
    <Container>
      <header>
        <h1>CAIXA ABERTO</h1>
        <span>PRÓXIMO CLIENTE</span>
      </header>

      <Link to="/pdv/selling">INICIAR VENDA</Link>
    </Container>
  );
}

export default StartSale;
