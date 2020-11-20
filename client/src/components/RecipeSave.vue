<template>
  <main id="recipes">
    <div class="container">
      <div class="col">
        <div class="alert alert-danger" role="alert" v-if="errors.length">
          <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
          <ul>
            <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
          </ul>
        </div>
      </div>
      <form>
        <div class="form-row text-center">
          <div class="col-md-5 text-left">
            <!-- <label for="inputRecipe">Receita</label> -->
            <input type="text" class="form-control" v-model="recipe" name="inputRecipe" id="inputRecipe" placeholder="Adicione nova receita">
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
import { validateInputForm } from "../validate/RecipeValidate";
import RecipesController from '../controllers/Recipes';

export default {
  name: "Recipes",
  data() {
    return {
      errors: [],
      recipe: "",
      recipes: []
    }
  },
  methods: {
    addRecipe(newRecipe) {
      const { recipe, errors } = validateInputForm(newRecipe);
      this.errors = errors;
      if (!errors.length) {
        let payload = {id: 4, description: recipe};
        this.recipes.push(payload);
        this.recipe = "";
        this.payload = "";
      }
    },
    async generateRecipes() {
      const recipesController = new RecipesController();
      const recipes = await recipesController.getAll();
      // console.log(recipes);
      this.recipes = recipes;
    },
  },
  created() {
    this.generateRecipes();
  },
}
</script>

<style>
#recipes {
  margin: 60px;
}
</style>