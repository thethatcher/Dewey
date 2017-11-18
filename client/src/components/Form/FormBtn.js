import React from "react";

export const FormBtn = props =>
  <button {...props} style={{ align: "left" }} className="btn btn-success">
    {props.children}
  </button>;
