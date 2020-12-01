<template>
  <div class="container">
    <div class="col">
      <div class="alert alert-danger" role="alert" v-if="error.length">
        <b>{{ error }}</b>
      </div>
    </div>
    <form>
      <label for="inputExpense">Despesas</label>
      <div class="form-row text-center">
        <div class="col-md-5 text-left">
          <input type="text" class="form-control" v-model="newItem" name="inputExpense" id="inputExpense">
        </div>
        <div class="col-md-1 text-left">
          <span class="btn btn-primary" v-on:click="saveItem(newItem)"><i class="fa fa-plus"></i></span>
        </div>
      </div>
    </form>
    <br/>
    <card-simple-list-2
    v-bind:items="items"
    v-on:updateItem="updateItem"
    v-on:removeItem="removeItem"
    ></card-simple-list-2>
  </div>
</template>

<script>
import { validateInputFormExpenses } from "@/utils/validate/ExpenseValidate";
import CardSimpleList2 from './CardSimpleList2.vue';

export default {
  components: { CardSimpleList2 },
  name: "Expense",
  props: ["items"],
  data() {
    return {
      error: "",
      newItem: ""
    }
  },
  methods: {
    updateItem(payload) {
      this.newItem = payload.description;
    },
    async removeItem(payload) {
      console.log("removeItem");
      this.$emit("removeItem", payload);
    },
    async saveItem(payload) {
      console.log("saveItem");
      this.error = "";
      const { expense, error } = validateInputFormExpenses(payload);
      this.error = error;
      if (!error.length) {
        this.newItem = "";
        if (payload.id) {
          console.log("update");
          this.$emit("updateItem", expense)
        } else {
          console.log("create");
          this.$emit("saveItem", expense)
        }
      }
    },
  },
}
</script>

<style>
</style>