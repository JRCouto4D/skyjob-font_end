import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  background: linear-gradient(-90deg, #f0f0f0, #666);

  footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 80px;

    img {
      width: 80px;
      opacity: 0.3;
    }

    span {
      font-size: 10px;
      color: #666;
      margin-top: 10px;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 65%;
  min-width: 880px;
  height: 350px;
`;

export const BoxLeft = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    button {
      display: flex;
      align-items: center;
      justify-content: center;

      height: 30px;
      padding: 0 10px;

      background: none;
      border: none;

      strong {
        color: #f0f0f0;
        font-weight: normal;
      }
    }

    div.box-button-admin {
      margin-left: 40px;
    }
  }
`;

export const BoxRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 60%;

  img {
    width: 420px;
  }

  span {
    width: 430px;
    font-size: 16px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.3);
    text-align: center;
    margin-top: 10px;
  }
`;

export const BoxSignIn = styled.div`
  margin-top: 50px;

  form {
    width: 100%;

    div.input-block {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 35px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.6);
    }

    input {
      border: none;
      background: none;
      padding: 0 10px;
      width: 100%;
      height: 35px;
      color: #ddd;

      ::placeholder {
        color: rgba(255, 255, 255, 0.4);
      }
    }

    span {
      color: #de3b3b;
      font-weight: bold;
      align-self: flex-start;
      margin: 0 0 10px;
    }

    div.box-label {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 50px;

      a {
        color: rgba(255, 255, 255, 0.8);
        transition: 0.2s;

        :hover {
          text-decoration: underline;
        }
      }

      > button {
        background: #ab0000;
        height: 35px;
        width: 130px;
        border: none;
        border-radius: 40px;
        transition: 0.2s;

        strong {
          color: #eee;
        }

        :hover {
          background: ${darken(0.04, '#ab0000')};
        }
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
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    animation: ${rotate} 1s linear infinite;
  }
`;
