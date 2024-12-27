import { db } from '../conn'; // Importando a instância do Firestore
import { collection, addDoc, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";

// Função para gerar código aleatório
function generateRandomCode(length) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Controlador para a biblioteca
const bibliotecaController = {
    // Criar um novo documento na coleção 'bibliotecas'
    create: async (req, res) => {
        try {
            const codigoAleatorio = generateRandomCode(6);

            // Criando o objeto de dados para enviar ao Firestore
            const bibliotecas = {
                nome: req.body.nome,
                autor: req.body.autor,
                categoria: req.body.categoria,
                tipo_arquivo: req.body.tipo_arquivo, // Alterado para 'tipo_arquivo'
                tamanho: req.body.tamanho,           // Incluindo o campo 'tamanho'
                codigo: codigoAleatorio,             // Código gerado automaticamente
            };

            // Adicionando o documento à coleção 'bibliotecas'
            const docRef = await addDoc(collection(db, "bibliotecas"), bibliotecas);
            res.status(201).json({ id: docRef.id, msg: "Biblioteca criada com sucesso" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    },

    // Recuperar todos os documentos da coleção 'bibliotecas'
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

    // Recuperar um documento específico da coleção 'bibliotecas' usando o ID
    get: async (req, res) => {
        try {
            const id = req.params.id;  // Alterado para 'id' conforme convenção de URL
            console.log(`Tentando recuperar o documento com ID: ${id}`);
            const docRef = doc(db, "bibliotecas", id);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                console.log(`Documento com ID ${id} não encontrado.`);
                res.status(404).json({ msg: "Livro não encontrado" });
                return;
            }

            res.json({ id: docSnap.id, ...docSnap.data() });
        } catch (error) {
            console.log(`Erro ao obter livro: ${error.message}`);
            res.status(500).json({ error: "Erro ao obter livro", details: error.message });
        }
    },

    // Atualizar um documento existente na coleção 'bibliotecas'
    update: async (req, res) => {
        const { idLivro } = req.params;
        const { nome, autor, categoria, tipo_arquivo, tamanho } = req.body; // Incluindo o tipo_arquivo e tamanho

        try {
            const docRef = doc(db, "bibliotecas", idLivro);
            await updateDoc(docRef, { nome, autor, categoria, tipo_arquivo, tamanho });
            res.status(200).json({ msg: "Livro atualizado com sucesso" });
        } catch (error) {
            console.error('Erro ao atualizar o livro:', error);
            res.status(500).send('Erro ao atualizar o livro');
        }
    }
};

export default bibliotecaController;