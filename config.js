import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig ={
  apiKey: "AIzaSyA9-JL7zGuHwV0Vmd1tAN_5cacnuPN2acI",
  authDomain: "mobileproject-2d0b3.firebaseapp.com",
  projectId: "mobileproject-2d0b3",
  storageBucket: "mobileproject-2d0b3.appspot.com",
  messagingSenderId: "12953588136",
  appId: "1:12953588136:web:506aa352ff27e5e111cd9d",
  measurementId: "G-CX43W0L6E7"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export { firebase };