import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { MdClear } from 'react-icons/md';

import api from '../../../../services/api';
import history from '../../../../services/history';

import { Container, Modal, Content, ButtonActive } from './styles';

function NewProviders({ location }) {
  const { company } = useSelector((state) => state.user.profile);

  const [active, setActive] = useState(
    location.state ? location.state.item.active : true
  );

  async function handleSubmit(data) {
    if (data.name === '') {
      toast.error('O nome do fornecedor é obrigatório');
    }

    if (location.state) {
      try {
        await api.put(
          `/company/${company.id}/providers/${location.state.item.id}/update`,
          data
        );
        toast.success('Fornecedor aditado com sucesso!');
        history.push('/providers');
      } catch (err) {
        toast.error('Algo deu errado, por vafor tente mais tarde');
        history.push('/providers');
      }
    } else {
      try {
        await api.post(`/company/${company.id}/providers`, data);
        toast.success('Fornecedor cadastrado com sucesso!');
        history.push('/providers');
      } catch (err) {
        toast.error('Algo deu errado, por vafor tente mais tarde');
        history.push('/providers');
      }
    }
  }

  return (
    <Container>
      <Modal>
        <Link to="/providers">
          <MdClear size={25} color="#fff" />
        </Link>

        <Content>
          <header>
            <h1>NOVO FORNECEDOR</h1>

            <div>
              <div>
                <strong>ATIVO</strong>
                <ButtonActive
                  active={active}
                  type="button"
                  onClick={() => setActive(!active)}
                >
                  <div>
                    <div>
                      <div />
                    </div>
                  </div>
                </ButtonActive>
              </div>
            </div>
          </header>

          <main>
            <Form
              initialData={location.state && location.state.item}
              onSubmit={handleSubmit}
            >
              <div className="block-line1">
                <div className="input-block">
                  <strong>NOME</strong>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nome do fornecedor"
                    autoCapitalize="off"
                    autoComplete="off"
                  />
                </div>

                <div className="input-block">
                  <strong>REPRESENTANTE</strong>
                  <Input
                    type="text"
                    id="representative"
                    name="representative"
                    placeholder="Nome do represetante"
                    autoCapitalize="off"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="block-line2">
                <div className="input-block">
                  <strong>EMAIL</strong>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="ex: fornecedor@email.com"
                    autoCapitalize="off"
                    autoComplete="off"
                  />
                </div>

                <div className="input-block">
                  <strong>TELEFONE 1</strong>
                  <Input
                    type="text"
                    id="telophone"
                    name="telephone"
                    placeholder="ex: (77) 98120-0675"
                    autoCapitalize="off"
                    autoComplete="off"
                  />
                </div>

                <div className="input-block">
                  <strong>TELEFONE 2</strong>
                  <Input
                    type="text"
                    id="cell_phone"
                    name="cell_phone"
                    placeholder="ex: (77) 98120-0675"
                    autoCapitalize="off"
                    autoComplete="off"
                  />
                </div>
              </div>

              <button type="submit">SALVAR</button>
            </Form>
          </main>
        </Content>
      </Modal>
    </Container>
  );
}

export default NewProviders;

NewProviders.propTypes = {
  location: PropTypes.shape(),
};

NewProviders.defaultProps = {
  location: null,
};
