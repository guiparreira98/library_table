import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    livros: [], // Inicializando com um array vazio
    livrosFiltrados: [],
    uniqueCategories: [] // Adicionando o estado para categorias únicas
  },
  mutations: {
    SET_LIVROS(state, data) {
      state.livros = data;
      console.log("Livros carregados:", state.livros);
    },
    FILTRAR_LIVROS_POR_CATEGORIA(state, categoriaSelecionada) {
      console.log("Categoria selecionada:", categoriaSelecionada);
      state.livrosFiltrados = state.livros.filter(
        (livro) => livro.categoria === categoriaSelecionada
      );
      console.log("Livros filtrados:", state.livrosFiltrados);
    },
    RESETAR_FILTROS(state) {
      state.livrosFiltrados = state.livros;
    },
    SET_LIVROS_FILTRADOS(state, livros) {
      state.livrosFiltrados = livros;
    },
    FILTRAR_LIVROS_POR_NOME(state, nomeLivro) {
      state.livrosFiltrados = state.livros.filter((livro) =>
        livro.nome.toLowerCase().includes(nomeLivro.toLowerCase())
      );
    },
    FILTRAR_LIVROS_POR_TIPO_ARQUIVO(state, tipoSelecionado) {
      console.log("Valor selecionado para filtrar:", tipoSelecionado);
      if (tipoSelecionado === "") {
        state.livrosFiltrados = state.livros;
      } else {
        state.livrosFiltrados = state.livros.filter(
          (livro) => livro.tipo_arquivo.toLowerCase() === tipoSelecionado.toLowerCase()
        );
      }
      console.log("Livros filtrados por tipo:", state.livrosFiltrados);
    },
    REMOVER_LIVRO(state, livroId) {
      // Remove o livro da lista de todos os livros
      state.livros = state.livros.filter(livro => livro.id !== livroId);
      
      // Remove o livro da lista de livros filtrados
      state.livrosFiltrados = state.livrosFiltrados.filter(livro => livro.id !== livroId);
    },
    ATUALIZAR_CATEGORIAS_UNICAS(state) {
      const categorias = state.livros.map(livro => livro.categoria);
      state.uniqueCategories = [...new Set(categorias)];
    }
  },
  actions: {
    async fetchLivros({ commit }) {
      try {
        const response = await axios.get("http://localhost:8000/api/bibliotecas");
        console.log("Dados recebidos:", response.data);
        commit("SET_LIVROS", response.data); // Preenchendo o estado com os dados recebidos
        commit("ATUALIZAR_CATEGORIAS_UNICAS");
        return response.data; // Retorne os dados ou a Promise
      } catch (error) {
        console.error("Erro ao obter livros:", error);
        throw error; // Lança o erro para que possa ser tratado onde a ação é chamada
      }
    },
    async deletarLivro({ commit }, livroId) {
      try {
        // Envia a solicitação para deletar o livro na API
        await axios.delete(`http://localhost:8000/api/bibliotecas/${livroId}`);
    
        // Chama a mutação para remover o livro da lista local
        commit("REMOVER_LIVRO", livroId);
        commit("ATUALIZAR_CATEGORIAS_UNICAS");
    
        // Exibe a mensagem de sucesso
        alert("Livro deletado com sucesso!");
      } catch (error) {
        console.error("Erro ao deletar livro:", error);
      }
    }
  },
  getters: {
    getLivros: (state) => state.livros,
    getLivrosFiltrados: (state) => state.livrosFiltrados,
    uniqueCategories: (state) => state.uniqueCategories
  },
});