import React from "react";
import Nav from "./components/Nav";

const App = () => 
  <div>
    <Nav />

    <table class="ink-table hover">
  <thead>
    <tr>
      <th class="align-left">ID</th>
      <th class="align-left">Name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>John</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Will</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Steve</td>
    </tr>
  </tbody>
</table>
</div>;

export default App;