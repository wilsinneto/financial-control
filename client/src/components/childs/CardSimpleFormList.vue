<template>
  <div class="card">
    <div class="card-body">
      <ul class="list-group">
        <li class="list-group-item disabled">
          <div class="row">
            <div class="col-md-1">Id</div>
            <div class="col-md-2">Tipo</div>
            <div class="col-md-9">Descrição</div>
          </div>
        </li>
        <li class="list-group-item" v-for="item in items" v-bind:key="item.id">
          <div class="row">
            <div class="col-md-1">{{item.id}}</div>
            <div class="col-md-2">{{item.type}}</div>
            <div class="col-md-7">{{item.description}}</div>
            <div class="col-md-2 text-right">
              <span class="btn btn-success" v-on:click="updateItem(item)">
                <i class="fa fa-pencil"></i>
              </span>
              &nbsp;
              <span class="btn btn-danger" v-on:click="removeItem(item)">
                <i class="fa fa-trash"></i>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardSimpleFormList",
  props: ["items"],
  methods: {
    updateItem(payload) {
      console.log("updateItem");
      this.$emit("updateItem", payload);
    },
    removeItem(payload) {
      console.log("removeItem");
      this.$emit("removeItem", payload);
    }
  }
}
</script>

<style>
</style>