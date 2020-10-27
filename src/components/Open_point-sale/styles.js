import styled, { keyframes } from 'styled-components';
import Async from 'react-select';

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

  > button {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
  }
`;

export const Content = styled.div`
  background: #fff;
  border-radius: 4px;
  width: 40%;

  header {
    padding: 6px 15px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);

    h1 {
      font-size: 25px;
      color: #ab0000;
    }
  }

  main {
    form {
      padding: 15px;

      div.content {
        margin: 50px 90px;
      }

      div.select-block {
        margin-bottom: 18px;

        strong {
          display: block;
          font-size: 16px;
          color: #333;
          margin-bottom: 5px;
        }
      }

      div.input-block {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 40px;

        input {
          border: 1px solid #ddd;
          border-radius: 4px;
          width: 100%;
          height: 80px;
          text-align: right;
          font-size: 50px;
          color: #333;
          padding-right: 10px;

          ::placeholder {
            color: #ddd;
          }
        }

        strong {
          font-size: 20px;
          color: #666;
          margin-top: 5px;
        }
      }

      button {
        width: 100%;
        background: #ab0000;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 4px;
        height: 50px;

        strong {
          font-size: 25px;
          color: #fff;
          margin-left: 10px;
        }
      }
    }
  }
`;

export const Select = styled(Async).attrs({
  styles: {
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? '#fff' : '#444',
      background: state.isFocused ? '#ab0000' : '#fff',
    }),
    control: () => ({
      border: '1px solid #ccc',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      height: '35px',
      background: '#eee',
    }),
  },
})``;

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
  height: 300px;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    animation: ${rotate} 1s linear infinite;
  }
`;
