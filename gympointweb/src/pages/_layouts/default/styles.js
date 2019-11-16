import styled from 'styled-components';
import { darken } from 'polished';

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
    border-radius: 4px;
    display: flex;
    align-items: center;
    width: 142px;
    height: 36px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.1, '#ee4d64')};
    }

    > span {
      font-size: 14px;
      color: #fff;
      margin-left: 8px;
    }
  }

  table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    thead {
      td:first-of-type {
        text-align: left;
        padding-left: 0px;
      }
      td {
        font-size: 16px;
        line-height: 20px;
        color: #444;
        font-weight: bold;
        padding: 10px 25px;
        text-align: center;
      }
      td:last-of-type {
        text-align: end;
        padding-right: 0;
      }
    }
    tbody {
      tr:not(:last-of-type) {
        border-bottom: 1px solid #eee;
      }
      td:first-of-type {
        text-align: left;
        padding: 10px 150px 10px 0;
      }
      td {
        font-size: 16px;
        text-align: center;
        color: #666;
        padding: 10px 25px;
      }
      td:last-of-type {
        min-width: 120px;
        font-size: 15px;
        padding: 10px 0;
        text-align: right;
      }
      > span {
        font-size: 16px;
        color: #666;
        line-height: 20px;
      }

      a {
        padding-right: 23px;
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
