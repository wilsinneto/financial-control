<template>
  <main>
    <div class="col">
      <div class="alert alert-danger" role="alert" v-if="error.length">
        <b>{{ error }}</b>
      </div>
    </div>
    <form>
      <label>{{ type }}</label>
      <div class="form-row text-center">
        <div class="col-md-5 text-left">
          <input type="text" class="form-control" v-model="item.description" name="inputItem" id="inputItem">
        </div>
        <div class="col-md-1 text-left">
          <span class="btn btn-primary" v-on:click="saveItem(item)"><i class="fa fa-plus"></i></span>
        </div>
      </div>
    </form>
    <br/>
    <card-simple-form-list
    v-bind:items="items"
    v-on:updateItem="updateItem"
    v-on:removeItem="removeItem"
    ></card-simple-form-list>
  </main>
</template>

<script>
import { validateInputFormItems } from "@/utils/validate/ItemsValidate";
import CardSimpleFormList from './CardSimpleFormList.vue';

export default {
  components: { CardSimpleFormList },
  name: "CardFormSimple",
  props: ["type", "link", "items"],
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
    saveItem(item) {
      console.log("CardFormSimple - saveItem");
      this.error = "";
      const { newItem, error } = validateInputFormItems(item.description);
      this.error = error;
      if (!error.length) {
        this.$emit("saveItem", {
          id: item.id || "",
          type: this.type,
          description: newItem
          }
        );
        this.item.description = "";
      }
    },
  },
}
</script>

<style>
</style>