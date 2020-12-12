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
      <card-simple-list v-bind:items="elements"></card-simple-list>
    </div>
  </main>
</template>

<script>
import Error from './childs/errors/Error.vue';
import Dates from "./childs/Dates.vue";
import CardSimpleList from "./childs/CardSimpleList.vue";
import { validateInputFormPeriod } from "../utils/validate/PeriodValidate";
import ElementsController from "../controllers/Elements";

export default {
  name: "Period",
  components: {
    Error,
    Dates,
    CardSimpleList
  },
  data() {
    return {
      error: "",
      elements: [],
    }
  },
  methods: {
    async filter(payload) {
      console.log("filter");
      const { error } = validateInputFormPeriod(payload);
      this.error = error;
      if (!error.length) {
        this.error = "";
        const elementsController = new ElementsController();
        const response = await elementsController.getPeriod(payload);
        if (response.error) this.error = response.error;
        else this.elements = response.filter(element => element.items.type === "Despesa");
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