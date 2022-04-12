import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



const firebaseConfig = {
  apiKey: "AIzaSyDgU8vd61c8GVd0p7i2iAc0K5euFR6_Dzw",
  authDomain: "medidorsmart.firebaseapp.com",
  projectId: "medidorsmart",
  storageBucket: "medidorsmart.appspot.com",
  messagingSenderId: "355604186626",
  appId: "1:355604186626:web:ea875e3cfc92c03e61091b",
  measurementId: "G-35WTLE8796"
};



if(!firebase.apps.length){ 
  firebase.initializeApp(firebaseConfig);
}

export default firebase; 