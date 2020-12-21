/* eslint-disable no-nested-ternary */
import styled, { keyframes } from 'styled-components';
import { lighten, darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  min-width: 1100px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 10%;
  height: 350px;
`;

export const BlockJob = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 25px;
  height: 100%;
`;

export const BoxButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;

  div {
    width: 10px;
  }

  button {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 45px;
    background: ${(props) => props.setColor};
    border: none;

    span {
      color: #fff;
      font-size: 11px;
    }

    > strong {
      font-size: 18px;
      color: #fff;
    }

    :hover {
      background: ${(props) => darken(0.04, props.setColor)};
    }
  }
`;

export const BoxJob = styled.div`
  background: ${(props) => props.setColor};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;

  header {
    background: ${(props) => lighten(0.04, props.setColor)};
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);

    padding: 10px 15px;

    h1 {
      font-size: 22px;
      font-weight: bold;
      color: #fff;
    }
  }

  body {
    margin-top: 10px;
    text-align: right;
    padding-right: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    div {
      margin-bottom: 15px;

      > strong {
        color: #fff;
        font-size: 14px;
      }
    }

    h2 {
      font-size: 35px;
      color: ${(props) =>
        props.popup === 1
          ? '#57637b'
          : props.popup === 2
          ? '#005388'
          : '#528D85'};
    }
  }
`;

export const BoxItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
export const BoxLeft = styled.div`
  height: 50px;
`;
export const Block = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  span {
    margin-top: 6px;
    margin-right: 2px;
    color: #005388;
    font-size: 16px;
    font-weight: bold;
  }
`;
export const BoxRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 15px;

  && span {
    font-size: 10px;
    color: #fff;
  }

  img {
    height: 20px;
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
