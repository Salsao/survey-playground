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
  align-self: center;
`;

export const Description = styled.h6`
  align-self: center;
  font-weight: 400;
`;

export const DivSubmit = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const DivShare = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const CopyIcon = styled.img`
  margin-left: 10px;

  &:hover {
    cursor: pointer;
  }
`;

export const SpanShare = styled.span`
  font-weight: 600;
  margin-right: 5px;
`;
