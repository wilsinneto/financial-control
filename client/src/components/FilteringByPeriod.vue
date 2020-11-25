<template>
  <main id="period">
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
        <div class="form-row text-center">
          <div class="form-group col-md-3 text-left">
            <label for="date">Data início:</label>
            <input type="date" class="form-control" id="date" v-model="expense.startDate">
          </div>
          <div class="form-group col-md-3 text-left">
            <label for="date">Até:</label>
            <input type="date" class="form-control" id="date" v-model="expense.endDate">
          </div>
          <div class="form-group col-md-2 text-left btnAdd">
            <button type="submit" class="btn btn-primary" v-on:click.prevent="filter(expense)">
              <i class="fa fa-search"></i>
            </button>
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
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { validateInputFormPeriod } from "../validate/PeriodValidate";
import FilteringByPeriodController from "../controllers/FilteringByPeriod";

export default {
  name: "Expense",
  data() {
    return {
      error: "",
      expense: {
        startDate: Date,
        endDate: Date
      },
      spends: [],
      spendsController: {},
    }
  },
  methods: {
    async filter(payload) {
      console.log("filter");
      const { error } = validateInputFormPeriod(payload);
      this.error = error;
      if (!error.length) {
        this.error = "";
        this.expense = payload;
        const filteringByPeriodController = new FilteringByPeriodController();
        const response = await filteringByPeriodController.getPeriod(payload);
        if (response.error) this.error = response.error;
        else this.spends = response;
      }
    }
  }
}
</script>

<style>
#period {
  margin: 60px;
}
.btnAdd {
  margin-top: 32px;
}
</style>