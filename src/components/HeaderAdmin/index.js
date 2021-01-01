import React, { useMemo, useState, useEffect } from 'react';
import { MdExitToApp, MdMenu, MdKeyboardBackspace } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import { signOut } from '../../store/module/auth/actions';

import Menu from './Menu';

import logo from '../../assets/logo3.png';

import { Container, BoxMenu } from './styles';

function HeaderAdmin() {
  const dispatch = useDispatch();
  const [viewMenu, setViewMenu] = useState(false);
  const [animation, setAnimation] = useState(0);

  useEffect(() => setAnimation(0), []);

  useMemo(() => {
    if (viewMenu) {
      setAnimation(1);
      console.tron.log(animation);
    } else {
      setAnimation(2);
      console.tron.log(animation);
    }
  }, [viewMenu, animation]);

  const renderMenu = useMemo(
    () => (
      <BoxMenu>
        <div
          style={{
            display: 'flex',
            width: viewMenu ? 280 : 30,
            justifyContent: 'flex-end',
            transition: '0.3s',
          }}
        >
          <button type="button" onClick={() => setViewMenu(!viewMenu)}>
            {viewMenu ? (
              <MdKeyboardBackspace color="#f0f0f0" size={30} />
            ) : (
              <MdMenu color="#f0f0f0" size={30} />
            )}
          </button>
        </div>
        <Menu
          animation={animation}
          view={viewMenu}
          close={() => setViewMenu(!viewMenu)}
        />
      </BoxMenu>
    ),
    [viewMenu, animation]
  );

  return (
    <Container>
      <div>
        {renderMenu}
        <img
          style={{
            marginLeft: viewMenu ? 300 : 50,
            transition: '0.3s',
          }}
          src={logo}
          alt="skyjob"
        />
      </div>

      <button
        className="close-button"
        type="button"
        onClick={() => dispatch(signOut())}
      >
        <MdExitToApp color="#f0f0f0" size={25} />
        <strong>Sair</strong>
      </button>
    </Container>
  );
}

export default HeaderAdmin;
