<template>
  <main id="spends">
    <div class="container">
      <!-- <a href=""><router-link to="/">Home</router-link></a>
      <br/>
      <br/> -->
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
            <label>Expense</label>
            <select id="inputState" class="form-control" v-model="selected">
                <option disabled value="">Por favor, selecione um</option>
              <option v-for="expense in expenses" :key="expense.id">
                {{ expense.description }}
              </option>
            </select>
          </div>
          <div class="form-group col-md-1 btnAdd">
            &nbsp;
            <span
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#expenseAdd"
            >
              <i class="fa fa-plus"></i>
            </span>
          </div>
          <div class="modal fade" id="expenseAdd" tabindex="-1" role="dialog" aria-labelledby="expenseAddLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="expenseAddLabel">Adicionar Despesa</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="form-row">
                      <input type="text" class="form-control" v-model="expense.description" name="" id="">
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                  <button type="button" class="btn btn-primary" v-on:click.prevent="addExpense(expense)" data-dismiss="modal">Salvar</button>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group col-md-2">
            <label for="value">Valor</label>
            <input type="text" class="form-control" id="value" v-model="expense.value" placeholder="0.00">
          </div>
          <div class="form-group col-md-2">
            <label for="date">Data de pagamento</label>
            <input type="date" class="form-control" id="date" v-model="expense.date">
          </div>
          <div class="form-group col-md-2 btnAdd">
            <button type="submit" class="btn btn-primary" v-on:click.prevent="saveSpend(expense)">Salvar</button>
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
            <li class="list-group-item" v-for="spend in spends" v-bind:key="spend.id">
              <div class="row">
                <div class="col-md-1">{{spend.id}}</div>
                <div class="col-md-5">{{spend.expenses.description}}</div>
                <div class="col-md-2">{{spend.value}}</div>
                <div class="col-md-2">{{spend.date ? spend.date.split("T")[0] : ""}}</div>
                <div class="col-md-2 text-right">
                  <span
                    v-on:click="updateSpends(spend)"
                    class="btn btn-success"
                  >
                    <i class="fa fa-pencil"></i>
                  </span>
                  &nbsp;
                  <span
                    v-on:click="removeSpends(spend)"
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
import { validateInputFormExpenses } from "../validate/ExpenseValidate";
import { validateInputFormSpend } from "../validate/Spends";
import ExpensesController from "../controllers/Expenses";
import SpendsController from "../controllers/Spends";

export default {
  name: "Expenses",
  data() {
    return {
      errors: [],
      selected: "",
      expense: {
        description: "",
        value: "",
        date: Date
      },
      expenses: [],
      spends: [],
      expensesController: {},
      spendsController: {},
    }
  },
  methods: {
    async saveSpend(payload) {
      console.log("saveSpend");
      payload.description = this.selected;
      const { expense, errors } = validateInputFormSpend(payload);
      this.errors = errors;
      if (!errors.length) {
        if (payload.id) {
          const response = await this.spendsController.update(payload);
          if (response.error) this.errors = response.error;
          this.selected = "";
          this.expense = {};
          this.generateSpends();
        } else {
          const response = await this.spendsController.create(expense);
          if (response.error) this.errors = response.error;
          this.selected = "";
          this.expense = {};
          this.generateSpends();
        }
      }
    },
    async removeSpends(payload) {
      console.log("removeSpends");
      const response = await this.spendsController.remove(payload);
      if (response.error) this.error = response.error;
      this.generateSpends();
    },
    updateSpends(payload) {
      console.log("updateSpends");
      this.selected = payload.expenses.description;
      this.expense = payload;
    },
    async addExpense(payload) {
      console.log("addExpense");
      this.errors = [];
      const { expense, error } = validateInputFormExpenses(payload);
      this.errors.push(error);
      if (!error.length) {
        this.errors = [];
        this.expense.description = expense;
        const response = await this.expensesController.create(payload);
        if (response.error) this.errors = response.error;
        this.expense = {};
        this.generateExpenses();
      }      
    },
    async generateSpends() {
      console.log("generateSpends");
      const response = await this.spendsController.getAll();
      if (response.error) this.errors = response.error;
      else this.spends = response;
    },
    async generateExpenses() {
      console.log("generateExpenses");
      const response = await this.expensesController.getAll();
      if (response.error) this.errors = response.error;
      else this.expenses = response;
    }
  },
  created() {
    this.expensesController = new ExpensesController();
    this.spendsController = new SpendsController();
    this.generateExpenses();
    this.generateSpends();
  }
}
</script>

<style>
#spends {
  margin: 60px;
}
.btnAdd {
  margin-top: 32px;
}
#hidden{
  opacity: 0;
}
</style>