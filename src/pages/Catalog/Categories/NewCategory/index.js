import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdClear } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import api from '../../../../services/api';
import history from '../../../../services/history';
import { Container, Modal, Content, ButtonActive } from './styles';

function NewCategory({ location }) {
  const { company } = useSelector((state) => state.user.profile);
  const [active, setActive] = useState(true);

  async function handleSubmit(data) {
    if (data.name === '') {
      toast.error('A descrição da categoria é obrigatoria');
      return;
    }

    if (location.state) {
      try {
        api.put(
          `/company/${company.id}/categories/${location.state.category.id}/update`,
          data
        );

        toast.success('Categoria editada com sucesso!');
        history.push('/categories');
      } catch (err) {
        toast.error('Algo deu errado, por favor tente mais tarde.');
        history.push('/categories');
      }
    } else {
      try {
        api.post(`/company/${company.id}/categories`, data);

        toast.success('Categoria cadastrada com sucesso!');
        history.push('/categories');
      } catch (err) {
        toast.error('Algo deu errado, por favor tente mais tarde.');
        history.push('/categories');
      }
    }
  }

  return (
    <Container>
      <Modal>
        <Link to="/categories">
          <MdClear size={25} color="#fff" />
        </Link>

        <Content>
          <header>
            <h1>NOVA CATEGORIA</h1>

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
              initialData={location.state && location.state.category}
              onSubmit={handleSubmit}
            >
              <div className="input-block">
                <strong>DESCRIÇÃO</strong>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nome da categoria a ser cadastrada"
                  autoCapitalize="off"
                  autoComplete="off"
                />
              </div>

              <button type="submit">SALVAR</button>
            </Form>
          </main>
        </Content>
      </Modal>
    </Container>
  );
}

export default NewCategory;

NewCategory.propTypes = {
  location: PropTypes.shape(),
};

NewCategory.defaultProps = {
  location: null,
};
