import React from 'react';
import { useSelector } from 'react-redux';
import { MdContacts, MdEmail, MdPhone } from 'react-icons/md';

import logo from '../../assets/logo2.png';

import { Container, BoxRight, BoxLeft, BoxContacts } from './styles';

function Footer() {
  const company = useSelector((state) => state.user.profile.company);

  return (
    <div>
      {company && (
        <Container>
          <img src={logo} alt="" />

          <BoxRight>
            <BoxLeft>
              <MdContacts color="#FFF" size={25} />
              <h2>CONTATOS</h2>
            </BoxLeft>

            <div />

            <BoxContacts>
              <div>
                <MdEmail color="#fff" size={15} />
                <span>skyjob@email.com</span>
              </div>
              <div>
                <MdPhone color="#fff" size={15} />
                <span>(77) 98120-0675</span>
              </div>
            </BoxContacts>
          </BoxRight>
        </Container>
      )}
    </div>
  );
}

export default Footer;
