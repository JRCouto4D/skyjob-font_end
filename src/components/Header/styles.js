import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  min-width: 1000px;
  padding: 3px;
  background: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;

  div {
    display: flex;
    flex-direction: row;

    img {
      width: 150px;
    }

    nav {
      max-width: 500px;
      min-width: 400px;
      margin-left: 50px;
      align-self: center;

      ul {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  button {
    background: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
      opacity: 0.6;
    }

    strong {
      margin-left: 5px;
      color: #ff1e40;
      font-weight: bold;
      margin-right: 15px;
    }
  }
`;

export const LinkHome = styled(Link)`
  color: ${(props) => (props.setColor ? '#FF1E40' : '#0b2a32')};
  font-size: 18px;
  font-weight: bold;

  :hover {
    color: #999;
  }
`;

export const ButtonMenu = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.setColor ? '#FF1E40' : '#0b2a32')};
  font-size: 18px;
  font-weight: bold;

  :hover {
    color: #999;
  }
`;

export const BoxCatalog = styled.ul`
  position: absolute;
  background: rgba(11, 42, 50, 0.7);
  top: ${(props) => `${props.coords.y + 15}px`};
  left: ${(props) => `${props.coords.x - 80}px`};
  width: 250px;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom-width: 2px;
    border-color: #fff;
    padding-right: 10px;

    svg {
      display: none;
    }

    :hover {
      background: rgba(11, 42, 50, 1);

      svg {
        display: block;
      }
    }

    a {
      color: #fff;
      font-weight: bold;
      font-size: 18px;
      padding: 10px;
      flex: 1;
    }
  }
`;

export const BoxSales = styled.ul`
  position: absolute;
  background: rgba(11, 42, 50, 0.7);
  top: ${(props) => `${props.coords.y + 15}px`};
  left: ${(props) => `${props.coords.x - 80}px`};
  width: 250px;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom-width: 2px;
    border-color: #fff;
    padding-right: 10px;

    svg {
      display: none;
    }

    :hover {
      background: rgba(11, 42, 50, 1);

      svg {
        display: block;
      }
    }

    a {
      color: #fff;
      font-weight: bold;
      font-size: 18px;
      padding: 10px;
      flex: 1;
    }
  }
`;
