import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBMOfBa0KbrYFk8luDCLy5c4d4SD4UFgZ0",
  authDomain: "fir-demo-cf32c.firebaseapp.com",
  projectId: "fir-demo-cf32c",
  storageBucket: "fir-demo-cf32c.firebasestorage.app",
  messagingSenderId: "843128927128",
  appId: "1:843128927128:web:e4412abb75d8281b79b1ed",
  measurementId: "G-QC11Z9SKSS"
};

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const db = getFirestore();

  export {db}