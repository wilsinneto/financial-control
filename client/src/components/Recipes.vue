<template>
  <main id="recipes">
    <form>
      <div class="form-row">
        <div class="form-group col-md-5">
          <label for="inputState">Receita</label>
          <select id="inputState" class="form-control">
            <option active>Escolha...</option>
            <option v-for="recipe in recipes" :key="recipe.id">
              {{ recipe.description }}
            </option>
          </select>
        </div>
        <div class="form-group col-md-1 btnAdd">
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#recipeAdd">Add</button>
        </div>
        <div class="modal fade" id="recipeAdd" tabindex="-1" role="dialog" aria-labelledby="recipeAddLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="recipeAddLabel">Adicionar Receita</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-row">
                    <input type="text" class="form-control" v-model="newRecipe" name="" id="">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-primary" v-on:click.prevent="addNewRecipe()">Salvar</button>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group col-md-2">
          <label for="value">Valor</label>
          <input type="text" class="form-control" id="value" v-model="value">
        </div>
        <div class="form-group col-md-2">
          <label for="inputZip">Data de recebimento</label>
          <input type="date" class="form-control" id="date" v-model="date">
        </div>
      </div>
      <button type="submit" class="btn btn-primary" v-on:click.prevent="addNewRecipe()">Salvar</button>
    </form>
    <br/>
    <div class="card">
      <div class="card-body">
        <ul class="list-group">
          <li class="list-group-item disabled">
            <div class="row">
              <div class="col-md-1">Id</div>
              <div class="col-md-7">Descrição</div>
              <div class="col-md-2">Valor</div>
              <div class="col-md-2">Data</div>
            </div>
          </li>
          <li class="list-group-item" v-for="recipe in recipes" v-bind:key="recipe.id">
            <div class="row">
              <div class="col-md-1">{{recipe.id}}</div>
              <div class="col-md-5">{{recipe.description}}</div>
              <div class="col-md-2">{{recipe.value}}</div>
              <div class="col-md-2">{{recipe.date}}</div>
              <div class="col-md-2 text-right">
                <span
                  v-on:click="updateClient(recipe)"
                  class="operator badge badge-success"
                >
                  <i class="fa fa-pencil">U</i>
                </span>
                &nbsp;
                <span
                  v-on:click="removeClient(recipe)"
                  class="operator badge badge-danger"
                >
                  <i class="fa fa-trash">D</i>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "Recipes",
  data() {
    return {
      newRecipe: "",
      value: "",
      date: Date,
      recipes: [
        {id: 1, description: "Salário", value: 12.25, date: "10/05/1993"},
        {id: 2, description: "trabalho", value: 12.25, date: "10/05/1993"},
        {id: 3, description: "vale transporte", value: 12.25, date: "10/05/1993"}
      ]
    }
  },
  methods: {
    removeClient(recipe) {
      // kk
    },
    updateClient(recipe) {
      // this.
    },
    addNewRecipe() {
      let payload = {id: 0, description: this.newRecipe, value: this.value, date: this.date};
      console.log(payload);
      this.recipes.push(payload);
      this.newRecipe = "";
      this.value = "";
      this.date = "";
      payload = "";
    }
  }
}
</script>

<style>
#recipes {
  margin: 60px;
}
.btnAdd {
  margin-top: 32px;
}
</style>