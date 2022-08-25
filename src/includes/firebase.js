import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyByk1W5Ousc4XWhYtHrnyDFMB2b9_3xzK0",
    authDomain: "musicapp-6de5e.firebaseapp.com",
    projectId: "musicapp-6de5e",
    storageBucket: "musicapp-6de5e.appspot.com",
    appId: "1:401453675251:web:1b122b9cf464943a8d7d86"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const usersCollection = db.collection('users-collection');

export {
    auth,
    db,
    usersCollection
}
