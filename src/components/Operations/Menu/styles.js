import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  nav {
    display: flex;

    button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 130px;
      height: 130px;
      margin-right: 2px;
      background: #333;
      border: none;
      transition: 0.2s;

      :hover {
        background: ${darken(0.07, '#00bfdd')};
      }

      img {
        width: 70px;
        height: 70px;
      }

      img.img-closure {
        width: 75px;
        height: 75px;
      }

      strong {
        color: #fff;
        margin-top: 10px;
      }

      strong.sales {
        margin-top: 2.5px;
      }
    }
  }
`;
