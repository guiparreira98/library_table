// store/mutations.js
export const mutations = {
  SET_LIVROS(state, livros) {
    state.livros = livros;
  },
  FILTRAR_LIVROS_POR_CATEGORIA(state, categoriaSelecionada) {
    state.livrosFiltrados = state.livros.filter(livro => livro.categoria === categoriaSelecionada);
  },
  RESETAR_FILTROS(state) {
    state.livrosFiltrados = state.livros;
  },
  SET_LIVROS_FILTRADOS(state, livros) {
    state.livrosFiltrados = livros;
  },
  FILTRAR_LIVROS_POR_NOME(state, nome) {
    if (nome.trim() !== '') {
      state.livrosFiltrados = state.livros.filter(livro => livro.nome.toLowerCase().includes(nome.toLowerCase()));
    } else {
      alert("Favor Digitar um livro");
      state.livrosFiltrados = state.livros;
    }
  },
  FILTRAR_LIVROS_POR_TIPO_ARQUIVO(state, tipoSelecionado) {
    state.livrosFiltrados = state.livros.filter(livro => livro.tipo_arquivo.toLowerCase() === tipoSelecionado.toLowerCase());
  },
  REMOVER_LIVRO(state, livroId) {
    // Remove o livro da lista de todos os livros
    state.livros = state.livros.filter(livro => livro.id !== livroId);
    
    // Remove o livro da lista de livros filtrados
    state.livrosFiltrados = state.livrosFiltrados.filter(livro => livro.id !== livroId);
  }
};
