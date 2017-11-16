import React from "react";
//import "./Table.css";

export const Table = ({ children }) => {
  return (
    <table class="ink-table">
  <thead>
    <tr>
      <th class="align-left">Category Name</th>
      <th class="align-left">Options</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{children}</td>
    </tr>
  
  </tbody>
</table>
  );
};

export default Table;