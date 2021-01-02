import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #eee;
  width: 100%;
  height: 100%;
  padding: 50px 25px 0px;
  overflow: auto;
`;

export const Content = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  margin-top: 20px;
  min-height: 85vh;
  display: flex;
  flex-direction: column;

  form {
    margin-top: 20px;

    span {
      color: #de3b3b;
      font-weight: bold;
    }

    div.form-content {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;

      div.box-img {
        padding-right: 20px;
      }

      div.box-form {
        margin-left: 20px;
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
      }
    }

    div.box-buttons {
      margin-left: 360px;
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

  > button {
    background: none;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 3px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;

    :hover {
      opacity: 0.7;
    }

    strong {
      font-size: 12px;
      color: #999;
      margin-left: 10px;
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

  input {
    display: flex;
    width: 100%;
    height: 35px;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 0 10px;
    margin-top: 5px;

    color: #999;
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
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    animation: ${rotate} 1s linear infinite;
  }
`;
