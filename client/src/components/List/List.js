import React from "react";
import "./List.css";

export const List = ({ children }) => {
  return (
    
      <ul className="list-group">
      
        {children}
      </ul>
    
  );
};
