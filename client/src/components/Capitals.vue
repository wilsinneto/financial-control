<template>
  <main id="recipes">
    <div class="container">
      <a href=""><router-link to="/">Home</router-link></a>
      <br/>
      <br/>
      <div class="col">
          <div class="alert alert-danger" role="alert" v-if="errors.length">
            <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
            <ul>
              <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
            </ul>
          </div>
        </div>
      <form>
        <div class="form-row">
          <div class="form-group col-md-5">
            <label><router-link to="/recipes">Receita</router-link></label>
            <select id="inputState" class="form-control" v-model="selected">
                <option disabled value="">Por favor, selecione um</option>
              <option v-for="recipe in recipes" :key="recipe.id">
                {{ recipe.description }}
              </option>
            </select>
          </div>
          <div class="form-group col-md-1 btnAdd">
            &nbsp;
            <span
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#recipeAdd"
            >
              <i class="fa fa-plus"></i>
            </span>
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
                      <input type="text" class="form-control" v-model="recipe.description" name="" id="">
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                  <button type="button" class="btn btn-primary" v-on:click.prevent="addRecipe(recipe)" data-dismiss="modal">Salvar</button>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group col-md-2">
            <label for="value">Valor</label>
            <input type="text" class="form-control" id="value" v-model="recipe.value" placeholder="0.00">
          </div>
          <div class="form-group col-md-2">
            <label for="date">Data de recebimento</label>
            <input type="date" class="form-control" id="date" v-model="recipe.date">
          </div>
          <div class="form-group col-md-2 btnAdd">
            <button type="submit" class="btn btn-primary" v-on:click.prevent="saveRecipeWithCapitals(recipe)">Salvar</button>
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
                <div class="col-md-5">Descrição</div>
                <div class="col-md-2">Valor</div>
                <div class="col-md-2">Data</div>
              </div>
            </li>
            <li class="list-group-item" v-for="capital in capitals" v-bind:key="capital.id">
              <div class="row">
                <div class="col-md-1">{{capital.id}}</div>
                <div class="col-md-5">{{capital.recipes.description}}</div>
                <div class="col-md-2">{{capital.value}}</div>
                <div class="col-md-2">{{capital.date ? capital.date.split("T")[0] : ""}}</div>
                <div class="col-md-2 text-right">
                  <span
                    v-on:click="updateCapitals(capital)"
                    class="btn btn-success"
                  >
                    <i class="fa fa-pencil"></i>
                  </span>
                  &nbsp;
                  <span
                    v-on:click="removeCapitals(capital)"
                    class="btn btn-danger"
                  >
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
import { validateInputFormCapitals } from "../validate/RecipeWithCapitals";
import RecipesController from "../controllers/Recipes";
import CapitalsController from "../controllers/Capitals";

export default {
  name: "Recipes",
  data() {
    return {
      errors: [],
      selected: "",
      recipe: {
        description: "",
        value: "",
        date: Date
      },
      recipes: [],
      capitals: [],
      recipesController: {},
      capitalsController: {},
    }
  },
  methods: {
    async saveRecipeWithCapitals(payload) {
      console.log("saveRecipeWithCapitals");
      payload.description = this.selected;
      const { recipe, errors } = validateInputFormCapitals(payload);
      this.errors = errors;
      if (!errors.length) {
        if (payload.id) {
          const response = await this.capitalsController.update(payload);
          if (response.error) this.errors = response.error;
          this.selected = "";
          this.recipe = {};
          this.generateCapitals();
        } else {
          const response = await this.capitalsController.create(recipe);
          if (response.error) this.errors = response.error;
          this.selected = "";
          this.recipe = {};
          this.generateCapitals();
        }
      }
    },
    async removeCapitals(capitals) {
      console.log("removeCapitals");
      const response = await this.capitalsController.remove(capitals);
      if (response.error) this.error = response.error;
      this.generateCapitals();
    },
    updateCapitals(payload) {
      console.log("updateCapitals");
      this.selected = payload.recipes.description;
      this.recipe = payload;
    },
    async addRecipe(payload) {
      console.log("addRecipe");
      this.errors = [];
      const { recipe, error } = validateInputFormRecipes(payload);
      this.errors.push(error);
      if (!error.length) {
        this.errors = [];
        this.recipe.description = recipe;
        const response = await this.recipesController.create(payload);
        if (response.error) this.errors = response.error;
        this.recipe = {};
        this.generateRecipes();
      }      
    },
    async generateCapitals() {
      console.log("generateCapitals");
      const response = await this.capitalsController.getAll();
      if (response.error) this.errors = response.error;
      else this.capitals = response;
    },
    async generateRecipes() {
      const response = await this.recipesController.getAll();
      if (response.error) this.errors = response.error;
      else this.recipes = response;
    }
  },
  created() {
    this.recipesController = new RecipesController();
    this.capitalsController = new CapitalsController();
    this.generateRecipes();
    this.generateCapitals();
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
#hidden{
  opacity: 0;
}
</style>