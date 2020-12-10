import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 140px;
  height: 100%;
`;

export const Content = styled.div`
  width: 658px;
`;

export const Filters = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 658px;
  height: 45px;

  background: #333;
  border-radius: 4px;
  padding: 0 15px 0 10px;

  div.box-options {
    width: 100%;
    margin-left: 20px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    div.option-block {
      button {
        background: none;
        border: none;

        display: flex;
        align-items: center;
        justify-content: center;
        cursor: default;

        div.option-container {
          width: 18px;
          height: 18px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #fff;
          border-radius: 2px;

          div.option-content {
            width: 14px;
            height: 14px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 2px;
            background: #00bfdd;
          }
        }

        strong {
          color: #fff;
          font-size: 12px;
          margin-left: 10px;
        }
      }
    }
  }
`;

export const TableOperations = styled.ul`
  width: 658px;
  height: 100%;
  margin-top: 10px;

  li.table-header {
    display: grid;
    grid-template-columns: 380px 129px 129px;
    padding: 10px;
    background: none;

    strong {
      font-weight: bold;
      color: #333;
    }
  }

  div.result-table {
    height: 245px;
    min-height: 245px;
    overflow: auto;

    li {
      display: grid;
      grid-template-columns: 380px 129px 129px;
      padding: 10px;

      border-bottom: 1px solid #ddd;
      padding-bottom: 10px;
      align-items: center;

      strong {
        font-weight: normal;
      }
    }
  }
`;
