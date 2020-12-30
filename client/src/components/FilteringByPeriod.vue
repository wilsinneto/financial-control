<template>
  <main id="period">
    <div class="container">
      <section id="link">
        <a class="routerLink"><router-link to="/spends">Voltar</router-link></a>
      </section>
      <div class="col">
        <error v-bind:error="error"></error>
      </div>
      <div id="content">
        <form class="form-group">
          <dates v-on:filter="filter"></dates>
        </form>
        
        <card-simple-list
        v-bind:items="elements">
        </card-simple-list>
      </div>
    </div>
  </main>
</template>

<script>
import Error from "./childs/errors/Error.vue";
import Dates from "./childs/Dates.vue";
import CardSimpleList from "./childs/CardSimpleList.vue";
import { validateInputFormPeriod } from "@/utils/validate/PeriodValidate";
import ElementsService from "@/services/Elements";

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
        const elementsService = new ElementsService();
        const response = await elementsService.getPeriod(payload);
        if (response.error) this.error = response.error;
        else this.elements = response.filter(element => element.items.type === "Despesa");
      }
    }
  }
}
</script>

<style>
#period {
  margin-top: 60px;
}
#link {
  margin-left: 75px;
}
#content {
  margin: 60px;
}
</style>