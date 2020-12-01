<template>
  <main id="expenses">
    <div class="container">
      <!-- <a href=""><router-link to="/spends">Voltar</router-link></a>
      <br/>
      <br/> -->
      <div class="col">
        <errors v-bind:errors="errors"></errors>
      </div>

      <card-form-simple
      v-bind:items="expenses"
      v-on:removeItem="removeItem"
      v-on:saveItem="saveItem"
      ></card-form-simple>
    </div>
  </main>
</template>

<script>
import ExpensesController from "../controllers/Expenses";
import CardFormSimple from './childs/CardFormSimple.vue';
import Errors from './childs/errors/Errors.vue';

export default {
  components: { CardFormSimple, Errors },
  name: "Expense",
  data() {
    return {
      errors: [],
      expenses: [],
      expensesController: {},
    }
  },
  methods: {
    async removeItem(payload) {
      const response = await this.expensesController.remove(payload);
      if (response.error) this.errors.push(response.error);
      else this.generateExpenses();
    },
    async saveItem(payload) {
      console.log("saveItem");
      if (payload.id) {
        const response = await this.expensesController.update(payload);
        if (response.error) this.errors.push(response.error);
        else this.generateExpenses();
      } else {
        const response = await this.expensesController.create(payload);
        if (response.error) this.errors.push(response.error);
        else this.generateExpenses();
      }
    },
    async generateExpenses() {
      this.expensesController = new ExpensesController();
      const response = await this.expensesController.getAll();
      if (response.error) this.errors.push(response.error);
      else this.expenses = response;
    }
  },
  created() {
    this.generateExpenses();
  }
}
</script>

<style>
#expenses {
  margin: 60px;
}
</style>