import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {

  apiKey: "AIzaSyCyc9FQ5M9O6oomu1Cd6Fq4ONsEpCHWXSo",

  authDomain: "whisperr-1d7b4.firebaseapp.com",

  projectId: "whisperr-1d7b4",

  storageBucket: "whisperr-1d7b4.appspot.com",

  messagingSenderId: "26152658395",

  appId: "1:26152658395:web:a06b438d77f01760ec73fe",

  measurementId: "G-4G5VFY37MW"

};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const authFirebase = getAuth(app);

export { authFirebase };
