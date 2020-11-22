<template>
  <main id="recipes">
    <div class="col">
        <div class="alert alert-danger" role="alert" v-if="error.length">
          <b>{{ error }}</b>
        </div>
      </div>
    <form>
      <div class="form-row">
        <div class="form-group col-md-5">
          <label for="inputState">Receita</label>
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
          <label for="inputZip">Data de recebimento</label>
          <input type="date" class="form-control" id="date" v-model="recipe.date">
        </div>
        <div class="form-group col-md-2 btnAdd">
          <button type="submit" class="btn btn-primary" v-on:click.prevent="saveRecipe(recipe)">Salvar</button>
        </div>
      </div>
    </form>
    <br/>
    <!-- <div class="card">
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
          <li class="list-group-item" v-for="recipe in recipes" v-bind:key="recipe.id">
            <div class="row">
              <div class="col-md-1">{{recipe.id}}</div>
              <div class="col-md-5">{{recipe.description}}</div>
              <div class="col-md-2">{{recipe.value}}</div>
              <div class="col-md-2">{{recipe.date}}</div>
              <div class="col-md-2 text-right">
                <span
                  v-on:click="updateRecipe(recipe)"
                  class="btn btn-success"
                >
                  <i class="fa fa-pencil"></i>
                </span>
                &nbsp;
                <span
                  v-on:click="removeRecipe(recipe)"
                  class="btn btn-danger"
                >
                  <i class="fa fa-trash"></i>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div> -->
  </main>
</template>

<script>
import { validateInputForm } from "../validate/RecipeValidate";
import RecipesController from "../controllers/Recipes";

export default {
  name: "Recipes",
  data() {
    return {
      error: "",
      selected: "",
      recipe: {
        description: "",
        value: "",
        date: Date
      },
      recipes: [],
      recipesDatas: [
        {id: 1, description: "Salário", value: 12.25, date: "10/05/1993"},
        {id: 2, description: "trabalho", value: 12.25, date: "10/05/1993"},
        {id: 3, description: "vale transporte", value: 12.25, date: "10/05/1993"}
      ],
      recipesController: {}
    }
  },
  methods: {
    saveRecipe(payload) {
      console.log("saveRecipe");
      this.error = "";

      if (this.selected.length) {
        console.log("payload", payload);
      } else {
        this.error = "Por favor, selecione uma receita.";
      }
    },
    // removeRecipe(recipe) {
    //   // kk
    // },
    // updateRecipe(recipe) {
    //   // this.
    // },
    async addRecipe(payload) {
      // this.errorInputRecipe = "";
      console.log("addRecipe");
      const { recipe, error } = validateInputForm(payload);
      this.error = error;
      if (!error.length) {
        this.recipe.description = recipe;
        const response = await this.recipesController.create(payload);
        if (response.error) this.error = response.error;
        this.recipe = {};
        this.generateRecipes();
      }      
    },
    async generateRecipes() {
      const response = await this.recipesController.getAll();
      if (response.error) this.error = response.error;
      else this.recipes = response;
    }
  },
  created() {
    this.recipesController = new RecipesController();
    this.generateRecipes();
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