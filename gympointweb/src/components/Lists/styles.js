import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const Cover = styled.div`
  max-width: 1200px;
  min-width: 700px;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 40px auto 20px;
  width: 100%;
`;

export const Content = styled.div`
  width: 100%;
  padding: 20px;
  background: #fff;
  border-radius: 4px;
`;
