import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  svg {
    margin-left: 20px;
    animation: ${rotate} 2s linear infinite;
  }
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;
export const IssuesFilter = styled.form`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-around;
  button {
    width: 100px;
    height: 30px;
    border: 2px solid #999;
    background: #7159c1;
    color: #fff;
    border-radius: 4px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  }
`;

export const IssuePagination = styled.form`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-around;
  align-items: center;
  button {
    height: 40px;
    width: 40px;
    border: 2px solid #999;
    background: #7159c1;
    color: #fff;
    border-radius: 50%;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    svg {
      margin: 0;
      margin-top: 2px;
    }
  }

  span {
    background: #7159c1;
    padding: 10px 15px;
    border-radius: 50%;
    border: 2px solid #999;
    color: #fff;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  }

  .prev {
    cursor: ${props => (props.prevDesabled ? 'not-allowed' : 'pointer')};
    opacity: ${props => (props.prevDesabled ? '0.6' : '1')};
  }
  .next {
    cursor: ${props => (props.nextDesabled ? 'not-allowed' : 'pointer')};
    opacity: ${props => (props.nextDesabled ? '0.6' : '1')};
  }
`;
