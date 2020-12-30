import styled, { keyframes } from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 80%;
  min-width: 1000px;
  height: 510px;
  background: #fff;
  border-radius: 4px;
  padding: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const BoxLeft = styled.div`
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
`;
export const BoxSearch = styled.div`
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
`;

export const Block = styled.div``;
export const BoxRight = styled.div`
  width: 350px;
  margin-left: 200px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

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
`;

export const TableProducts = styled.ul`
  width: 100%;
  display: grid;
  grid-gap: 15px;
  margin-top: 25px;

  li.header {
    margin-top: 3px;
    display: grid;
    grid-template-columns: 310px 130px 1fr 1fr 105px 90px 90px 60px;
    padding-left: 10px;

    strong {
      color: #333;
      font-size: 12.5px;
    }
  }
`;

export const LineTable = styled.li`
  margin-top: 3px;
  display: grid;
  grid-template-columns: 310px 130px 1fr 1fr 105px 90px 90px 60px;
  background: #eee;
  width: 100%;
  padding-left: 11px;
  align-items: center;
  border-radius: 4px;
  height: 45px;

  strong {
    color: #666;
    font-weight: normal;
    font-size: 12px;
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

export const BoxNavigation = styled.div`
  display: flex;

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

export const Modal = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  display: none;
  justify-content: center;
  align-items: center;

  div.modal-content {
    width: 60%;
    background: #fff;
    border-radius: 4px;
    padding: 20px;

    div.filters {
      margin-bottom: 15px;

      ul {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: -10px;

        li {
          padding: 5px;
          background: #eee;
          border-radius: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 10px;

          span {
            color: #999;
            font-size: 10px;
            font-weight: bold;
          }

          button {
            background: none;
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 15px;
          }
        }
      }
    }

    div.filter-providers {
      strong {
        color: #333;
        font-size: 18px;
      }

      ul {
        margin-top: 15px;

        li {
          display: flex;
          flex-direction: row;
          align-items: center;

          span {
            width: 100px;
            font-size: 16px;
            color: #333;
          }

          input {
            margin-left: 20px;
          }
        }
      }
    }
  }
`;
