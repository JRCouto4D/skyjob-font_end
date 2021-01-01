import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-width: 1000px;
  height: 40px;
  padding: 0 10px;
  background: #292929;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;

  > div {
    display: flex;
    flex-direction: row;

    img {
      width: 150px;
      opacity: 0.3;
      padding: 10px;
    }
  }

  > button.close-button {
    background: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
      opacity: 0.6;
    }

    > strong {
      margin-left: 5px;
      color: #f0f0f0;
      font-weight: bold;
      margin-right: 15px;
    }
  }
`;

export const BoxMenu = styled.div`
  position: absolute;
  top: 5px;
  left: 10px;
  width: 280px;
  height: 100%;

  display: flex;
  flex-direction: column;

  button {
    background: none;
    border: none;
  }
`;
