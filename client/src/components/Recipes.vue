<template>
  <main id="recipes">
    <div class="container">
      <!-- <a href=""><router-link to="/capitals">Voltar</router-link></a>
      <br/>
      <br/> -->
      <div class="col">
        <div class="alert alert-danger" role="alert" v-if="error.length">
          <b>{{ error }}</b>
        </div>
      </div>
      <form>
        <label for="inputRecipe">Receita</label>
        <div class="form-row text-center">
          <div class="col-md-5 text-left">
            <input type="text" class="form-control" v-model="recipe.description" name="inputRecipe" id="inputRecipe">
          </div>
          <div class="col-md-1 text-left">
            <span class="btn btn-primary" v-on:click="addRecipe(recipe)"><i class="fa fa-plus"></i></span>
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
                <div class="col-md-9">{{recipe.description}}</div>
                <div class="col-md-2 text-right">
                    <span class="btn btn-success" v-on:click="updateRecipe(recipe)">
                      <i class="fa fa-pencil"></i>
                    </span>
                    &nbsp;
                    <span class="btn btn-danger" v-on:click="removeRecipe(recipe)">
                      <i class="fa fa-trash"></i>
                    </span>
                  </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { validateInputFormRecipes } from "../validate/RecipeValidate";
import RecipesController from '../controllers/Recipes';

export default {
  name: "Recipes",
  data() {
    return {
      error: "",
      recipe: {
        description: ""
      },
      recipes: [],
      recipesController: {},
    }
  },
  methods: {
    async updateRecipe(payload) {
      this.recipe = payload;
    },
    async removeRecipe(payload) {
      const response = await this.recipesController.remove(payload);
      if (response.error) this.error = response.error;
      this.generateRecipes();
    },
    async addRecipe(payload) {
      console.log("addRecipe", payload);
      const { recipe, error } = validateInputFormRecipes(payload);
      this.error = error;
      if (!error.length) {
        payload.description = recipe;
        if (payload.id) {
          console.log("recipe", payload.description);
          const response = await this.recipesController.update(payload);
          if (response.error) this.error = response.error;
          this.recipe = {};
          this.generateRecipes();
        } else {
          console.log("recipe", payload.description);
          const response = await this.recipesController.create(payload);
          if (response.error) this.error = response.error;
          this.recipe = {};
          this.generateRecipes();
        }
      }
    },
    async generateRecipes() {
      const response = await this.recipesController.getAll();
      if (response.error) this.error = response.error;
      else this.recipes = response;
    },
  },
  created() {
    this.recipesController = new RecipesController();
    this.generateRecipes();
  },
}
</script>

<style>
#recipes {
  margin: 60px;
}
</style>