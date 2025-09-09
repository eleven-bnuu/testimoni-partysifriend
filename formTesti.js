// =========================
// Import Firebase
// =========================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// =========================
// Firebase Config
// =========================
const firebaseConfig = {
  apiKey: "AIzaSyC-fmzG1Uy8h7-D1Dp3YV1DqrdXceCdKww",
  authDomain: "testi-partysifriend.firebaseapp.com",
  projectId: "testi-partysifriend",
  storageBucket: "testi-partysifriend.appspot.com",
  messagingSenderId: "631802844071",
  appId: "1:631802844071:web:f8d5da58d42703c4981c82",
  measurementId: "G-M6TZTDGDXY"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// =========================
// Form Submit
// =========================
const form = document.getElementById("formTesti");
const msgSuccess = document.getElementById("msgSuccess");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const pesan = document.getElementById("pesan").value.trim();

  if (!nama || !pesan) {
    alert("Nama dan ulasan wajib diisi!");
    return;
  }

  try {
    await addDoc(collection(db, "testimoni"), {
      nama,
      pesan,
      createdAt: serverTimestamp()
    });

    form.reset();
    msgSuccess.classList.remove("hidden");
    msgSuccess.textContent = "✅ Testimoni berhasil dikirim!";
    setTimeout(() => msgSuccess.classList.add("hidden"), 3000);

  } catch (err) {
    console.error("Error submit:", err);
    alert("Gagal kirim testimoni, coba lagi!");
  }
});
