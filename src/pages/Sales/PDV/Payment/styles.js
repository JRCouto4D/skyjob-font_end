import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  min-width: 900px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const BoxLeft = styled.div`
  background: #fff;
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 15px;
`;

export const Content = styled.div``;

export const Footer = styled.div`
  width: 100%;

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: #8bc53d;
    width: 100%;
    height: 45px;
    border-radius: 4px;
    border: none;

    :hover {
      background: ${darken(0.08, '#8bc53d')};
    }

    strong {
      font-size: 18px;
      color: #fff;
      margin-right: 10px;
    }

    svg {
      margin-top: -4px;
    }
  }
`;

export const BoxRight = styled.div`
  width: 30%;
  height: 100%;
`;
