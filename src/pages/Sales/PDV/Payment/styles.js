import styled from 'styled-components';
import { darken } from 'polished';
import Async from 'react-select';

export const Container = styled.div`
  width: 100%;
  min-width: 900px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const BoxLeft = styled.div`
  background: #fff;
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 15px;
`;

export const Content = styled.div`
  div.box-info-customers {
    h2 {
      font-size: 15px;
      color: #666;
    }

    div.box-options {
      margin-top: 5px;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 120px;
    }
  }

  div.box-payment {
    margin-top: 15px;

    strong {
      font-size: 18px;
      color: #666;
    }
  }
`;

export const OptionButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: default;

  div.option-container {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 2px solid #ab0000;
    margin-right: 5px;

    display: flex;
    align-items: center;
    justify-content: center;

    div.option-content {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: ${(props) => (props.poup ? '#ab0000' : '#fff')};
    }
  }
`;

export const PaymentSelect = styled(Async).attrs({
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
`;

export const Payment1 = styled.div``;

export const Payment2 = styled.div``;

export const Payment3 = styled.div``;

export const Footer = styled.div`
  width: 100%;

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: #8bc53d;
    width: 100%;
    height: 45px;
    border-radius: 4px;
    border: none;

    :hover {
      background: ${darken(0.08, '#8bc53d')};
    }

    strong {
      font-size: 18px;
      color: #fff;
      margin-right: 10px;
    }

    svg {
      margin-top: -4px;
    }
  }
`;

export const BoxRight = styled.div`
  width: 30%;
  height: 100%;
`;
