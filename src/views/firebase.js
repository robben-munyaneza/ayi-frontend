import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCddmvYBUieb8dZVIcQLLVRhLa-xLQ298c",
  authDomain: "ayichat-879e1.firebaseapp.com",
  projectId: "ayichat-879e1",
  storageBucket: "ayichat-879e1.firebasestorage.app",
  messagingSenderId: "833543702694",
  appId: "1:833543702694:web:45150eb4528d27277f0c67",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const messagesRef = collection(db, "messages");
const storage = getStorage(app);

export { auth, provider, db, messagesRef, addDoc, onSnapshot, query, orderBy, storage, ref, uploadBytes, getDownloadURL };
