<template>
  <main id="recipes">
    <div class="container">
      <!-- <a href="" class="routerLink"><router-link to="/">Home</router-link></a>
      <a href="" class="routerLink"><router-link to="/spends">Despesas</router-link></a>
      <br/>
      <br/> -->
      <div class="col">
        <errors v-bind:errors="errors"></errors>
      </div>
      <card-form-list
      title="Receitas"
      v-bind:recipes="recipes"
      v-bind:capitals="capitals"
      v-on:saveItem="saveItem"
      v-on:removeItem="removeItem"
      v-on:addItem="addItem"
      >
      </card-form-list>
    </div>
  </main>
</template>

<script>
import Errors from './childs/errors/Errors';
import CardFormList from "./childs/CardFormList";
import RecipesController from "../controllers/Recipes";
import CapitalsController from "../controllers/Capitals";

export default {
  name: "Recipes",
  components: {
    Errors,
    CardFormList
  },
  data() {
    return {
      errors: [],
      recipes: [],
      capitals: [],
      recipesController: {},
      capitalsController: {},
    }
  },
  methods: {
    async saveItem(payload) {
      console.log("saveItem", payload);
      this.errors = [];
      if (!this.errors.length) {
        if (payload.id) {
          console.log("update");
          const response = await this.capitalsController.update(payload);
          if (response.error) this.errors.push(response.error);
          this.errors = [];
          this.generateCapitals();
        } else {
          console.log("create");
          const response = await this.capitalsController.create(payload);
          if (response.error) this.errors.push(response.error);
          this.errors = [];
          this.generateCapitals();
        }
      }
    },
    async removeItem(payload) {
      console.log("removeItem");
      const response = await this.capitalsController.remove(payload);
      if (response.error) this.error.push(response.error);
      this.generateCapitals();
    },
    async addItem(payload) {
      console.log("addItem");
      const response = await this.recipesController.create(payload);
      if (response.error) this.errors.push(response.error);
      this.generateRecipes();
    },
    async generateCapitals() {
      console.log("generateCapitals");
      this.capitalsController = new CapitalsController();
      const response = await this.capitalsController.getAll();
      if (response.error) this.errors.push(response.error);
      else this.capitals = response;
    },
    async generateRecipes() {
      console.log("generateRecipes");
      this.recipesController = new RecipesController();
      const response = await this.recipesController.getAll();
      if (response.error) this.errors.push(response.error);
      else this.recipes = response;
    }
  },
  created() {
    this.generateRecipes();
    this.generateCapitals();
  }
}
</script>

<style>
#recipes {
  margin: 60px;
}
.routerLink{
  margin-right: 8px;
}
</style>