import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100%;

  main {
    margin-top: 130px;

    ul {
      width: 658px;
      margin-top: 20px;
      background: rgba(240, 240, 240, 0.7);

      li.table-header {
        display: grid;
        grid-template-columns: 1fr 2fr 2fr 4fr 2fr;
        grid-column-gap: 10px;
        background: #ddd;
        height: 35px;
        align-items: center;
        justify-content: center;
        border-radius: 4px;

        strong {
          margin-left: 5px;
          color: #333;
          font-weight: bold;
        }
      }

      div.box-result-table {
        max-height: 18vw;
        overflow: auto;

        li {
          display: grid;
          grid-template-columns: 1fr 2fr 2fr 4fr 2fr;
          grid-column-gap: 10px;
          height: 35px;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid #ccc;

          strong {
            margin-left: 5px;
            color: #333;
            font-size: 12px;
            font-weight: normal;
          }
        }
      }
    }

    footer {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 658px;
      margin-top: 3%;

      div.label-block {
        display: flex;
        flex-direction: row;
        align-items: flex-end;

        strong {
          color: #999;
          font-size: 22px;
        }

        h3 {
          font-size: 30px;
          color: #8bc53d;
          margin-left: 5px;
        }
      }
    }
  }
`;
