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

export const TableProviders = styled.ul`
  width: 100%;
  display: grid;
  grid-gap: 15px;
  margin-top: 25px;
  li.header {
    margin-top: 3px;
    display: grid;
    grid-template-columns: 3fr 3fr 3fr 2fr 2fr 1fr 60px;
    padding: 0 10px;
    strong {
      color: #333;
      font-size: 12.5px;
    }
  }
`;

export const LineTable = styled.li`
  margin-top: 3px;
  display: grid;
  grid-template-columns: 3fr 3fr 3fr 2fr 2fr 1fr 60px;
  background: #eee;
  width: 100%;
  padding: 12px 10px;
  align-items: center;
  border-radius: 4px;
  strong {
    color: #666;
    font-weight: normal;
    font-size: 12px;
  }
  div.boxActions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50px;
    button {
      background: none;
      border: none;
      :hover {
        opacity: 0.7;
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
