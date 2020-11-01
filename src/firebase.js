import firebase from 'firebase'

const firebaseConfig = {
    // add your firebase config
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore()

export default db;