import firebase from 'firebase';
require('@firebase/firestore');

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDKfgFlqmVOxz9W36r0XhRsoehBcMfRZIg",
  authDomain: "bartersystem-ed499.firebaseapp.com",
  projectId: "bartersystem-ed499",
  storageBucket: "bartersystem-ed499.appspot.com",
  messagingSenderId: "44603227049",
  appId: "1:44603227049:web:e88822d5f4c0c5d0e5e2b8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();