import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background: #fff;
  border-radius: 4px;
  width: 90%;
  height: 520px;
  box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.1);
`;

export const BoxLeft = styled.div`
  width: 150px;
  height: 100%;
  background: #333;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  img {
    width: 140px;
    margin: 5px;
  }

  div.box-date {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 5px;

    strong {
      font-size: 18px;
      color: #ddd;
    }

    span {
      color: #ddd;
      font-size: 16px;
    }
  }

  div.info-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 30px 5px 0 5px;

    strong {
      font-size: 14px;
      color: #999;
    }

    span {
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      color: #fff;
      margin-top: 5px;
    }
  }
`;

export const BoxActions = styled.div`
  width: 100%;
`;

export const GoSell = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 120px;
  background: ${(props) => props.color};

  :hover {
    background: ${(props) => lighten(0.1, `${props.color}`)};
  }

  strong {
    font-size: 20px;
    color: #fff;
    margin-top: 3px;
  }
`;

export const GoOperations = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 120px;
  background: ${(props) => props.color};

  :hover {
    background: ${(props) => lighten(0.1, `${props.color}`)};
  }

  strong {
    font-size: 18px;
    color: #fff;
    margin-top: 3px;
  }
`;

export const BoxRight = styled.div`
  width: 100%;
  height: 100%;
`;
