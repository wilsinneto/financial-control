<template>
  <div class="card">
    <div class="card-body">
      <ul class="list-group">
        <li class="list-group-item">
          <div class="row">
            <div
            class="col-md-1"
            v-on:click="sort('id')">
            <b class="header-item">Id</b>
            </div>
            <div
            class="col-md-2"
            v-on:click="sort('type')">
            <b class="header-item">Tipo</b>
            </div>
            <div
            class="col-md-9"
            v-on:click="sort('description')">
            <b class="header-item">Descrição</b>
            </div>
          </div>
        </li>
        <li class="list-group-item" v-for="item in sortedItems" v-bind:key="item.id">
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
  data() {
    return {
      currentSort:'id',
      currentSortDir:'ASC'
    }
  },
  computed: {
    sortedItems() {
      return this.items.slice(0).sort(this.compareString);
    }
  },
  methods: {
    compareString(a, b) {
      let modifier = 1;
      if(this.currentSortDir === 'DESC') modifier = -1;
      if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
      if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
      return 0;
    },
    sort(tab) {
      if(tab === this.currentSort)
        this.currentSortDir = this.currentSortDir === "ASC" ? "DESC" : "ASC";
      this.currentSort = tab;
    },
    updateItem(item) {
      console.log("CardSimpleFormList - updateItem");
      this.$emit("updateItem", item);
    },
    removeItem(item) {
      console.log("CardSimpleFormList - removeItem");
      this.$emit("removeItem", item);
    }
  }
}
</script>

<style>
.header-item {
  cursor: pointer;
  color: rgb(60, 60, 241);
}
</style>