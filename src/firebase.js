// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAMsumLMznPe7En37z3MoALqc3ljEl9UQE",
  authDomain: "whatsapp-clone-50709.firebaseapp.com",
  projectId: "whatsapp-clone-50709",
  storageBucket: "whatsapp-clone-50709.appspot.com",
  messagingSenderId: "1078055880892",
  appId: "1:1078055880892:web:36d3402c8694e8475ea8b9",
  measurementId: "G-KLJHC7TSPK"
};

const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();

export{auth,provider};
export default db;
