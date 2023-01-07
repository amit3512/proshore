// import React from "react";
import styled from "styled-components";
import { Layout, Table } from "antd";

const { Content } = Layout;

export const StyledTable = styled(Table)`
  .prewrap-table .ant-table-cell {
    white-space: pre-wrap;
  }

  .ant-table-thead .ant-table-cell {
    background-color: #2196f3;
    color: #fff;
  }

  .ant-table-thead th.ant-table-column-has-sorters:hover {
    background: rgb(0 0 0 / 62%);
  }

  .ant-table-column-sorter-up.active,
  .ant-table-column-sorter-down.active {
    color: #19d895;
  }
`;

export const StyledSearchLayout = styled(Content)`
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 0.9em 0 0.9em 0;
`;
