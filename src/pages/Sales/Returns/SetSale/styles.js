/* eslint-disable no-nested-ternary */

import styled, { keyframes } from 'styled-components';
import { darken, lighten } from 'polished';

export const Modal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  > button {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
  }
`;

const animationContainer0 = keyframes`
  from{
    transform: translateY(0);
  }

  to{
    transform: translateY(320px);
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

const animationContainer2 = keyframes`
  from{
    transform: translateX(0);
  }

  to{
    transform: translateX(1200px);
  }
`;

export const Container = styled.div`
  background: #ccc;
  border-radius: 4px;
  padding: 15px;

  display: flex;
  flex-direction: column;
  width: 350px;
  height: 118px;

  position: absolute;
  top: ${(props) => (props.poup === 0 ? '-118px' : '202px')};
  animation: ${(props) =>
      props.poup === 0
        ? animationContainer0
        : props.poup === 1
        ? animationContainer1
        : animationContainer2}
    ${(props) => (props.poup === 1 || props.poup === 2 ? '0.2s' : '0.4s')}
    forwards;

  strong {
    font-size: 12px;
    color: #666;
    margin-bottom: 2px;
  }

  input {
    border: 1px solid #aaa;
    height: 30px;
    background: rgba(255, 255, 255, 0.5);
    padding-left: 5px;
  }

  div.box-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    width: 100%;

    button.cancel-button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #333;
      border: none;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      color: #f0f0f0;
      font-weight: bold;
      width: 100px;
      height: 30px;
      transition: 0.2s;

      :hover {
        background: ${lighten(0.1, '#333')};
      }
    }

    button.submit-button {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;

      background: #8bc53d;
      border: none;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      color: #f0f0f0;
      font-weight: bold;
      height: 30px;
      margin-left: 2px;
      transition: 0.2s;

      :hover {
        background: ${darken(0.1, '#8bc53d')};
      }
    }
  }
`;

const rotate = keyframes`
  from{
    transform: rotate(0deg)
  }

  to{
    transform: rotate(360deg)
  }
`;

export const Loading = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    animation: ${rotate} 1s linear infinite;
  }
`;
