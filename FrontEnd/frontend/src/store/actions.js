// store/actions.js
export default {
  async fetchLivros({ commit }) {
    try {
      const response = await axios.get("http://localhost:8000/api/bibliotecas");
      commit("SET_LIVROS", response.data);
    } catch (error) {
      console.error("Erro ao obter os livros:", error);
    }
  },

  async criarLivro({ dispatch }, novoLivro) {
    try {
      await axios.post("http://localhost:8000/api/bibliotecas", novoLivro);
      dispatch("fetchLivros");
    } catch (error) {
      console.error("Erro ao adicionar o livro:", error);
    }
  },
  async deletarLivro({ commit }, livroId) {
    try {
      // Fazendo a chamada para deletar o livro na API
      await axios.delete(`http://localhost:8000/api/bibliotecas/${livroId}`);
      
      // Chama a mutação para remover o livro da lista local
      commit("REMOVER_LIVRO", livroId);
      
      // Não exiba o alerta aqui, mas sim no componente
    } catch (error) {
      console.error("Erro ao deletar livro:", error);
      throw error; // Lança o erro para que possa ser tratado onde a ação é chamada
    }
  }
};
