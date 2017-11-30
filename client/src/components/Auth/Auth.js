import React, { Component } from "react";
import firebase from 'firebase'
class Auth extends Component {
// Setting the initial values of this.state.username and this.state.password
state = {
email: "",
password: ""
};
componentDidMount(){
  var config = {
    apiKey: "AIzaSyDpABusxDMNturlE9Gh7-QArvTF-thiMrk",
    authDomain: "dewey-da807.firebaseapp.com",
    databaseURL: "https://dewey-da807.firebaseio.com",
    projectId: "dewey-da807",
    storageBucket: "dewey-da807.appspot.com",
    messagingSenderId: "826253413209"
};
firebase.initializeApp(config);
var database = firebase.database();
var provider = new firebase.auth.GoogleAuthProvider();
var auth = firebase.auth();
const txtEmail = document.getElementById('email');
const txtPassword = document.getElementById('password');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');
// On click login
btnLogin.addEventListener('click', e => {
  // Get email and password
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  // Sign in
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message))
  .then(
    sessionStorage.username = email
    //redirect
    );
  console.log(email);
});
// On click sign up
btnSignUp.addEventListener('click', e => {
  // Get email and password
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  // Create user
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  promise.catch(e => alert(e.message))
  .then(
    sessionStorage.username = email
    //redirect
    );
  console.log(email);
});

}
// Sign in function to provide on click for google sign-in
signIn() {
  var provider = new firebase.auth.GoogleAuthProvider();
  const btnLogout = document.getElementById('btnLogout');
  firebase.auth().signInWithPopup(provider).then(function(result) {
   // This gives you a Google Access Token.
   var token = result.credential.accessToken;
   // The signed-in user info.
   var user = result.user;
   console.log(user.email);
   // ...
  }).catch(function(error) {
   // Handle Errors here.
   var errorCode = error.code;
   var errorMessage = error.message;
   // The email of the user's account used.
   var email = error.email;
   // The firebase.auth.AuthCredential type that was used.
   var credential = error.credential;
   // ...
  });
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);
      btnLogout.classList.remove('hide');
      sessionStorage.username = firebaseUser.email;
      //redirect
    } else {
      console.log('not logged in');
    }
  });
};

//WHEN the component mounts run all this crap
// Initialize Firebase
// handle any changes to the input fields
handleInputChange = event => {
// Pull the name and value properties off of the event.target (the element which triggered the event)
const { name, value } = event.target;

// Set the state for the appropriate input field
this.setState({
[name]: value
});
};

// When the form is submitted, prevent the default event and alert the username and password
handleFormSubmit = event => {
event.preventDefault();
alert(`Username: ${this.state.username}\nPassword: ${this.state.password}`);
this.setState({ username: "", password: "" });
};

render() {
return (
<div className="container">
<input id="email" name="email" type="text" value={this.state.email} onChange={this.handleInputChange} placeholder="Enter Email here"></input>
<input id="password" name="password" type="password" value={this.state.password} onChange={this.handleInputChange} placeholder="Enter Alphanumeric Password here"></input>
<br />
<button id="btnLogin" className="btn btn-action">Log In</button>

<button id="btnSignUp" className="btn btn-secondary">Sign Up</button>

<button type="button" className="btn btn-primary" onClick={this.signIn}><i className="fa fa-google-plus"></i> Sign-In With Google</button>
<button id="btnLogout" className="btn btn-action hide">Log Out</button>
</div>
);
}   
}

export default Auth;