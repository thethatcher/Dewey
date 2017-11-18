import React from "react";

const Nav = () =>
 <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">
      <img src="favicon.ico" width="30" height="30" class="d-inline-block align-top" alt=""/>
    </a>
  
    <button class="navbar-toggler" type="button" data-toggle="collapse"   data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
  
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      
      <li class="nav-item">
        <a class="nav-link" href="/Categories">Categories</a>
      </li>
      
      <li class="nav-item">
        <a class="nav-link" href="/Friends">Friends</a>
      </li>
      
      <li class="nav-item">
        <a class="nav-link" href="/Items">Items</a>
      </li>
      
    </ul>
  </div>
</nav>

export default Nav;


