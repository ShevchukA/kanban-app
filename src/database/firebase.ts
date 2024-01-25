// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; //API for Firestore realtime database

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkyZ8C0HPQKPEFyKgFfgSS7xGqBUAkZL8",
  authDomain: "my-kanban-e646e.firebaseapp.com",
  databaseURL:
    "https://my-kanban-e646e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-kanban-e646e",
  storageBucket: "my-kanban-e646e.appspot.com",
  messagingSenderId: "904966879179",
  appId: "1:904966879179:web:9b0947f3a898af6dae284e",
};

// Initialize firebase app.
const app = initializeApp(firebaseConfig);
// Initialize firebase database and get the reference of firebase database object.
const db = getDatabase(app);

export default db;
