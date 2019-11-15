import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: #f2f2f2;
  h1 {
    font-size: 24px;
    color: #444;
    font-weight: bold;
  }

  a.register {
    background: #ee4d64;
    padding: 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    width: 125px;
    > span {
      font-size: 14px;
      color: #fff;
      margin-left: 8px;
    }
  }

  table {
    background: #fff;
    border-radius: 4px;

    thead td {
      font-size: 16px;
      color: #444;
      font-weight: bold;
      padding: 15px;
    }
    tbody {
      td {
        border-bottom: 1px solid #eee;
        padding: 10px;
      }
      > span {
        font-size: 16px;
        color: #666;
        line-height: 20px;
      }

      a {
        font-size: 15px;
        color: #4d85ee;
      }

      button {
        background: none;
        border: 0;
        font-size: 15px;
        color: #de3b3b;
      }
    }
  }
`;
