/* eslint-disable no-nested-ternary */
import styled, { keyframes } from 'styled-components';
import ReactSelect from 'react-select';
import { darken, lighten } from 'polished';

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
    transform: translateY(375px);
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
  width: 35%;
  height: 175px;
  border-radius: 4px;
  background: #f0f0f0;
  position: absolute;
  top: ${(props) => (props.poup === 1 ? '-175px' : '200px')};
  animation: ${(props) =>
      props.poup === 1
        ? animationContainer0
        : props.poup === 2
        ? animationContainer2
        : animationContainer1}
    ${(props) => (props.poup === 2 || props.poup === 3 ? '0.2s' : '0.4s')}
    forwards;
`;

export const Content = styled.div`
  header {
    padding: 5px 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

    h2 {
      font-size: 18px;
      color: #ab0000;
    }
  }

  main {
    padding: 15px;

    strong {
      font-size: 15px;
      color: #333;
    }
  }

  footer {
    padding: 0 14px 10px;
    width: 100%;

    button.button-cancel {
      width: 100px;
      height: 35px;
      border-bottom-left-radius: 4px;
      border-top-left-radius: 4px;
      background: #333;
      border: none;
      color: #fff;
      font-weight: bold;
      transition: 0.2s;

      :hover {
        background: ${lighten(0.1, '#333')};
      }
    }

    button.button-ok {
      width: calc(100% - 101px);
      height: 35px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      border: none;
      margin-left: 1px;
      background: #8bc53d;
      color: #fff;
      font-weight: bold;
      transition: 0.2s;

      :hover {
        background: ${darken(0.07, '#8bc53d')};
      }
    }
  }
`;

export const Select = styled(ReactSelect).attrs({
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
})`
  margin-top: 10px;
`;
