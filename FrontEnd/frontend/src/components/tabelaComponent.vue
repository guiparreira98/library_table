<template>
  <div class="container">
    <h1>Lista de Livros</h1>
    <div class="filtrarContainer">
      <form @submit.prevent="submitForm">
        <label id="label_categoria" for="category">Filtrar por Categoria:</label>
        <select v-model="categoriaSelecionada">
          <option v-for="(category, index) in uniqueCategories" :key="index" :value="category">
            {{ category }}
          </option>
        </select>
        <button class="filtrar-1 btn btn-primary" @click="filtrarCategoria">
          Filtrar
        </button>

        <label for="fileType">Filtrar por Tipo de Arquivo:</label>
        <select v-model="tipoSelecionado" id="fileType">
          <option value="Digital">Digital</option>
          <option value="Físico">Físico</option>
        </select>
        <button class="filtrar-2 btn btn-primary" @click="filtrarPorTipoArquivo">
          Filtrar
        </button>

        <label for="bookName">Filtrar por Nome do Livro:</label>
        <input type="text" v-model="nomeSelecionado" id="bookName" placeholder="" />
        <button class="filtrar-3 btn btn-primary no-transition" @click="filtrarPorNome">
          Filtrar
        </button>
      </form>
    </div>

    <div id="mainButton">
      <button class="limpar_Filtro btn btn-primary no-transition" @click="limparFiltros">
        Limpar Filtro
      </button>
      <button class="relatorio btn btn-primary no-transition" @click="gerarRelatorio">
        Gerar Relatorio
      </button>
    </div>

    <div id="container">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Autor</th>
            <th>Categoria</th>
            <th>Tipo de Arquivo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(livro, index) in livrosFiltrados" :key="index">
            <td id="nome">
              <template v-if="!livro.editando">{{ livro.nome }}</template>
              <input v-else v-model="livro.nome" />
            </td>
            <td id="autor">
              <template v-if="!livro.editando">{{ livro.autor }}</template>
              <input v-else v-model="livro.autor" />
            </td>
            <td id ="categoria">
              <template v-if="!livro.editando">{{ livro.categoria }}</template>
              <input v-else v-model="livro.categoria" />
            </td>
            <td>
              <template v-if="!livro.editando">{{ livro.tipo_arquivo }}</template>
              <input v-else v-model="livro.tipo_arquivo" />
            </td>
            <td>
              
  
              <button @click="deletarlivro(livro.id)">Deletar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabelaComponent",
  data() {
    return {
      categoriaSelecionada: "",
      nomeSelecionado: "",
      tipoSelecionado: "",
      uniqueCategories: []
    };
  },
  computed: {
    livrosFiltrados() {
      return this.$store.getters.getLivrosFiltrados;
    },
  },
  mounted() {
  this.$store.dispatch('fetchLivros')
    .then(() => {
      this.$store.commit('SET_LIVROS_FILTRADOS', this.$store.state.livros);
      this.uniqueCategories = this.getUniqueCategories(this.$store.state.livros);
    })
    .catch((error) => {
      console.error('Erro ao carregar os livros:', error);
    });
},
methods: {
  getUniqueCategories(livros) {
    const categories = livros.map(livro => livro.categoria);
    return [...new Set(categories)];
  },
  filtrarCategoria() {
    if (!this.categoriaSelecionada.trim()) {
      alert("Por favor, selecione uma categoria antes de filtrar.");
      return;
    }
    this.$store.commit("FILTRAR_LIVROS_POR_CATEGORIA", this.categoriaSelecionada);
  },
  filtrarPorTipoArquivo() {
    if (!this.tipoSelecionado.trim()) {
      alert("Por favor, selecione um tipo de arquivo antes de filtrar.");
      return;
    }
    this.$store.commit("FILTRAR_LIVROS_POR_TIPO_ARQUIVO", this.tipoSelecionado);
  },
  filtrarPorNome() {
    if (!this.nomeSelecionado.trim()) {
      alert("Por favor, digite um nome antes de filtrar.");
      return;
    }
    this.$store.commit("FILTRAR_LIVROS_POR_NOME", this.nomeSelecionado);
    if (this.livrosFiltrados.length === 0) {
      alert("Nenhum livro encontrado com esse nome.");
    }
  },
  limparFiltros() {
    this.categoriaSelecionada = "";
    this.nomeSelecionado = "";
    this.tipoSelecionado = "";
    this.$store.commit("RESETAR_FILTROS");
  },
  deletarlivro(livroId) {
    console.log("Livro ID recebido:", livroId);
    // Chama a ação 'deletarLivro' passando o livroId
    this.$store
      .dispatch("deletarLivro", livroId)
      .then(() => {
        console.log("Livro deletado com sucesso");
        this.uniqueCategories = this.getUniqueCategories(this.$store.state.livros);
      })
      .catch((error) => {
        console.error("Erro ao deletar livro:", error);
      });
  },
},

};
</script>

<style scoped>
/*Mobile First*/
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid grey;
}

form {
  margin-bottom: 20px;
}
label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  font-size: 17px;
}

#label_categoria {
  margin-top: 23px;
}

select {
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border-radius: 4px;
  border: 1px solid #cccccc;
}

input {
  width: 99%;
  padding: 8px;
  margin-bottom: 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.btn {
  width: 25%;
  background-color: black;
  padding: 5px;
}



.filtrarContainer {
  background-color: bisque;
  padding: 10px;
}

.btn-primary{
    border-color:black;
}


body .btn-primary:focus,
body .btn-primary:active {
  background-color: #1a1a1a;
  border-color: #1a1a1a;
}


.btn-primary:hover {
  background-color: #1a1a1a;
  border-color: #1a1a1a;
}



.filtrar-1 {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.filtrar-2 {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.filtrar-3 {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

#mainButton {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.limpar_Filtro {
  padding: 5px;
  width: 34%;
  height: 40px;
  font-size: 15px;
  display: flex;
  align-items: center;
}

.relatorio {
  padding: 5px;
  width: 42%;
  height: 40px;
  font-size: 16px;
  display: flex;
  align-items: center;
}

#container {
  overflow: auto;
  margin-top: 30px;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 12px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 12px;
}

button {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: black;
  color: #fff;
  margin-top: 5px;
}

table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

table th {
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  padding: 8px;
  font-weight: bold;
}

/*Tablet CSS*/
@media only screen and (min-width: 768px) {
  select {
    display: flex;
    flex-direction: column;
    width: 300px;
  }
  input {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 8px;
    margin-bottom: 12px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  label {
    font-size: 19px;
  }

  .filtrarContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: bisque;
    padding: 20px 5px 5px 5px;
  }

  .filtrar-1 {
    width: 50%;
    font-size: 19px;
  }



  .filtrar-2 {
    width: 50%;
    font-size: 19px;
  }

  .filtrar-3 {
    width: 50%;
    font-size: 19px;
  }

  .limpar_Filtro {
    padding: 5px;
    width: 34%;
    height: 40px;
    font-size: 19px;
    display: flex;
    align-items: center;
  }

  .relatorio {
    padding: 5px;
    width: 42%;
    height: 40px;
    font-size: 19px;
    display: flex;
    align-items: center;
  }

  th {
    font-size: 20px;
  }

  td {
    font-size: 20px;
  }
}

/*DESKTOP CSS*/

@media only screen and (min-width: 1024px) {
  select {
    width: 263px;
  }

  input{
    width: 100%;
  }

  label{
    font-size: 21px;
  }

  .limpar_Filtro {
    width: 25%;
    font-size: 21px;
    padding: 3px 0 3px 0;
  }

  .relatorio {
    width: 25%;
    font-size: 21px;
    padding: 3px 0 3px 0;
  }


}
</style>
