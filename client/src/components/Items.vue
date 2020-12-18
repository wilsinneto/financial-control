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
import { mapState, mapActions } from "vuex";
import CardFormSimple from './childs/CardFormSimple.vue';
import Errors from './childs/errors/Errors.vue';

export default {
  name: "Items",
  props: ["type", "link"],
  components: { CardFormSimple, Errors },
  methods: {
    ...mapActions(["removeItem", "saveItem", "generateItems"]),
  },
  computed: {
    ...mapState(["errors", "items"])
  },
  created() {
    this.generateItems(this.type);
  }
}
</script>

<style>
#items {
  margin: 60px;
}
</style>