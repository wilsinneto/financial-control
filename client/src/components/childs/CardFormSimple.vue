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
          <span class="btn btn-primary" v-on:click="saveItem(type, newItem)"><i class="fa fa-plus"></i></span>
        </div>
      </div>
    </form>
    <br/>
    <card-simple-form-list
    v-bind:items="items"
    v-on:updateItem="updateItem"
    v-on:removeItem="removeItem"
    ></card-simple-form-list>
  </div>
</template>

<script>
import { validateInputFormItems } from "@/utils/validate/ItemsValidate";
import CardSimpleFormList from './CardSimpleFormList.vue';

export default {
  components: { CardSimpleFormList },
  name: "Expense",
  props: ["type", "items"],
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
    async saveItem(type, payload) {
      console.log("saveItem");
      this.error = "";
      const { item, error } = validateInputFormItems(payload);
      this.error = error;
      if (!error.length) {
        this.newItem = "";
        if (payload.id) {
          console.log("update");
          this.$emit("updateItem", {
            type,
            description: item
          });
        } else {
          console.log("create");
          this.$emit("saveItem", {
            type,
            description: item
          });
        }
      }
    },
  },
}
</script>

<style>
</style>