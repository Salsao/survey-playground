import styled from 'styled-components';

export const Div = styled.div`
  display: flex;
  align-self: center;
`;

export const SurveyList = styled.div`
  display: flex;
  align-self: center;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Box = styled.div`
  background-color: #f2f2f2;
  margin-right: 15px;
  margin-left: 15px;
  padding: 40px;
  border-radius: 15px;
  margin-bottom: 30px;
  display: flex;
  width: 30%;
  align-self: center;
  justify-content: center;
  flex-direction: column;

  &:hover {
    cursor: pointer;
  }
`;
