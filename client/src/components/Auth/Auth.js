import React, { Component } from "react";
import firebase from 'firebase'
import API from "../../utils/API";
import "./Auth.css";

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
  .then(()=>{
      sessionStorage.username = email;
      window.location.replace(window.location.href + "categories");
      }
    );
  API.checkUser({ username: email });
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
  .then(()=>{
    sessionStorage.username = email
    window.location.replace(window.location.href + "categories");
    });
  API.checkUser({ username: email });
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
   API.checkUser({ username: user.email });
   console.log(user.email);
   // ...
   window.location.replace(window.location.href + "categories");
  }).catch(function(error) {
   // Handle Errors here.
   var errorCode = error.code;
   var errorMessage = error.message;
   // The email of the user's account used.
   var email = error.email;
   // The firebase.auth.AuthCredential type that was used.
   var credential = error.credential;
   API.checkUser({ username: email });
   // ...
  });
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);
      //btnLogout.classList.remove('hide');
      sessionStorage.username = firebaseUser.email;
      API.checkUser({ username: firebaseUser.email });
      // window.location.replace(window.location.href + "categories");
    } else {
      console.log('not logged in');
      sessionStorage.username = null;
    }
  });
};

// loadUser = () => {
//     API.checkUser(sessionStorage.username)
//     .then((res)=>{ 
//       if(res.username){
//         categorySelect = res;
//         this.setState({ username: email});
//       }
//     });
//   };

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
<div className="container" id="wrapper" className="text-center">
<input id="email" name="email" type="text" value={this.state.email} onChange={this.handleInputChange} placeholder="Email"></input><br />
<input id="password" name="password" type="password" value={this.state.password} onChange={this.handleInputChange} placeholder="Password"></input>
<br />
<button id="btnLogin" className="btn btn-action">Log In</button>

<button id="btnSignUp" className="btn btn-secondary">Sign Up</button><br />

<button type="button" className="btn btn-primary" onClick={this.signIn}><i className="fa fa-google-plus"></i> Sign-In With Google</button>
</div>
);
}   
}

export default Auth;