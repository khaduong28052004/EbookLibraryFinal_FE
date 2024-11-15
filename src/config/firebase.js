import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCISCPnfCBXfT6Fmlls45EimGsU1uGqj1w",
    authDomain: "ebookstore-4fbb3.firebaseapp.com",
    projectId: "ebookstore-4fbb3",
    storageBucket: "ebookstore-4fbb3.appspot.com",
    messagingSenderId: "629403245239",
    appId: "1:629403245239:web:1e1fd89448e5c414374b32"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, app as default, storage, getDownloadURL, ref  };
