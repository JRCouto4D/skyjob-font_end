import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-top: 10px;

    button.cancel-button {
      background: #666;
      width: 100px;
      height: 35px;

      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      color: #fff;
      font-weight: bold;
      transition: 0.2s;

      :hover {
        background: ${darken(0.1, '#666')};
      }
    }

    button.confirm-button {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      height: 35px;
      margin-left: 2px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      background: #ff1e40;
      border: none;
      color: #fff;
      font-weight: bold;
      transition: 0.2s;

      :hover {
        background: ${darken(0.1, '#ff1e40')};
      }
    }
  }
`;

export const Content = styled.div`
  width: 80%;
  min-width: 1100px;
  height: 510px;
  background: #fff;
  border-radius: 4px;
  padding: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    flex-direction: column;

    strong {
      font-size: 16px;
      color: #172c3d;
    }

    h1 {
      font-size: 25px;
      color: #ab0000;
    }
  }

  div.body {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 10px;
    grid-template-rows: 1fr 1fr;
    grid-row-gap: 5px;

    margin-top: 5px;

    div.label-block {
      display: flex;
      flex-direction: column;

      strong {
        color: #333;
      }

      span {
        font-size: 14px;
      }
    }
  }
`;

export const TableItens = styled.ul`
  margin-top: 10px;
  height: 255px;

  li.header {
    display: grid;
    grid-template-columns: 130px 360px 125px 125px 125px 125px;
    grid-column-gap: 10px;

    height: 35px;
    background: #333;
    align-items: center;
    padding: 0 10px;

    strong {
      color: #fff;
      font-size: 15px;
    }
  }

  div.item-table {
    max-height: 220px;
    overflow-y: auto;

    > li {
      display: grid;
      grid-template-columns: 130px 360px 125px 125px 125px 125px;
      grid-column-gap: 10px;

      height: 35px;
      align-items: center;
      padding: 0 10px;
      margin-top: 5px;
      background: #eee;
    }
  }
`;
