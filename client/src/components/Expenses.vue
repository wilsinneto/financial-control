<template>
  <main id="expenses">
    <div class="container">
      <a href=""><router-link to="/spends">Voltar</router-link></a>
      <br/>
      <br/>
      <div class="col">
        <div class="alert alert-danger" role="alert" v-if="error.length">
          <b>{{ error }}</b>
        </div>
      </div>
      <form>
        <label for="inputExpense">Despesas</label>
        <div class="form-row text-center">
          <div class="col-md-5 text-left">
            <input type="text" class="form-control" v-model="expense.description" name="inputExpense" id="inputExpense">
          </div>
          <div class="col-md-1 text-left">
            <span class="btn btn-primary" v-on:click="addExpense(expense)"><i class="fa fa-plus"></i></span>
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
            <li class="list-group-item" v-for="expense in expenses" v-bind:key="expense.id">
              <div class="row">
                <div class="col-md-1">{{expense.id}}</div>
                <div class="col-md-9">{{expense.description}}</div>
                <div class="col-md-2 text-right">
                    <span class="btn btn-success" v-on:click="updateExpense(expense)">
                      <i class="fa fa-pencil"></i>
                    </span>
                    &nbsp;
                    <span class="btn btn-danger" v-on:click="removeExpense(expense)">
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
import { validateInputFormExpenses } from "../utils/validate/ExpenseValidate";
import ExpensesController from "../controllers/Expenses";

export default {
  name: "Expense",
  data() {
    return {
      error: "",
      expense: {
        description: ""
      },
      expenses: [],
      expensesController: {},
    }
  },
  methods: {
    updateExpense(payload) {
      this.expense = payload;
    },
    async removeExpense(payload) {
      const response = await this.expensesController.remove(payload);
      if (response.error) this.error = response.error;
      this.generateExpenses();
    },
    async addExpense(payload) {
      console.log("addExpense");
      const { expense, error } = validateInputFormExpenses(payload);
      this.error = error;
      if (!error.length) {
        payload.description = expense;
        if (payload.id) {
          const response = await this.expensesController.update(payload);
          if (response.error) this.error = response.error;
          this.expense = {};
          this.generateExpenses();
        } else {
          const response = await this.expensesController.create(payload);
          if (response.error) this.error = response.error;
          this.expense = {};
          this.generateExpenses();
        }
      }
    },
    async generateExpenses() {
      this.expensesController = new ExpensesController();
      const response = await this.expensesController.getAll();
      if (response.error) this.error = response.error;
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