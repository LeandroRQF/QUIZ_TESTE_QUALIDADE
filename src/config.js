const Rebase = require('re-base');
const firebase = require('firebase');

const FirebaseInfo = firebase.initializeApp({
    apiKey: "AIzaSyBf3rl5evZn4J_l9qkBCIeiNhxA6Z6VVEw",
    authDomain: "quiz-cartsys.firebaseapp.com",
    databaseURL: "https://quiz-cartsys.firebaseio.com",
    projectId: "quiz-cartsys",
    storageBucket: "quiz-cartsys.appspot.com",
    messagingSenderId: "796306827072"
})

const db = firebase.database(FirebaseInfo)
const config = Rebase.createClass(db)

export const providers = {
    'facebook': new firebase.auth.FacebookAuthProvider,
    'twitter': new firebase.auth.TwitterAuthProvider,
    'google': new firebase.auth.GoogleAuthProvider
}

export const auth = FirebaseInfo.auth();

export default config;