// Initialize Firebase
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
  promise.catch(e => console.log(e.message));
});

// On click sign up
btnSignUp.addEventListener('click', e => {
  // Get email and password
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  // Create user
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
});

// Sign in function to provide on click for google sign-in
function signIn() {
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
  } else {
    console.log('not logged in');
  }
});

};
