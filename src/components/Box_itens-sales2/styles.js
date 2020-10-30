import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    height: 45px;
    background: #666;

    div.header-box-left {
      strong {
        font-size: 18px;
        color: #fff;
      }

      span {
        font-size: 18px;
        color: #fff;
        margin-left: 8px;
      }
    }

    button {
      background: none;
      border: none;

      :hover {
        opacity: 0.8;
        transition: 0.2s;
      }
    }
  }

  main {
    ul {
      max-height: 335px;
      overflow: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px 5px;

      li {
        display: grid;
        grid-template-columns: 5fr 1fr;
        grid-column-gap: 15px;
        align-items: center;
        margin-bottom: 10px;
        padding-bottom: 5px;
        border-bottom: 1px solid #ddd;

        div.box-item-description {
          display: flex;
          flex-direction: column;

          span {
            font-size: 10px;
            font-weight: bold;
            color: #666;
          }

          div {
            strong {
              font-size: 10.5px;
              color: #333;
            }

            span {
              color: #999;
              margin-left: 10px;
            }
          }
        }

        div.box-item-price {
          display: flex;
          flex-direction: column;
          align-items: flex-end;

          span {
            font-size: 10px;
            font-weight: bold;
            color: #666;
          }

          strong {
            font-size: 12px;
            color: #333;
          }
        }

        div.box-item-actions {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;

          button {
            background: none;
            border: none;

            :hover {
              border-top: 1px solid #ddd;
            }
          }
        }
      }
    }
  }

  footer {
    div.box-subtotal {
      height: 80px;
      padding: 10px 10px 0;
      background: #333;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      div.subtotal-box-left {
        div.label-block {
          margin-bottom: 10px;

          strong {
            font-size: 10px;
            color: #ccc;
          }

          span {
            font-size: 18px;
            font-weight: bold;
            color: #fff;
            margin-left: 10px;
          }
        }
      }

      div.subtotal-box-right {
        display: flex;
        flex-direction: column;
        text-align: center;

        strong {
          font-size: 12px;
          color: #ccc;
        }

        span {
          font-size: 25px;
          font-weight: bold;
          color: #fff;
          margin-top: 5px;
        }
      }
    }
  }
`;

export const ButttonGoPayment = styled.button`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.color};
  border: none;

  :hover {
    background: ${(props) => darken(0.1, `${props.color}`)};
  }

  strong {
    font-size: ${(props) => `${props.fontSize}px`};
    color: #fff;
    margin-left: 10px;
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
