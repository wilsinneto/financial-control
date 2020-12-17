<template>
  <main id="items">
    <div class="container">
      <div class="col">
        <errors v-bind:errors="errors"></errors>
      </div>

      <card-form-simple
      v-bind:type="type"
      v-bind:link="link"
      v-bind:items="items"
      v-on:removeItem="removeItem"
      v-on:saveItem="saveItem"
      ></card-form-simple>
    </div>
  </main>
</template>

<script>
import CardFormSimple from './childs/CardFormSimple.vue';
import Errors from './childs/errors/Errors.vue';

export default {
  name: "Items",
  props: ["type", "link"],
  components: { CardFormSimple, Errors },
  data() {
    return {}
  },
  methods: {
    async removeItem(item) {
      this.$store.dispatch("removeItem", { item, type: this.type });
    },
    async saveItem(item) {
      this.$store.dispatch("saveItem", { item, type: this.type });
    },
    async generateItems() {
      this.$store.dispatch("generateItems", this.type);
    }
  },
  computed: {
    errors() {
      return this.$store.state.errors;
    },
    items() {
      return this.$store.state.items;
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