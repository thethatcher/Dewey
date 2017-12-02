import React from "react";

export const FormBtn = props =>
<span>
  <button {...props} style={{ align: "left" }} className="btn btn-success">
    {props.children}
  </button>
</span>