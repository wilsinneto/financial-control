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
          <input type="text" class="form-control" v-model="item.description" name="inputExpense" id="inputExpense">
        </div>
        <div class="col-md-1 text-left">
          <span class="btn btn-primary" v-on:click="saveItem(type, item)"><i class="fa fa-plus"></i></span>
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
      item: {
        type: "",
        description: ""
      }
    }
  },
  methods: {
    updateItem(item) {
      this.item = item;
    },
    removeItem(item) {
      console.log("CardFormSimple - removeItem");
      this.$emit("removeItem", item);
    },
    saveItem(type, item) {
      console.log("CardFormSimple - saveItem");
      this.error = "";
      const { newItem, error } = validateInputFormItems(item.description);
      this.error = error;
      if (!error.length) {
        this.item.description = "";
        item.type = type;
        item.description = newItem;
        this.$emit("saveItem", item);
      }
    },
  },
}
</script>

<style>
</style>