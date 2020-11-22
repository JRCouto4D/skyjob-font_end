import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-width: 1000px;
  height: 60px;
  background: #ab0000;

  position: absolute;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    display: block;
    width: 240px;
    height: 50px;
  }
`;

export const BoxRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const BoxLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding-right: 20px;
  margin-right: 20px;
  border-right: 2px solid #fff;

  h2 {
    color: #fff;
    font-size: 14px;
    margin-left: 5px;
  }
`;
export const BoxContacts = styled.div`
  margin-right: 15px;

  && div {
    display: flex;
    flex-direction: row;
    align-items: center;

    span {
      color: #fff;
      margin-left: 5px;
    }
  }
`;
