<template>
  <main id="spends">
    <div class="container">
      <!-- <a class="routerLink"><router-link to="/">Home</router-link></a>
      <a class="routerLink"><router-link to="/capitals">Capitals</router-link></a>
      <a class="period"><router-link to="/period">Buscar por data</router-link></a>
      <br/>
      <br/> -->
      <div class="col">
        <errors v-bind:errors="errors"></errors>
      </div>
      
      <card-form-list
      title="Despesas"
      v-bind:recipes="expenses"
      v-bind:capitals="spends"
      v-on:saveItem="saveItem"
      v-on:removeItem="removeItem"
      v-on:addItem="addItem"
      ></card-form-list>
    </div>
  </main>
</template>

<script>
import Errors from './childs/errors/Errors.vue';
import CardFormList from './childs/CardFormList.vue';
import ExpensesController from "../controllers/Expenses";
import SpendsController from "../controllers/Spends";

export default {
  name: "Expenses",
  components: {
    Errors,
    CardFormList
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
      console.log("saveItem", payload);
      this.errors = [];
      if (!this.errors.length) {
        if (payload.id) {
          console.log("update", payload);
          const response = await this.spendsController.update(payload);
          if (response.error) this.errors.push(response.error);
          this.errors = [];
          this.generateSpends();
        } else {
          console.log("create", payload);
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