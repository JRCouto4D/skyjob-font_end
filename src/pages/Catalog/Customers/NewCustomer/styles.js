import styled from 'styled-components';

export const Container = styled.div``;

export const Modal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  > button {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
  }
`;

export const Content = styled.div`
  width: 80%;
  background: #fff;
  border-radius: 4px;

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

    h1 {
      display: block;
      font-size: 20px;
      color: #ab0000;
    }

    div.box-right {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: flex-end;

      strong {
        font-size: 18px;
        color: #333;
      }
    }
  }
`;

export const ButtonActive = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 30px;
  background: #eee;
  border: none;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.4);
  margin-left: 15px;

  && div {
    display: flex;
    width: 54px;
    height: 24px;
    background: ${(props) => (props.active ? '#ab0000' : '#999')};
    padding: 3px;
    justify-content: ${(props) => (props.active ? 'flex-end' : 'flex-start')};
    align-items: center;

    div {
      background: #fff;
      width: 22px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3px;

      div {
        display: block;
        background: ${(props) => (props.active ? '#ab0000' : '#999')};
        width: 2px;
        height: 12px;
      }
    }
  }
`;
