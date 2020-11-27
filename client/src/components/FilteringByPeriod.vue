<template>
  <main id="period">
    <div class="container">
      <!-- <a href=""><router-link to="/spends">Voltar</router-link></a>
      <br/>
      <br/> -->
      <div class="col">
        <error v-bind:error="error"></error>
      </div>
      <form>
        <dates v-on:filter="filter"></dates>
      </form>
      <br/>
      <card-list-period v-bind:items="spends"></card-list-period>
    </div>
  </main>
</template>

<script>
import Error from './childs/Error.vue';
import Dates from "./childs/Dates.vue";
import CardListPeriod from "./childs/CardSimpleList.vue";
import { validateInputFormPeriod } from "../utils/validate/PeriodValidate";
import FilteringByPeriodController from "../controllers/FilteringByPeriod";

export default {
  name: "Period",
  components: {
    Error,
    Dates,
    CardListPeriod
  },
  data() {
    return {
      error: "",
      spends: [],
    }
  },
  methods: {
    async filter(payload) {
      console.log("filter");
      const { error } = validateInputFormPeriod(payload);
      this.error = error;
      if (!error.length) {
        this.error = "";
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