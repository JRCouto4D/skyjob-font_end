import React from 'react';

import { Wrapper, Content } from './styles';

function defaultLayout({ children }) {
  return (
    <>
      <Wrapper>
        <Content>{children}</Content>
      </Wrapper>
    </>
  );
}

export default defaultLayout;
