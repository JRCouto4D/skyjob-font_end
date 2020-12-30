/* eslint-disable no-nested-ternary */
import styled, { keyframes } from 'styled-components';
import Async from 'react-select';
import { darken } from 'polished';

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
  overflow: hidden;

  button.button-close {
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
    transform: translateY(525px);
  }
`;

const animationContainer1 = keyframes`
  from{
    transform: translateX(0);
  }

  to{
    transform: translateX(-1800px);
  }
`;

const animationContainer2 = keyframes`
  from{
    transform: translateX(0);
  }

  to{
    transform: translateX(1800px);
  }
`;

export const Container = styled.div`
  width: 80%;
  min-width: 1100px;
  height: 400px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: ${(props) => (props.poup === 0 ? '-400px' : '125px')};
  animation: ${(props) =>
      props.poup === 0
        ? animationContainer0
        : props.poup === 1
        ? animationContainer1
        : animationContainer2}
    ${(props) => (props.poup === 1 || props.poup === 2 ? '0.2s' : '0.4s')}
    forwards;

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25px;

    div.box-image {
      width: 120px;
      height: 120px;
      border-radius: 60px;
      border: 5px solid #ab0000;

      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 78px;
      }
    }

    div.box-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 15px;

      strong {
        font-size: 20px;
      }

      span {
        font-size: 16px;
        font-weight: bold;
        color: #ccc;
        margin-top: 3px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  padding: 0 25px 25px 0;

  div.block {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1.8px solid #ddd;
    padding: 0 20px;

    strong {
      font-size: 14px;
      color: #666;
    }

    span {
      font-size: 13px;
      font-weight: bold;
      color: #ccc;
      margin-top: 12px;
    }

    input {
      margin-top: 5px;
      height: 30px;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 60px;
      text-align: center;
    }

    button {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      border: none;
      background: #8bc53d;
      border-radius: 4px;
      transition: 0.2s;
      margin-top: 5px;

      strong {
        font-size: 14px;
        color: #fff;
      }

      :hover {
        background: ${darken(0.1, '#8bc53d')};
      }
    }
  }

  div.block-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 20px;

    strong {
      font-size: 14px;
      color: #666;
    }

    button {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      border: none;
      background: #8bc53d;
      border-radius: 4px;
      transition: 0.2s;
      margin-top: 5px;

      strong {
        font-size: 14px;
        color: #fff;
      }

      :hover {
        background: ${darken(0.1, '#8bc53d')};
      }
    }
  }

  div.select-block {
    display: flex;
    flex-direction: column;
    border-right: 1.8px solid #ddd;
    padding: 0 20px;
    width: 350px;
    strong {
      font-size: 14px;
      color: #666;
    }
  }
`;

export const Select = styled(Async).attrs({
  styles: {
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? '#666' : '#444',
      background: state.isFocused ? '#eee' : '#fff',
    }),
    control: () => ({
      border: '1px solid #ccc',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      height: '30px',
      background: '#eee',
    }),
  },
})`
  margin-top: 5px;
  width: 100%;
`;
