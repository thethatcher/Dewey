import React from "react";
import classes from  "./DeleteBtn.css";

const DeleteBtn = props => (
  <span className="delete-btn" {...props}>
    <img src="trash.png" className ="delete-btn"/>
  </span>
);
export default DeleteBtn;


