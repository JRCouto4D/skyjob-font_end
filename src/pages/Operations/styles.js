import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  padding: 10px;

  nav {
    position: absolute;
  }

  main {
    width: 80%;
    position: absolute;
  }
`;

export const BoxWaterMark = styled.div`
  position: absolute;
  height: 65%;
  right: 100px;
  margin-top: 50px;

  img {
    position: relative;
    height: 100%;
  }
`;
