import styled from 'styled-components';

export const Box = styled.div`
  background-color: #f2f2f2;
  margin-right: 15px;
  margin-left: 15px;
  padding: 40px;
  border-radius: 15px;
  margin-bottom: 30px;
  display: flex;
  width: 80%;
  align-self: center;
  justify-content: center;
  flex-direction: column;
`;

export const Title = styled.h3`
  font-size: 18px;
  align-self: center;
`;

export const DivForm = styled.div`
  font-size: 18px;
`;

export const DivOption = styled.div`
  display: flex;
`;

export const RemoveOption = styled.div`
  margin-left: 15px;
  align-self: center;
  color: red;

  &:hover {
    cursor: pointer;
  }
`;

export const DivSubmit = styled.div`
  display: flex;
  flex-direction: column;
`;
