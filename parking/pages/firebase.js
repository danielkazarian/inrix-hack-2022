import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqmk0pIsgEHQjmje31HTS5ZSRhghPrtGQ",
  authDomain: "mapproject-37be8.firebaseapp.com",
  projectId: "mapproject-37be8",
  storageBucket: "mapproject-37be8.appspot.com",
  messagingSenderId: "584278297073",
  appId: "1:584278297073:web:32cc3dca41b48634e45c50",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

