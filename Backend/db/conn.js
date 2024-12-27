// backend/db/conn.js
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyD-nlvvpEn9Nu7BNHptCNO9ne3Cc9C9E04",
  authDomain: "library-88e21.firebaseapp.com",
  projectId: "library-88e21",
  storageBucket: "library-88e21.firebasestorage.app",
  messagingSenderId: "899744141356",
  appId: "1:899744141356:web:6a456392ac8207fa9bc189"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Obter a instância do Firestore
const db = getFirestore(app);

console.log("Conexão com Firebase Firestore estabelecida com sucesso!");

module.exports = { db }; // Exportar a instância do Firestore
