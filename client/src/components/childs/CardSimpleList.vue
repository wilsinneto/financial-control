<template>
  <main id="list">
    <div class="container">
      <label>
      Itens <span class="badge badge-info">{{ sortedItems.length }}</span>
    </label>
      <div class="card">
        <div class="card-body">
          <ul class="list-group">
            <li class="list-group-item">
              <div class="row">
                <div class="col-md-1 header-item"
                v-on:click="sort('id')">
                <b>Id</b>
                </div>
                <div class="col-md-5 header-item"
                v-on:click="sort('items.description')">
                <b>Descrição</b>
                </div>
                <div class="col-md-2 header-item"
                v-on:click="sort('value')">
                <b>Valor</b>
                </div>
                <div class="col-md-2 header-item"
                v-on:click="sort('date')">
                <b>Data</b>
                </div>
              </div>
            </li>
            <li class="list-group-item" v-for="item in sortedItems" v-bind:key="item.id">
              <div class="row">
                <div class="col-md-1">{{item.id}}</div>
                <div class="col-md-5">{{item.items.description}}</div>
                <div class="col-md-2">{{formatMoney(item.value)}}</div>
                <div class="col-md-2">{{item.date ? item.date.split("T")[0] : ""}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "List",
  props: ["items"],
  data() {
    return {
      currentSort: "date",
      currentSortDir: "DESC"
    }
  },
  computed: {
    sortedItems() {
      const elements = this.items
        .slice(0)
        .sort((a, b) => this.compareString(a, b));
      return elements;
    }
  },
  methods: {
    formatMoney(value) {
			const formatter = new Intl.NumberFormat("pt-BR", {
				style: "currency",
				currency: "BRL"
			});
			return formatter.format(value);
		},
    compareString(a, b) {
      let modifier = 1;
      if(this.currentSortDir === "DESC") modifier = -1;
      if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
      if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
      return 0;
    },
    sort(tab) {
      if(tab === this.currentSort)
        this.currentSortDir = this.currentSortDir === "ASC" ? "DESC" : "ASC";
      this.currentSort = tab;
    },
  }
}
</script>

<style>
.header-item {
  cursor: pointer;
  color: rgb(60, 60, 241);
}
</style>