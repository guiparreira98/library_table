<template>
  <div class="form-container">
    <form @submit.prevent="createLivro">
      <div class="input-container">
        <label for="nome">Nome do Livro:</label>
        <input
          class="input form-control"
          type="text"
          id="nome"
          name="nome"
          v-model="nome"
          placeholder="Digite o nome do Livro"
        />
      </div>
      <div class="input-container">
        <label for="autor">Nome do Autor:</label>
        <input
          class="input form-control"
          type="text"
          id="autor"
          name="autor"
          v-model="autor"
          placeholder="Digite o Autor"
        />
      </div>
      <div class="input-container">
        <label for="categoria">Categoria:</label>
        <input
          class="input form-control"
          type="text"
          id="categoria"
          name="categoria"
          v-model="categoria"
          placeholder="Digite a categoria"
        />
      </div>
      <div class="input-container">
        <label for="tipo">Tipo de arquivo (Físico/Digital):</label>
        <select
          class="input form-control"
          id="tipo"
          name="tipo"
          v-model="tipo_arquivo"
        >
          <option value="Digital">Digital</option>
          <option value="Físico">Físico</option>
        </select>
      </div>

      <div id="button">
        <button class="btn btn-primary btn-lg btn-dark" type="submit">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "FormComponent",
  data() {
    return {
      nome: null,
      autor: null,
      categoria: null,
      tipo_arquivo: null,
      tamanho: null,
    };
  },
  watch: {
    tipo_arquivo(novoValor) {
      if (novoValor !== null && novoValor.toLowerCase() === "digital") {
        this.tamanho = this.gerarTamanhoDigital();
      } else if (novoValor !== null && novoValor.toLowerCase() === "fisico") {
        this.tamanho = this.gerarTamanhoFisico();
      }
    },
  },
  methods: {
    gerarTamanhoDigital() {
      const fileSize1 = Math.floor(Math.random() * 100) + 1;
      return `${fileSize1} MB`;
    },
    gerarTamanhoFisico() {
      const fileSize2 = (Math.random() * 1 + 0.5).toFixed(2);
      return `${fileSize2} kg`;
    },
    async createLivro() {
      try {
        if (!this.nome || !this.autor || !this.categoria || !this.tipo_arquivo) {
          alert("Preencha todos os campos: nome, autor, categoria e tipo de arquivo.");
          return;
        }

        // Gera o tamanho automaticamente se não estiver definido
        if (!this.tamanho) {
          if (this.tipo_arquivo.toLowerCase() === "digital") {
            this.tamanho = this.gerarTamanhoDigital();
          } else if (this.tipo_arquivo.toLowerCase() === "fisico") {
            this.tamanho = this.gerarTamanhoFisico();
          }
        }

        const data = {
          nome: this.nome,
          autor: this.autor,
          categoria: this.categoria,
          tipo_arquivo: this.tipo_arquivo,
          tamanho: this.tamanho,
        };

        const response = await fetch("http://localhost:8000/api/bibliotecas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          alert("Livro criado com sucesso!");

          // Adicionando o novo livro na lista local (caso esteja usando Vuex ou dados locais)
          this.$store.dispatch("fetchLivros");

          // Resetando os campos do formulário
          this.nome = null;
          this.autor = null;
          this.categoria = null;
          this.tipo_arquivo = null;
          this.tamanho = null;
        } else {
          throw new Error("Erro ao criar livro");
        }
      } catch (error) {
        console.error("Erro ao criar livro:", error);
      }
    },
  },
};
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  padding: 100px;
  background-color: bisque;
}

.input-container {
  font-size: 25px;
  width: 100%;
  margin-bottom: 12px;
  margin-top: 20px;
  margin-left: 10px;
}

.input {
  margin-top: 15px;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border-color: black;
}

#button {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
}
</style>
