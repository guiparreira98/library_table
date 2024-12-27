const router = require("express").Router();
const { doc, deleteDoc, collection, addDoc, getDocs, updateDoc } = require("firebase/firestore");
const { db } = require('../db/conn'); // Importando a conexão com o Firestore

// Rota POST para criar uma nova biblioteca
router.post("/bibliotecas", async (req, res) => {
  try {
    const { nome, autor, categoria, tipo_arquivo, tamanho } = req.body;
    if (!nome || !autor || !categoria || !tipo_arquivo) {
      return res.status(400).send({ message: "Todos os campos são obrigatórios" });
    }

    const docRef = await addDoc(collection(db, "bibliotecas"), {
      nome,
      autor,
      categoria,
      tipo_arquivo,
      tamanho,
    });

    res.status(200).send({ message: "Livro criado com sucesso!", id: docRef.id });
  } catch (error) {
    console.error("Erro ao criar livro:", error);
    res.status(500).send({ message: "Erro ao criar livro", error: error.message });
  }
});

// Rota GET para obter todas as bibliotecas
router.get("/bibliotecas", async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "bibliotecas"));
    const bibliotecas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(bibliotecas);
  } catch (error) {
    console.error("Erro ao buscar bibliotecas:", error);
    res.status(500).send("Erro ao buscar bibliotecas");
  }
});

// Rota DELETE para excluir uma biblioteca
router.delete("/bibliotecas/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const docRef = doc(db, "bibliotecas", id);
    await deleteDoc(docRef);
    res.status(200).send("Livro removido com sucesso");
  } catch (error) {
    console.error("Erro ao excluir o livro:", error);
    res.status(500).send("Erro ao excluir o livro");
  }
});

// Rota PATCH para atualizar uma biblioteca
router.patch("/bibliotecas/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const docRef = doc(db, "bibliotecas", id);
    await updateDoc(docRef, updates);
    res.status(200).send("Livro atualizado com sucesso");
  } catch (error) {
    console.error("Erro ao atualizar o livro:", error);
    res.status(500).send("Erro ao atualizar o livro");
  }
});

module.exports = router;