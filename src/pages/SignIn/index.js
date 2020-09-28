import React from 'react';
import { Input, Form } from '@rocketseat/unform';
import { MdPerson, MdLock } from 'react-icons/md';
import logo from '../../assets/logo.png';

import { Container, InputBlock } from './styles';

function SignIn() {
  return (
    <Container>
      <img src={logo} alt="SkyJob" />

      <Form onSubmit={() => {}}>
        <InputBlock>
          <MdPerson color="#cb0000" size={20} />
          <Input
            name="email"
            type="email"
            placeholder="Digite seu email"
            autoComplete="off"
          />
        </InputBlock>
        <InputBlock>
          <MdLock color="#cb0000" size={20} />
          <Input
            name="password"
            type="password"
            placeholder="Sua senha secreta"
          />
        </InputBlock>

        <button type="submit">Acessar</button>
      </Form>
    </Container>
  );
}

export default SignIn;
