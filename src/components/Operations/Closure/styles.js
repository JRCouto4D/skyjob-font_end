import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin-top: 130px;
  height: 100%;
`;

export const Content = styled.div`
  width: 658px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  header {
    display: flex;
    flex-direction: column;
    margin-top: 10px;

    strong {
      font-size: 16px;
      color: #333;
      margin-top: 5px;
    }
  }

  div.box-main {
    background: rgba(0, 0, 0, 0.05);
    padding: 15px;
    margin: 10px 0;

    div.label-block {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 10px;

      strong {
        font-size: 20px;
        color: #666;
      }

      span {
        font-size: 14px;
        color: #ff1e40;
        font-weight: bold;
      }
    }
  }

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60px;
    background: #8bc53d;
    border: none;
    border-radius: 4px;
    transition: 0.2s;

    :hover {
      background: ${darken(0.07, `#8bc53d`)};
    }

    strong {
      font-size: 25px;
      color: #fff;
      margin-left: 15px;
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

  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    animation: ${rotate} 1s linear infinite;
  }
`;
