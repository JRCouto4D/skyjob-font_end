import styled, { keyframes } from 'styled-components';

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

  footer {
    div.box-body {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;

      div.box-left {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        strong {
          font-size: 20px;
          color: #666;
        }

        div.box-input {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-top: 5px;
          width: 250px;
          height: 60px;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding-left: 10px;

          strong {
            font-size: 35px;
            color: #ccc;
          }

          input {
            width: 100%;
            height: 100%;
            border: none;
            font-size: 35px;
            color: #ccc;
            margin-left: 5px;

            ::placeholder {
              color: #ccc;
            }
          }
        }
      }

      div.box-label {
        display: flex;
        flex-direction: column;
        align-items: center;

        strong {
          font-size: 30px;
          color: #666;
        }

        span {
          font-size: 11px;
          color: #999;
        }
      }
    }

    button {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #8bc53d;
      border: none;
      border-radius: 4px;
      margin-top: 25px;

      strong {
        font-size: 30px;
        color: #fff;
        margin-left: 15px;
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
  height: 60px;

  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    animation: ${rotate} 1s linear infinite;
  }
`;
