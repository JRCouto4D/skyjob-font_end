import React from 'react';
import { Input, Form } from '@rocketseat/unform';
import { MdPerson, MdLock } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { signInRequest } from '../../store/module/auth/actions';

import { Container, InputBlock } from './styles';
import logo from '../../assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('* Preencha o campo com um email válido.')
    .required('* O email é obrigatorio.'),
  password: Yup.string().required('* A senha é obrigatória.'),
});

function SignIn() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <img src={logo} alt="SkyJob" />

      <Form schema={schema} onSubmit={handleSubmit}>
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

        <button type="submit">{loading ? 'Acessando...' : 'Acessar'}</button>
      </Form>
    </Container>
  );
}

export default SignIn;
