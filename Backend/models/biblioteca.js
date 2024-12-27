import { db } from '../conn'; // Importando a instância do Firestore
import { collection, addDoc, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";

// Controlador de biblioteca para Firestore
const bibliotecaController = {
    create: async (req, res) => {
        try {
            const codigoAleatorio = generateRandomCode(6);

            // Criando o objeto de dados com base na requisição
            const bibliotecas = {
                nome: req.body.nome,
                autor: req.body.autor,
                categoria: req.body.categoria,
                codigo: codigoAleatorio,
                tipo: req.body.tipo,
                tamanho: req.body.tamanho,
            };

            // Adicionando o documento à coleção 'bibliotecas' no Firestore
            const docRef = await addDoc(collection(db, "bibliotecas"), bibliotecas);
            res.status(201).json({ id: docRef.id, msg: "Categoria criada com sucesso" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    },

    getAll: async (req, res) => {
        try {
            const querySnapshot = await getDocs(collection(db, "bibliotecas"));
            const bibliotecas = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            res.json(bibliotecas);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Erro ao obter bibliotecas" });
        }
    },

    get: async (req, res) => {
        try {
            const id = req.params.id;  // Obtendo o 'id' da URL
            const docRef = doc(db, "bibliotecas", id);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                res.status(404).json({ msg: "Livro não encontrado" });
                return;
            }

            res.json({ id: docSnap.id, ...docSnap.data() });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Erro ao obter livro", details: error.message });
        }
    },

    update: async (req, res) => {
        const { idLivro } = req.params;
        const { nome, autor, categoria, tipo } = req.body;

        try {
            const docRef = doc(db, "bibliotecas", idLivro);
            await updateDoc(docRef, { nome, autor, categoria, tipo });
            res.status(200).json({ msg: "Livro atualizado com sucesso" });
        } catch (error) {
            console.error('Erro ao atualizar o livro:', error);
            res.status(500).send('Erro ao atualizar o livro');
        }
    }
};

// Função para gerar um código aleatório
function generateRandomCode(length) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export default bibliotecaController;
