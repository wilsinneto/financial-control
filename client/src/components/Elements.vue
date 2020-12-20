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
      v-on:removeItem="removeElement"
      v-on:saveItem="beforeSaveElement"
      v-on:addItem="beforeSaveItem"
      ></form-modal>
  </main>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Errors from "./childs/errors/Errors.vue";
import FormModal from "./childs/FormModal";

export default {
  name: "Elements",
  props: ["type", "link"],
  components: {
    Errors,
    FormModal
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(["errors", "items", "elements"])
  },
  methods: {
    ...mapActions(["saveItem", "saveElement", "removeElement", "generateItems", "generateElements"]),

    beforeSaveElement(item) {
      console.log("saveElement");
      this.saveElement({item, type:this.type});
    },
    beforeSaveItem(item) {
      console.log("saveItem");
      this.saveItem({description: item, type: this.type});
    },
  },
  created() {
    this.generateItems(this.type);
    this.generateElements(this.type);
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