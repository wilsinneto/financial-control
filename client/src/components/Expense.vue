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
      type="Despesa"
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
  name: "Expense",
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
      if (response.error) this.errors.push(response.error);
      else this.generateItems();
    },
    async saveItem(item) {
      console.log("Item - save");
      if (item.id) {
        console.log("update");
        const response = await this.itemsController.update(item);
        if (response.error) this.errors.push(response.error);
        else this.generateItems();
      } else {
        console.log("create");
        const response = await this.itemsController.create(item);
        if (response.error) this.errors.push(response.error);
        else this.generateItems();
      }
    },
    async generateItems() {
      console.log("generatItems");
      this.itemsController = new ItemsController();
      const response = await this.itemsController.getAll();
      if (response.error) this.errors.push(response.error);
      else this.items = response;
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