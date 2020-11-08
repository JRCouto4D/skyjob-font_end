/* eslint-disable no-nested-ternary */
import styled, { keyframes } from 'styled-components';
import { lighten, darken } from 'polished';

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
    transform: translateY(480px);
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
  width: 950px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 15px;

  position: absolute;
  top: ${(props) => (props.poup === 0 ? '-400px' : '80px')};
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
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    width: 100%;

    div.header-box-left {
      display: flex;
      flex-direction: row;
      align-items: center;

      > div {
        display: flex;
        flex-direction: column;

        strong {
          font-size: 16px;
          color: #172c3d;
        }

        h1 {
          color: #ab0000;
        }
      }
    }

    div.box-search {
      margin-left: 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: left;
      width: 100%;
      border: 1px solid #ccc;
      border-radius: 4px;
      height: 40px;
      padding: 0 10px;

      input {
        display: flex;
        height: 22px;
        width: 100%;
        border: none;
        border-left: 1px solid #ccc;
        margin-left: 10px;
        padding-left: 10px;
        color: #999;

        ::placeholder {
          color: #ccc;
        }
      }
    }

    div.header-box-right {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-left: 10px;

      button {
        background: none;
        border: none;
      }

      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: #ab0000;
        width: 110px;
        height: 40px;
        margin-left: 20px;
        border-radius: 4px;

        :hover {
          background: ${lighten(0.05, '#ab0000')};
        }

        strong {
          color: #fff;
          font-size: 16px;
        }

        span {
          color: #fff;
          font-size: 10px;
        }
      }
    }
  }

  div.box-pagination {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
  }

  div.box-customer {
    margin-top: 20px;
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 4px;
  }
`;

export const Block = styled.div``;

export const TableCustomers = styled.ul`
  min-height: 205px;

  li.table-header {
    display: grid;
    grid-template-columns: 4fr 2fr 2fr 2fr 2fr 1fr;
    grid-column-gap: 15px;
    background: #999;
    height: 30px;
    align-items: center;
    justify-content: left;
    padding: 0 5px;
    border-radius: 4px;

    > strong {
      font-size: 12px;
      color: #f0f0f0;
      font-weight: bold;
    }
  }
`;

export const LineTableCustomer = styled.li`
  display: flex;
  margin-top: 5px;

  button {
    display: grid;
    grid-template-columns: 4fr 2fr 2fr 2fr 2fr 1fr;
    grid-column-gap: 15px;
    background: none;
    border: none;
    border-radius: 4px;
    width: 100%;
    height: 30px;
    align-items: center;
    justify-content: left;
    text-align: left;
    padding: 0 5px;
    cursor: default;

    strong {
      font-weight: normal;
    }
  }
`;

export const Pagination = styled.div`
  margin-top: 10px;
  min-width: 140px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 10px;
  align-items: center;
  justify-content: center;

  button {
    background: #ab0000;
    height: 35px;
    border: none;

    :hover {
      background: ${lighten(0.1, '#ab0000')};
      transition: 0.2s;
    }

    :disabled {
      opacity: 0.4;
      cursor: default;
    }
  }

  span {
    color: #666;
    font-weight: bold;
  }
`;

export const BoxCustomer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;

  div.label-block {
    display: flex;
    flex-direction: column;

    strong {
      color: #333;
    }

    span {
      font-size: 18px;
    }
  }
`;

export const BoxButtons = styled.div`
  margin-top: 2px;
  width: 100%;
  display: flex;
  align-items: center;

  button.button-cancel {
    height: 35px;
    background: #333;
    color: #fff;
    font-weight: bold;
    padding: 0 10px;
    border: none;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    margin-right: 2px;
    transition: 0.2;

    :hover {
      background: ${lighten(0.1, '#333')};
    }
  }

  button.button-define {
    width: 100px;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 35px;
    background: #8bc53d;
    border: none;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    transition: 0.2s;

    :hover {
      background: ${darken(0.1, '#8bc53d')};
    }

    font-size: 18px;
    color: #fff;
    font-weight: bold;
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
  height: 300px;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    animation: ${rotate} 1s linear infinite;
  }
`;
