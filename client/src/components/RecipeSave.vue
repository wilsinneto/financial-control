<template>
  <main id="recipes">
    <div class="container">
      <form>
        <div class="form-row text-center">
          <div class="col-md-5">
            <input type="text" class="form-control" v-model="recipe" name="" id="">
          </div>
          <div class="col-md-1">
            <button type="submit" class="btn btn-primary" v-on:click.prevent="addRecipe(recipe)">Salvar</button>
          </div>
        </div>
      </form>
      <br/>
      <div class="card">
        <div class="card-body">
          <ul class="list-group">
            <li class="list-group-item disabled">
              <div class="row">
                <div class="col-md-1">Id</div>
                <div class="col-md-11">Descrição</div>
              </div>
            </li>
            <li class="list-group-item" v-for="recipe in recipes" v-bind:key="recipe.id">
              <div class="row">
                <div class="col-md-1">{{recipe.id}}</div>
                <div class="col-md-11">{{recipe.description}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "Recipes",
  data() {
    return {
      recipe: "",
      recipes: [
        {id: 1, description: "Salário"},
        {id: 2, description: "trabalho"},
        {id: 3, description: "vale transporte"}
      ]
    }
  },
  methods: {
    addRecipe(recipe) {
      let payload = {id: 4, description: recipe};
      this.recipes.push(payload);
      this.recipe = "";
      this.payload = "";
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