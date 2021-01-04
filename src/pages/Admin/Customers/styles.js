import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #eee;
  width: 100%;
  min-width: 1100px;
  padding: 70px 25px 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  background: #fff;
  min-width: 1000px;
  width: 100%;
  border-radius: 4px;
  padding: 20px;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

    strong {
      color: #999;
      margin-top: 2px;
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

export const NewSearch = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 38px;
    padding: 0 15px 0 10px;
    border: none;
    border-radius: 4px;
    background: #40e0d0;
    transition: 0.2s;

    :hover {
      background: ${darken(0.1, '#40e0d0')};
    }

    strong {
      font-size: 13px;
      color: #fff;
      margin-left: 5px;
    }
  }

  div.box-search {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 350px;
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 40px;
    margin-left: 20px;

    svg {
      margin-left: 10px;
    }

    input {
      height: 22px;
      width: 350px;
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
`;

export const TableCustomer = styled.ul`
  width: 100%;
  height: 320px;
  margin-top: 25px;

  li.table-header {
    display: grid;
    align-items: center;
    justify-content: flex-start;
    grid-template-columns: 80px 3fr 2fr 1fr 1fr 2fr 2fr 60px;
    grid-column-gap: 10px;
    background: transparent;
    height: 35px;
    padding: 0 10px;
    border: none;

    strong {
      color: #333;
    }
  }

  li {
    display: grid;
    align-items: center;
    grid-template-columns: 80px 3fr 2fr 1fr 1fr 2fr 2fr 60px;
    border-radius: 4px;
    border-bottom: 1px solid #ddd;
    padding: 10px;

    div.box-description {
      display: flex;
      align-items: center;

      strong {
        margin-left: 10px;
      }

      span {
        font-size: 12;
        color: '#8bc53d';
        font-weight: bold;
        margin-left: 3px;
      }
    }
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
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;

  svg {
    animation: ${rotate} 1s linear infinite;
  }
`;

export const Pagination = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 25px;

  > span {
    color: #ccc;
    font-size: 12px;
  }

  div.box-pagination {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 10px;
    align-items: center;

    span {
      color: #999;
    }

    button {
      background: none;
      padding: 5px 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 12px;
      color: #999;
      transition: 0.2s;

      :hover {
        text-decoration: underline;
      }

      :disabled {
        opacity: 0.6;
        cursor: default;

        :hover {
          text-decoration: none;
        }
      }
    }
  }
`;
