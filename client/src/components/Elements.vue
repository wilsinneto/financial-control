<template>
  <main id="elements">
      <div class="col">
        <errors v-bind:errors="errors"></errors>
      </div>

      <form-modal
      v-bind:title="type"
      v-bind:link="link"
      v-bind:items="items"
      v-bind:elements="elements"
      v-on:removeItem="removeItem"
      v-on:saveItem="saveItem"
      v-on:addItem="addItem"
      ></form-modal>
  </main>
</template>

<script>
import Errors from "./childs/errors/Errors.vue";
import FormModal from "./childs/FormModal";
import ItemsController from "@/controllers/Items";
import ElementsController from "@/controllers/Elements";

export default {
  name: "Elements",
  props: ["type", "link"],
  components: {
    Errors,
    FormModal
  },
  data() {
    return {
      errors: [],
      items: [],
      elements: [],
      itemsController: {},
      elementsController: {},
    }
  },
  methods: {
    async saveItem(item) {
      console.log("Elements - save");
      if (item.id) {
        console.log("update");
        const response = await this.elementsController.update(item);
        this.responseIsError(response);
        this.errors = [];
        this.generateElements();
      } else {
        console.log("create");
        const response = await this.elementsController.create(item);
        this.responseIsError(response);
        this.errors = [];
        this.generateElements();
      }
    },
    async removeItem(item) {
      console.log("removeItem");
      const response = await this.elementsController.remove(item);
      this.responseIsError(response);
      this.generateElements();
    },
    async addItem(item) {
      console.log("addItem");
      const response = await this.itemsController.create(item);
      this.responseIsError(response);
      this.generateItems();
    },
    async generateElements() {
      console.log("generateElements");
      this.elementsController = new ElementsController();
      const response = await this.elementsController.getAll();
      this.responseIsError(response);
      this.runningOperationElements(response, this.type);
    },
    async generateItems() {
      console.log("generateItems");
      this.itemsController = new ItemsController();
      const response = await this.itemsController.getAll();
      this.responseIsError(response);
      this.runningOperationItems(response, this.type);
    },
    runningOperationElements(response, type) {
      if (!response) this.generateItems();
      else this.elements = response.filter(element => element.items.type === type);
    },
    runningOperationItems(response, type) {
      if (!response) this.generateItems();
      else this.items = response.filter(item => item.type === type);
    },
    responseIsError(response) {
      if (response.error) this.errors.push(response.error)
    }
  },
  created() {
    this.generateItems();
    this.generateElements();
  }
}
</script>

<style>
#elements {
  margin: 60px;
}
.routerLink {
  margin-right: 8px;
}
.period {
  margin-left: 30px;
}
</style>