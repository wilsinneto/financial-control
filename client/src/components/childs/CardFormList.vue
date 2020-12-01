<template>
  <div class="container">
    <br/>
    <div class="card">
      <div class="card-body">
        <ul class="list-group">
          <li class="list-group-item disabled">
            <div class="row">
              <div class="col-md-1">Id</div>
              <div class="col-md-5">Descrição</div>
              <div class="col-md-2">Valor</div>
              <div class="col-md-2">Data</div>
            </div>
          </li>
          <li class="list-group-item" v-for="item in items" v-bind:key="item.id">
            <div class="row">
              <div class="col-md-1">{{item.id}}</div>
              <!-- with Capitals.vue use bellow -->
              <!-- <div class="col-md-5">{{item.recipes.description}}</div> -->
              <div class="col-md-5">{{item.expenses.description}}</div>
              <div class="col-md-2">{{item.value}}</div>
              <div class="col-md-2">{{item.date ? item.date.split("T")[0] : ""}}</div>
              <div class="col-md-2 text-right">
                <span
                  v-on:click="updateItem(item)"
                  class="btn btn-success"
                >
                  <i class="fa fa-pencil"></i>
                </span>
                &nbsp;
                <span
                  v-on:click="removeItem(item)"
                  class="btn btn-danger"
                >
                  <i class="fa fa-trash"></i>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Recipes",
  props: ["items"],
  data() {
    return {
      item: {
        description: "",
        value: "",
        date: Date
      },
    }
  },
  methods: {
    removeItem(payload) {
      console.log("remove", payload);
      this.$emit("removeItem", payload);
    },
    updateItem(payload) {
      console.log("updateItem");
      this.$emit("updateItem", payload);
    },
  }
}
</script>

<style>
</style>