import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 80%;
  height: 475px;
  background: #fff;
  border-radius: 4px;
  padding: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  div.box-table-customers {
    min-height: 395px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;

  div.header-box-left {
    display: flex;
    flex-direction: column;

    strong {
      font-size: 16px;
      color: #172c3d;
      font-weight: bold;
    }

    h1 {
      color: #ab0000;
    }
  }

  div.box-search {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 40px;
    margin-left: 20px;

    svg {
      margin-left: 10px;
    }

    input {
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

  button {
    margin-left: 20px;
    background: #ab0000;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 8px 20px;

    span {
      font-size: 12px;
      color: #fff;
      font-weight: bold;
    }

    strong {
      font-size: 18px;
      color: #fff;
    }
  }
`;

export const TableCustomer = styled.ul`
  width: 100%;
  display: grid;
  grid-gap: 15px;
  margin-top: 25px;

  li.header {
    margin-top: 3px;
    display: grid;
    grid-template-columns: 4fr 2fr 2fr 2fr 60px;
    padding: 0 10px;

    strong {
      color: #333;
      font-size: 12.5px;
    }
  }
`;

export const LineTableCustomers = styled.li`
  display: grid;
  grid-template-columns: 4fr 2fr 2fr 2fr 60px;
  background: #eee;
  width: 100%;
  height: 45px;
  padding: 12px 10px;
  align-items: center;
  border-radius: 4px;
  text-align: left;
  strong {
    color: #666;
    font-weight: normal;
    font-size: 12px;
  }
  div.box-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50px;
    button {
      background: none;
      border: none;
      :hover {
        opacity: 0.7;
      }
    }
  }
`;

export const BoxNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;

  div {
    display: flex;
    width: 150px;
    align-items: center;
    justify-content: space-between;
    button {
      background: #ab0000;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      padding: 8px;
      :disabled {
        opacity: 0.4;
        pointer-events: none;
      }
    }
    span {
      color: #666;
      font-weight: bold;
      font-size: 16px;
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
  width: 100%;
  height: 325px;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    animation: ${rotate} 1s linear infinite;
  }
`;
