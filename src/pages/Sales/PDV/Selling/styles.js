import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-width: 900px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const BoxLeft = styled.div`
  background: #fff;
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 15px;

  header {
    width: 100%;
    display: flex;
    flex-direction: column;

    div.box-options {
      margin-bottom: 10px;
      width: 250px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    div.box-input-search {
      width: 100%;
      height: 45px;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 10px;

      border: 1px solid #ddd;
      border-radius: 4px;

      div.box-search-left {
        svg {
          margin-right: 10px;
        }

        border-right: 1px solid #ddd;
        margin-right: 10px;
      }

      input {
        width: 100%;
        height: 40px;
        border: none;

        font-size: 16px;
        color: #666;
      }
    }
  }
`;

export const ButtonOption = styled.button`
  background: none;
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: default;

  div.box-1 {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid #ab0000;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    div.box-2 {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ab0000;
      display: ${(props) => (props.active ? 'block' : 'none')};
    }
  }

  strong {
    font-size: 14px;
    color: #666;
  }
`;

export const ProductTable = styled.ul`
  margin-top: 20px;
  display: grid;

  li.header {
    display: grid;
    grid-template-columns: 4fr 1fr 2fr 2fr 1fr 1fr;
    grid-column-gap: 15px;
    padding: 10px 4px;
    border-bottom: none;
    background: #ddd;

    strong {
      font-size: 11px;
      font-weight: bold;
      color: #333;
    }
  }
`;

export const LineTableProducts = styled.li`
  width: 100%;

  button {
    background: none;
    border: none;
    padding: 0;
    width: 100%;

    div {
      display: grid;
      grid-template-columns: 4fr 1fr 2fr 2fr 1fr 1fr;
      grid-column-gap: 15px;
      padding: 10px 4px;
      border-bottom: 1px solid #ddd;
      justify-items: left;
      cursor: default;

      strong {
        font-size: 11px;
        font-weight: normal;
        color: #666;
      }
    }
  }
`;

export const BoxFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  div.footer-box-left {
    img {
      width: 100px;
      height: 100px;
      border: 2px dashed rgba(255, 255, 255, 0.3);
      background: #eee;
    }
  }

  div.footer-box-right {
    width: 100%;
    height: 100px;
    margin-left: 10px;

    form {
      display: flex;
      flex-direction: column;

      div.form-box-top {
        display: grid;
        grid-template-columns: 1fr 100px 100px;
        column-gap: 14px;
        margin-bottom: 10px;

        div.input-block {
          display: flex;
          flex-direction: column;

          strong {
            font-size: 12px;
            color: #666;
          }

          input {
            border: 1px solid #ddd;
            border-radius: 4px;
            height: 30px;
            margin-top: 5px;
            padding-left: 10px;
          }
        }
      }

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 4px;
        background: #00bfdd;
        height: 38px;

        strong {
          font-size: 18px;
          color: #fff;
          margin-right: 10px;
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

export const BoxRight = styled.div`
  width: 30%;
  height: 100%;
`;
