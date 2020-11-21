import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100%;

  main {
    margin-top: 130px;

    div.box-print {
      margin-top: 10px;
      width: 658px;
      display: flex;
      justify-content: flex-end;

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        padding-bottom: 2.5px;
        transition: 0.2s;

        :hover {
          opacity: 0.6;
        }

        strong {
          margin-left: 5px;
        }
      }
    }

    ul {
      width: 658px;
      margin-top: 5px;
      background: rgba(240, 240, 240, 0.7);

      li.table-header {
        display: grid;
        grid-template-columns: 90px 110px 110px 208px 110px;
        grid-column-gap: 5px;
        background: #ddd;
        height: 35px;
        align-items: center;
        justify-content: flex-start;
        border-radius: 4px;
        padding: 0 5px;

        strong {
          color: #333;
          font-weight: bold;
        }
      }

      div.box-result-table {
        height: 18vw;
        overflow: auto;

        li {
          display: grid;
          grid-template-columns: 90px 110px 110px 208px 110px;
          grid-column-gap: 5px;
          height: 35px;
          align-items: center;
          justify-content: flex-start;
          border-bottom: 1px solid #ccc;
          padding: 0 5px;

          strong {
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
      margin-top: 2.1%;

      div.label-block {
        display: flex;
        flex-direction: row;
        justify-content: center;
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

const rotate = keyframes`
  from{
    transform: rotate(0deg)
  }

  to{
    transform: rotate(360deg)
  }
`;

export const Loading = styled.div`
  width: 658px;
  height: 18vw;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    animation: ${rotate} 1s linear infinite;
  }
`;
