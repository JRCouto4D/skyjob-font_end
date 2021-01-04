import styled, { keyframes } from 'styled-components';
import Async from 'react-select/async';
import DtPicker from 'react-datepicker';
import { darken } from 'polished';

export const Container = styled.div`
  background: #eee;
  width: 100%;
  height: 100%;
  padding: 50px 25px 25px;
  min-width: 1000px;
  overflow: auto;
`;

export const Content = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  margin-top: 20px;
  min-height: 85vh;
  min-width: 1100px;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;

  div.header-box-left {
    h1 {
      color: #ccc;
      font-weight: normal;
    }

    div.header-navigation {
      display: flex;
      flex-direction: row;
      align-items: center;

      a {
        color: #666;
        margin-top: 2px;

        :hover {
          text-decoration: underline;
        }
      }

      strong {
        color: #999;
        margin-top: 2px;
        margin-left: 5px;
      }
    }
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin-top: 20px;

  div.box-company {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 350px;
    height: 230px;
    background: #f0f0f0;

    strong {
      font-size: 30px;
      color: #ccc;
    }

    img {
      width: 100%;
      max-width: 210px;
      border-radius: 50%;
    }
  }

  div.box-form {
    margin-left: 30px;
    width: 100%;

    div.box-date {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 20px;
      align-items: center;
    }

    div.box-buttons {
      margin-top: 30px;
      display: flex;
      align-items: center;

      button.cancel-button {
        border: 1px solid #ddd;
        border-radius: 3px;
        background: #fff;
        height: 35px;
        padding: 0 15px;
        color: #666;
        margin-left: 1px;
        transition: 0.2s;

        :hover {
          background: ${darken(0.03, '#fff')};
        }
      }

      button.submit-button {
        background: #40e0d0;
        height: 35px;
        min-width: 90px;
        padding: 0 15px;
        border: none;
        border-radius: 3px;
        margin-left: 10px;
        transition: 0.2s;

        :hover {
          background: ${darken(0.1, '#40e0d0')};
        }

        strong {
          color: #fff;
          font-weight: normal;
        }
      }
    }
  }
`;

export const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 18px;

  strong {
    font-size: 14px;
    font-weight: normal;
    color: #999;
  }

  div.box-date-picker {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 35px;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 0 10px;
    margin-top: 5px;
  }
`;

export const Select = styled(Async).attrs({
  styles: {
    option: (provided, state) => ({
      ...provided,
      color: '#666',
      background: state.isFocused ? '#eee' : '#fff',
    }),
    control: () => ({
      border: '1px solid #eee',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      height: '35px',
      background: '#fff',
      color: '#666',
    }),
  },
})`
  margin-top: 5px;
  width: 100%;
`;

export const DatePicker = styled(DtPicker)`
  display: block;
  color: #999;
  width: 400px;
  border: none;
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
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    animation: ${rotate} 1s linear infinite;
  }
`;
