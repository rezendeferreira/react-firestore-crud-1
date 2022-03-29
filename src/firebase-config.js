import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "REACT_APP_API_KEY",
    authDomain: "REACT_APP_AUTH_DOMAIN",
    projectId: "project-mygag",
    storageBucket: "REACT_APP_STORAGE_BUCKET",
    messagingSenderId: "REACT_APP_MESSAGING_SENDER_ID",
    appId: "REACT_APP_APP_ID",
    measurementId: "REACT_APP_MEASUREMENTID_ID"
  };
  
  const app = initializeApp(firebaseConfig)

  export const db = getFirestore(app);

  