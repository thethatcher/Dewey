import React from "react";


// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually

const Dropdown = props => (
  <span className="Dropdown" {...props}>
    <div class="dropdown">
  	<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    	Dropdown button
  	</button>
  	
  	<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    	<a class="dropdown-item" href="#">Action</a>
    	<a class="dropdown-item" href="#">Another action</a>
    	<a class="dropdown-item" href="#">Something else here</a>
  	</div>
</div>
  </span>
);

export default Dropdown;