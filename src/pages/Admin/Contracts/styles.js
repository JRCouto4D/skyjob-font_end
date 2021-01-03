/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  background: #eee;
  width: 100%;
  height: 100%;
  padding: 50px 25px 25px;
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
`;

export const Catalog = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 30px;
  align-items: center;
  width: 1200px;
  margin: auto;

  margin-top: 20px;
`;

export const ContractButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: ${lighten(0.1, '#ddd')};

  div.box-top {
    height: 550px;
    padding: 18px;
    transition: 0.2s;

    :hover {
      border: 5px solid ${(props) => props.poupColor};
      box-sizing: border-box;
      border-bottom: none;
    }

    h2 {
      display: block;
      text-align: center;
      font-size: 25px;
    }

    > strong {
      display: block;
      text-align: center;
      font-size: 15px;
      color: #999;
      margin: 10px 0 5px;
    }

    > p {
      display: block;
      text-align: center;
      font-size: 12px;
      color: #666;
      margin-bottom: 20px;
    }

    div.box-description {
      display: grid;
      grid-template-rows: repeat(1fr);
      grid-row-gap: 5px;

      div.box-label {
        div.label-header {
          display: flex;
          align-items: center;
          margin-bottom: 7px;

          strong {
            margin-left: 10px;
          }
        }

        > p {
          margin-left: 15px;
          margin-top: 2px;
          color: #666;
          font-size: 12px;
          text-align: left;
        }
      }
    }
  }

  div.box-price {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;

    strong {
      font-size: 50px;
      color: #fff;
    }
  }
`;
