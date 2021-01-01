import React, { useState } from 'react';
import { Input, Form } from '@rocketseat/unform';
import { MdPerson, MdLock } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import {
  signInRequest,
  signInCompanyRequest,
} from '../../store/module/auth/actions';

import logo from '../../assets/logo.png';
import logo3 from '../../assets/logo3.png';

import {
  Container,
  Content,
  BoxLeft,
  BoxRight,
  BoxSignIn,
  Loading,
} from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('* Preencha o campo com um email válido.')
    .required('* O email é obrigatorio.'),
  password: Yup.string().required('* A senha é obrigatória.'),
});

function SignIn() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [signInCompany, setSignInCompany] = useState(true);
  const [signInAdmin, setSignInAdmin] = useState(false);

  function handleSubmit({ email, password }) {
    if (signInCompany && !signInAdmin) {
      dispatch(signInRequest(email, password));
    }

    if (signInAdmin && !signInCompany) {
      dispatch(signInCompanyRequest(email, password));
    }
  }

  return (
    <Container>
      <Content>
        <BoxLeft>
          <header>
            <div>
              <button
                type="button"
                onClick={() => {
                  setSignInCompany(true);
                  setSignInAdmin(false);

                  const input = document.getElementById('email');
                  input.focus();
                }}
              >
                <strong>EMPRESA</strong>
              </button>
              {signInCompany && (
                <div
                  style={{
                    width: '100%',
                    height: 3,
                    background: '#666',
                  }}
                />
              )}
            </div>
            <div className="box-button-admin">
              <button
                type="button"
                onClick={() => {
                  setSignInCompany(false);
                  setSignInAdmin(true);

                  const input = document.getElementById('email');
                  input.focus();
                }}
              >
                <strong>ADMIN</strong>
              </button>
              {signInAdmin && (
                <div
                  style={{
                    width: '100%',
                    height: 3,
                    background: '#666',
                  }}
                />
              )}
            </div>
          </header>

          <BoxSignIn>
            <Form schema={schema} onSubmit={handleSubmit}>
              <div className="input-block">
                <MdPerson color="rgba(255, 255, 255, 0.4)" size={20} />
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="email da empresa"
                  autoCapitalize="off"
                  autoComplete="off"
                />
              </div>

              <div className="input-block">
                <MdLock color="rgba(255, 255, 255, 0.4)" size={20} />
                <Input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="senha"
                />
              </div>

              <div className="box-label">
                <Link to="/">Esqueci minha senha</Link>

                <button type="submit">
                  {loading ? (
                    <Loading>
                      <FaSpinner color="#ddd" size={20} />
                    </Loading>
                  ) : (
                    <strong>ENTRAR</strong>
                  )}
                </button>
              </div>
            </Form>
          </BoxSignIn>
        </BoxLeft>
        <BoxRight>
          <img src={logo} alt="logo" />

          <span>
            INFORME SEU USUÁRIO E SENHA PARA ACESSAR A CONTA DE SUA EMPRESA NO
            SKYJOB.
          </span>
        </BoxRight>
      </Content>
      <footer>
        <img src={logo3} alt="logo3" />
        <span> © by Jefferson Couto | wave: Tks to SkyJob</span>
      </footer>
    </Container>
  );
}

export default SignIn;
