/* eslint-disable no-nested-ternary */
import styled, { keyframes } from 'styled-components';

const animationContainer0 = keyframes`
  from{
    transform: translateX(0);
  }

  to{
    transform: translateX(280px);
  }
`;

const animationContainer1 = keyframes`
  from{
    transform: translateX(0);
  }

  to{
    transform: translateX(-290px);
  }
`;

const animationContainer2 = keyframes`
  from{
    transform: translateX(0);
  }

  to{
    transform: translateX(0);
  }
`;

export const Content = styled.div`
  width: 280px;
  height: calc(100vh - 40px);
  background: #292929;
  margin-top: 35px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  box-sizing: border-box;
  left: ${(props) => (props.view || props.poup === 0 ? '-290px' : '-10px')};
  animation: ${(props) =>
      props.poup === 0
        ? animationContainer2
        : props.poup === 1
        ? animationContainer0
        : props.poup === 2 && animationContainer1}
    0.3s forwards;

  nav {
    width: 100%;

    button {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 45px;
      padding-left: 20px;
      transition: 0.2s;

      strong {
        color: #f0f0f0;
        margin-left: 10px;
        margin-top: 2px;
      }

      :hover {
        background: rgba(255, 255, 255, 0.06);
      }
    }
  }

  button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 45px;
    padding-left: 20px;
    transition: 0.2s;

    strong {
      color: #f0f0f0;
      margin-left: 10px;
      margin-top: 2px;
    }

    :hover {
      background: rgba(255, 255, 255, 0.06);
    }
  }
`;
