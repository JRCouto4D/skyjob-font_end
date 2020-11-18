import styled from 'styled-components';
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

  > button {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
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

    div.box-right {
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

  :disabled {
    cursor: default;
    opacity: 0.5;
  }

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

export const Main = styled.div`
  padding: 15px;

  form {
    display: flex;
    flex-direction: column;

    div.box-data-customer {
      display: flex;
      flex-direction: row;
      align-items: flex-start;

      div.box-description-customer {
        margin-left: 20px;
        width: 100%;

        div.box-description-top {
          display: grid;
          grid-template-columns: 2fr 1fr;
          grid-column-gap: 15px;
        }

        div.box-description-bottom {
          margin-top: 12px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-column-gap: 15px;
        }
      }
    }

    div.box-customer-address {
      margin-top: 10px;

      div.data-address {
        width: 100%;
        padding-bottom: 5px;
        border-bottom: 1.3px solid #eee;

        strong {
          color: #ccc;
          font-size: 18px;
        }
      }

      div.box-address-top {
        margin-top: 15px;
        display: grid;
        grid-template-columns: 1fr 100px 1fr;
        grid-column-gap: 15px;
      }

      div.box-address-bottom {
        margin-top: 15px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-column-gap: 15px;
      }
    }

    button {
      height: 45px;
      background: #ab0000;
      font-size: 20px;
      color: #fff;
      font-weight: bold;
      border: none;
      border-radius: 4px;
      margin-top: 20px;
      transition: 0.2s;

      :hover {
        background: ${lighten(0.04, '#ab0000')};
      }
    }
  }
`;

export const InputBlock = styled.div`
  display: flex;
  flex-direction: column;

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
    :disabled {
      opacity: 0.5;
      color: #999;
    }
  }
`;
