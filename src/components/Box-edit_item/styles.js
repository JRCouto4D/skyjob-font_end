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

const animationContainer = keyframes`
  from{
    transform: translateX(0);
  }

  to{
    transform: translateX(calc(-380px - 10%));
  }
`;

export const Container = styled.div`
  position: absolute;
  width: 380px;
  right: -380px;
  animation: ${animationContainer} 0.4s forwards;

  > button {
    position: absolute;
    background: none;
    border: none;
    right: 5px;
    top: 5px;
  }
`;

export const Content = styled.div`
  background: #ccc;
  border-radius: 4px;
  padding: 10px;

  form {
    display: flex;
    flex-direction: column;

    span {
      font-size: 10px;
      color: #666;
    }

    strong {
      color: #666;
      margin-top: 2px;
    }

    div.block {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 10px;
      margin-top: 10px;

      div.input-block {
        display: flex;
        flex-direction: column;

        strong {
          font-size: 12px;
          color: #666;
          margin-bottom: 2px;
        }

        input {
          border: 1px solid #aaa;
          height: 25px;
          background: rgba(255, 255, 255, 0.5);
          padding-left: 5px;
        }
      }
    }

    button.submit-button {
      background: #8bc53d;
      border: none;
      border-radius: 4px;
      height: 30px;
      color: #fff;
      font-weight: bold;
      margin-top: 10px;
    }
  }
`;
