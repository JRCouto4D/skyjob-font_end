import styled from 'styled-components';

export const Container = styled.div``;

export const Modal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  a {
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

export const Content = styled.div``;
