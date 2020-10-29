import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 30px;

  strong {
    font-size: 20px;
    color: #333;
  }

  div.box-money {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr;
    grid-row-gap: 40px;
    margin-top: 10px;
    width: 100%;

    div.money-block {
      display: grid;
      grid-template-columns: 280px 77px 280px;
      grid-column-gap: 6%;
      align-items: center;

      input {
        width: 280px;
        height: 60px;
        border: 1px solid #ccc;
        border-radius: 4px;
        text-align: right;
        font-size: 30px;
        font-weight: bold;
        color: #666;
      }

      input#change {
        border: 1px solid #eee;
        color: #ccc;

        ::placeholder {
          color: #f0f0f0;
        }
      }

      div.box-right {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        div.box-string {
          display: flex;
          flex-direction: column;
          align-items: center;

          strong {
            font-size: 18px;
            color: #666;
          }

          span {
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
`;
