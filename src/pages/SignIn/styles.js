import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 380px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 350px;
    margin-left: 35px;
    margin-top: 15px;

    input {
      padding: 10px;
      width: 100%;
      border: none;
      background: none;
      color: ${darken(0.1, '#cb0000')};

      ::placeholder {
        color: #cb0000;
      }
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 45px;
      margin-top: 10px;
      border-radius: 4px;
      background: #cb0000;
      border: none;

      color: #fff;
      font-weight: bold;
      font-size: 16px;
    }

    span {
      color: #f64c75;
      align-self: flex-start;
      position: absolute;
    }
  }
`;

export const InputBlock = styled.div`
  width: 345px;
  border-radius: 4px;
  border: 2px solid #cb0000;

  margin-bottom: 10px;
  padding: 0 10px;
  display: flex;
  align-items: center;
`;
