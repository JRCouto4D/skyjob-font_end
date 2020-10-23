import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  header {
    text-align: center;

    h1 {
      font-size: 100px;
      color: #666;
    }

    span {
      font-size: 50px;
      font-weight: bold;
      color: #999;
    }
  }

  button {
    margin-top: 40px;

    background: #ab0000;
    border: none;
    border-radius: 4px;
    font-size: 60px;
    color: #fff;
    font-weight: bold;
    padding: 40px 80px;

    :hover {
      background: ${lighten(0.07, '#ab0000')};
      transition: 0.4s;
    }
  }
`;
