import styled from 'styled-components';
import Async from 'react-select/async';
import { lighten } from 'polished';

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

  a {
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

export const Content = styled.div`
  width: 80%;
  background: #fff;
  border-radius: 4px;

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

    h1 {
      display: block;
      font-size: 20px;
      color: #ab0000;
    }

    div {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: flex-end;

      strong {
        font-size: 18px;
        color: #333;
      }
    }
  }

  main {
    padding: 15px;
  }

  footer {
    padding: 15px;

    button {
      width: 100%;
      height: 45px;
      background: #ab0000;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      border-radius: 4px;
    }
  }
`;

export const ButtonActive = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 30px;
  background: #eee;
  border: none;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.4);
  margin-left: 15px;

  && div {
    display: flex;
    width: 54px;
    height: 24px;
    background: ${(props) => (props.active ? '#ab0000' : '#999')};
    padding: 3px;
    justify-content: ${(props) => (props.active ? 'flex-end' : 'flex-start')};
    align-items: center;

    div {
      background: #fff;
      width: 22px;
      height: 18px;

      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3px;

      div {
        display: block;
        background: ${(props) => (props.active ? '#ab0000' : '#999')};
        width: 2px;
        height: 12px;
      }
    }
  }
`;

export const BoxDescription = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: flex-start;

  form {
    margin-right: 25px;
  }

  > div {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;
export const InputBlock = styled.div`
  flex-direction: column;
  width: 100%;

  strong {
    font-size: 12px;
    color: #333;
  }

  input {
    display: flex;
    width: 100%;
    height: 35px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 10px;
    margin-top: 5px;

    ::placeholder {
      color: #ddd;
    }
  }
`;

export const BlockSelect = styled.div`
  margin-top: 5px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 25px;
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
})`
  margin-top: 5px;
  width: 100%;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  button {
    width: 35px;
    height: 35px;
    background: #ab0000;
    border: none;
    margin-top: 5px;

    :hover {
      background: ${lighten(0.09, '#ab0000')};
    }
  }
`;

export const BoxPrice = styled.div`
  margin-top: 20px;

  > h1 {
    font-size: 20px;
    color: #333;
    border-bottom: 1px solid #ddd;
    padding-bottom: 5px;
  }

  > div {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
`;

export const BlockPrice = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
  width: 100%;
`;
export const CustPrice = styled.div`
  border: 1px solid #ddd;
  width: 280px;
  height: 150px;
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);

    strong {
      color: #999;
      font-size: 16px;
    }

    span {
      color: #999;
      font-size: 12px;
    }
  }
  h1 {
    font-size: 30px;
    margin: 0 10px 5px 0;
    color: #666;
  }
`;

export const OthersPrices = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  height: 150px;
  margin-left: 20px;
  width: 100%;

  > div {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    height: 50%;
  }
`;

export const InputBlockPrice = styled.div`
  width: 180px;
  display: flex;
  flex-direction: column;

  strong {
    font-size: 18px;
    color: #333;
  }

  input {
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 35px;
    padding: 0 10px;
    margin-top: 5px;
    text-align: right;

    ::placeholder {
      color: #ddd;
    }
  }
`;

export const Profit = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90px;

  strong {
    font-size: 30px;
    color: #6fab1f;
  }

  span {
    font-size: 20px;
    color: #6fab1f;
    font-weight: bold;
  }
`;

export const TextProfit = styled.div`
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  text-align: center;

  strong {
    font-size: 20px;
    color: #666;
    font-weight: bold;
  }

  span {
    font-size: 11px;
    color: #666;
  }
`;

export const BlockAmount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 135px;
  width: 200px;

  input {
    text-align: right;
  }
`;

export const ModalInclude = styled.div`
  position: absolute;
  top: ${(props) => `${props.coords.y - 175}px`};
  left: ${(props) => `${props.coords.x - 300}px`};

  background: rgba(174, 174, 174, 0.9);
  width: 350px;
  border-radius: 8px;
  padding: 10px;
  display: ${(props) => (props.visible ? 'block' : 'none')};

  button {
    position: relative;
    float: right;
    background: none;
    border: none;
  }

  div {
    margin-top: 15px;

    strong {
      color: #fff;
    }

    input {
      background: #ddd;
      color: #666;
    }

    button {
      color: #fff;
      font-weight: bold;
      width: 100px;
      height: 30px;

      margin-left: 10px;
    }
  }

  &::before {
    content: '';
    position: absolute;
    left: calc(85% - 20px);
    top: 135px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 20px solid rgba(174, 174, 174, 0.9);
  }
`;
