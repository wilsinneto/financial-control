<template>
  <main id="items">
    <div class="container">
      <!-- <a href=""><router-link to="/spends">Voltar</router-link></a>
      <br/>
      <br/> -->
      <div class="col">
        <errors v-bind:errors="errors"></errors>
      </div>

      <card-form-simple
      v-bind:type="type"
      v-bind:items="items"
      v-on:removeItem="removeItem"
      v-on:saveItem="saveItem"
      ></card-form-simple>
    </div>
  </main>
</template>

<script>
import ItemsController from "../controllers/Items";
import CardFormSimple from './childs/CardFormSimple.vue';
import Errors from './childs/errors/Errors.vue';

export default {
  name: "Expenses",
  props: ["type"],
  components: { CardFormSimple, Errors },
  data() {
    return {
      errors: [],
      items: [],
      itemsController: {},
    }
  },
  methods: {
    async removeItem(item) {
      console.log("removeItem");
      const response = await this.itemsController.remove(item);
      this.getResponseAndRunningOperation(response);
    },
    async saveItem(item) {
      console.log("Item - save");
      if (item.id) {
        console.log("update");
        const response = await this.itemsController.update(item);
        this.getResponseAndRunningOperation(response);
      } else {
        console.log("create");
        const response = await this.itemsController.create(item);
        this.getResponseAndRunningOperation(response);
      }
    },
    async generateItems() {
      console.log("generatItems");
      this.itemsController = new ItemsController();
      const response = await this.itemsController.getAll();
      this.getResponseAndRunningOperation(response, this.type);
    },
    getResponseAndRunningOperation(response, type) {
      if (response.error) this.errors.push(response.error);
      else {
        if (type) this.items = response.filter(item => item.type === this.type);
        else this.generateItems();
      }
    }
  },
  created() {
    this.generateItems();
  }
}
</script>

<style>
#items {
  margin: 60px;
}
</style>