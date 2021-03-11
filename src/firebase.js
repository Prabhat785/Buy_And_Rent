// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyC1y759fUv8JDcAZwpOJWAY8jD_YsEJOrY",
    authDomain: "brdo-9e825.firebaseapp.com",
    projectId: "brdo-9e825",
    storageBucket: "brdo-9e825.appspot.com",
    messagingSenderId: "584229244802",
    appId: "1:584229244802:web:342c429cf621d7f731099b",
    measurementId: "G-90Z55NRZDS"
  };
  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebaseApp.auth();
  export{db,auth};