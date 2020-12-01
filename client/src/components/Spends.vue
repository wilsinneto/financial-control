<template>
  <main id="spends">
      <!-- <a class="routerLink"><router-link to="/">Home</router-link></a>
      <a class="routerLink"><router-link to="/capitals">Capitals</router-link></a>
      <a class="period"><router-link to="/period">Buscar por data</router-link></a>
      <br/>
      <br/> -->
      <div class="col">
        <errors v-bind:errors="errors"></errors>
      </div>

      <form-modal
      title="Receitas"
      v-bind:items="expenses"
      v-bind:spends="spends"
      v-on:removeItem="removeItem"
      v-on:saveItem="saveItem"
      v-on:addItem="addItem"
      ></form-modal>
  </main>
</template>

<script>
import Errors from './childs/errors/Errors.vue';
import FormModal from "./childs/FormModal";
import ExpensesController from "../controllers/Expenses";
import SpendsController from "../controllers/Spends";

export default {
  name: "Expenses",
  components: {
    Errors,
    FormModal
  },
  data() {
    return {
      errors: [],
      expenses: [],
      spends: [],
      expensesController: {},
      spendsController: {},
    }
  },
  methods: {
    async saveItem(payload) {
      console.log("saveItem");
      this.errors = [];
      if (!this.errors.length) {
        if (payload.id) {
          console.log("update");
          const response = await this.spendsController.update(payload);
          if (response.error) this.errors.push(response.error);
          this.errors = [];
          this.generateSpends();
        } else {
          console.log("create");
          const response = await this.spendsController.create(payload);
          if (response.error) this.errors.push(response.error);
          this.errors = [];
          this.generateSpends();
        }
      }
    },
    async removeItem(payload) {
      console.log("removeItem");
      const response = await this.spendsController.remove(payload);
      if (response.error) this.errors.push(response.error);
      this.generateSpends();
    },
    async addItem(payload) {
      console.log("addItem");
      const response = await this.expensesController.create(payload);
      if (response.error) this.errors.push(response.error);
      this.generateExpenses();
    },
    async generateSpends() {
      console.log("generateSpends");
      this.spendsController = new SpendsController();
      const response = await this.spendsController.getAll();
      if (response.error) this.errors.push(response.error);
      else this.spends = response;
    },
    async generateExpenses() {
      console.log("generateExpenses");
      this.expensesController = new ExpensesController();
      const response = await this.expensesController.getAll();
      if (response.error) this.errors.push(response.error);
      else this.expenses = response;
    }
  },
  created() {
    this.generateExpenses();
    this.generateSpends();
  }
}
</script>

<style>
#spends {
  margin: 60px;
}
.routerLink {
  margin-right: 8px;
}
.period {
  margin-left: 30px;
}
</style>