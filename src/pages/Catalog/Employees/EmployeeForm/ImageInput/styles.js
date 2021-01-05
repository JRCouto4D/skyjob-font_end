import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  align-self: center;
  label {
    cursor: pointer;
    &:hover {
      opacity: 0.4;
    }
    img {
      height: 320px;
      width: 320px;
      border: 2px dashed rgba(255, 255, 255, 0.3);
      background: #eee;
    }

    div.label-logo {
      width: 320px;
      height: 320px;
      border: 2px dashed rgba(255, 255, 255, 0.7);
      background: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;

      :hover {
        opacity: 0.7;
      }

      strong {
        font-size: 25px;
        color: #ccc;
      }
    }
    input {
      display: none;
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
  height: 320px;
  width: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee;

  svg {
    animation: ${rotate} 1s linear infinite;
  }
`;
