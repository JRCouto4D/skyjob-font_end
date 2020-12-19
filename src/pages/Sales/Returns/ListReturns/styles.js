import styled, { keyframes } from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 80%;
  min-width: 1100px;
  height: 510px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  width: 80%;
  min-width: 1100px;
  height: 37vw;
  min-height: 510px;
  padding: 15px;

  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    div.header-box-left {
      strong {
        font-size: 16px;
        color: #172c3d;
      }

      h1 {
        font-size: 25px;
        color: #ab0000;
      }
    }

    div.header-box-right {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      button.filter-button {
        background: none;
        border: none;
        transition: 0.2s;

        :hover {
          opacity: 0.8;
        }
      }

      > button.new-return-button {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 5px 15px;
        background: #ab0000;
        border: none;
        border-radius: 4px;
        transition: 0.2s;
        margin-left: 20px;

        span {
          font-size: 12px;
          color: #fff;
        }

        strong {
          font-size: 16px;
          color: #fff;
        }

        :hover {
          background: ${lighten(0.05, '#ab0000')};
        }
      }
    }
  }
`;

export const BoxNavigation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  div.box-pagination {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 10px;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px;
      background: #ab0000;
      border: none;
      margin-right: 10px;
      transition: 0.2s;

      :hover {
        background: ${lighten(0.05, '#ab0000')};
      }

      :disabled {
        opacity: 0.5;
        cursor: default;
        background: #ab0000;
      }
    }

    strong {
      color: #999;
      font-size: 14px;
      margin-right: 10px;
    }
  }

  button.print-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    padding: 5px;
    transition: 0.2s;
    margin-top: 10px;

    :hover {
      opacity: 0.7;
    }

    strong {
      margin-left: 5px;
    }
  }
`;

export const Body = styled.div`
  margin-top: 20px;
  width: 100%;

  ul {
    width: 100%;
    height: 360px;

    li.table-header {
      display: grid;
      grid-template-columns: 1fr 2fr 2fr 2fr 3fr;
      grid-column-gap: 10px;
      background: #333;
      height: 35px;
      align-items: center;
      justify-content: center;
      padding-left: 10px;

      strong {
        color: #fff;
      }
    }

    div.item-table {
      margin-top: 5px;

      li {
        display: grid;
        grid-template-columns: 1fr 2fr 2fr 2fr 3fr;
        grid-column-gap: 10px;
        height: 35px;
        padding-left: 10px;
        border-bottom: 1px solid #ddd;
        align-items: center;
        margin-top: 2.5px;
        padding-bottom: 2.5px;
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
