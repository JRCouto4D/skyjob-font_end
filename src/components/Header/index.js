import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MdAddCircleOutline,
  MdExitToApp,
  MdReply,
  MdSwapHoriz,
  MdAttachMoney,
} from 'react-icons/md';
import { useDispatch } from 'react-redux';

import { signOut } from '../../store/module/auth/actions';

import logo from '../../assets/logo.png';
import {
  Container,
  ButtonMenu,
  LinkHome,
  BoxCatalog,
  BoxSales,
} from './styles';

function Header() {
  const [home, setHome] = useState(true);
  const [catalog, setCatalog] = useState(false);
  const [sales, setSales] = useState(false);

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [popup, setPopup] = useState(false);
  const [popup2, setPopup2] = useState(false);

  function togglePopUp(e) {
    setPopup(!popup);
    setCoords({
      x: e.nativeEvent.clientX,
      y: e.nativeEvent.clientY,
    });
  }

  function togglePopUp2(e) {
    setPopup2(!popup2);
    setCoords({
      x: e.nativeEvent.clientX,
      y: e.nativeEvent.clientY,
    });
  }

  function close() {
    setPopup(false);
    setPopup2(false);
  }

  function handleSetColor(pop) {
    if (pop === 1) {
      setHome(true);
      setCatalog(false);
      setSales(false);
    }

    if (pop === 2) {
      setHome(false);
      setCatalog(true);
      setSales(false);
    }

    if (pop === 3) {
      setHome(false);
      setCatalog(false);
      setSales(true);
    }
  }

  const dispatch = useDispatch();

  return (
    <Container>
      <div>
        <img src={logo} alt="skyjob" />

        <nav>
          <ul>
            <li setColor={home}>
              <LinkHome
                onClick={() => {
                  close();
                  handleSetColor(1);
                }}
                to="/main"
                setColor={home}
              >
                INÍCIO
              </LinkHome>
            </li>
            <li>
              <ButtonMenu
                type="button"
                setColor={catalog}
                onClick={(e) => togglePopUp(e)}
              >
                CATÁLOGO
              </ButtonMenu>
            </li>
            <li>
              <ButtonMenu
                onClick={(e) => togglePopUp2(e)}
                type="button"
                setColor={sales}
              >
                VENDAS
              </ButtonMenu>
            </li>
          </ul>
        </nav>

        <BoxCatalog visible={popup} coords={coords}>
          <li>
            <Link
              onClick={() => {
                close();
                handleSetColor(2);
              }}
              to="/products"
            >
              PRODUTOS
            </Link>
            <MdAddCircleOutline color="#fff" size={25} />
          </li>
          <li>
            <Link
              onClick={() => {
                close();
                handleSetColor(2);
              }}
              to="/categories"
            >
              CATEGORIAS
            </Link>
            <MdAddCircleOutline color="#fff" size={25} />
          </li>
          <li>
            <Link
              onClick={() => {
                close();
                handleSetColor(2);
              }}
              to="/providers"
            >
              FORNECEDORES
            </Link>
            <MdAddCircleOutline color="#fff" size={25} />
          </li>
          <li>
            <Link
              onClick={() => {
                close();
                handleSetColor(2);
              }}
              to="/customers"
            >
              CLIENTES
            </Link>
            <MdAddCircleOutline color="#fff" size={25} />
          </li>
        </BoxCatalog>

        <BoxSales visible={popup2} coords={coords}>
          <li>
            <Link
              onClick={() => {
                close();
                handleSetColor(3);
              }}
              to="/pdv"
            >
              PONTO DE VENDAS
            </Link>
            <MdSwapHoriz color="#fff" size={25} />
          </li>
          <li>
            <Link
              onClick={() => {
                close();
                handleSetColor(3);
              }}
              to="/budgets"
            >
              ORÇAMENTOS
            </Link>
            <MdAttachMoney color="#fff" size={25} />
          </li>
          <li>
            <Link
              onClick={() => {
                close();
                handleSetColor(3);
              }}
              to="/returns"
            >
              DEVOLUÇÕES
            </Link>
            <MdReply color="#fff" size={25} />
          </li>
        </BoxSales>
      </div>

      <button type="button" onClick={() => dispatch(signOut())}>
        <MdExitToApp color="#FF1E40" size={25} />
        <strong>Sair</strong>
      </button>
    </Container>
  );
}

export default Header;
