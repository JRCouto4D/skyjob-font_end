import styled, { keyframes } from 'styled-components';

export const Modal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const animationContainer0 = keyframes`
  from{
    transform: translateY(0);
  }

  to{
    transform: translateY(480px);
  }
`;

const animationContainer1 = keyframes`
  from{
    transform: translateX(0);
  }

  to{
    transform: translateX(-1200px);
  }
`;

export const Container = styled.div`
  width: 800px;
  height: 400px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;

  position: absolute;
  top: ${(props) => (props.poup === 0 ? '-400px' : '80px')};
  animation: ${(props) =>
      props.poup === 0 ? animationContainer0 : animationContainer1}
    ${(props) => (props.poup === 0 ? '0.4s' : '0.2s')} forwards;
`;
