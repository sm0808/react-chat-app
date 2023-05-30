// firebaseConfig.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBYTTbLB4GwTrQwp8lAcZjkJBeAOc5EpyY",
  authDomain: "react-chat-e712c.firebaseapp.com",
  projectId: "react-chat-e712c",
  storageBucket: "react-chat-e712c.appspot.com",
  messagingSenderId: "183938694247",
  appId: "1:183938694247:web:0d090a941642023a4568c2"
};

firebase.initializeApp(firebaseConfig);
export default firebase;