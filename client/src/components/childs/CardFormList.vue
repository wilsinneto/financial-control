<template>
  <div class="container">
    <br/>
    <div class="form-row">
      <div class="col-md-5">
        <input
        type="text"
        name="filter"
        class="form-control"
        v-model="filter"
        placeholder="O que você está procurando?"
        >
      </div>
    </div>
    <br/>
    <label>
      Itens <span class="badge badge-info">{{ filteredItems.length }}</span>
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
          <li class="list-group-item" v-for="item in filteredItems" v-bind:key="item.id">
            <div class="row">
              <div class="col-md-1">{{item.id}}</div>
              <div class="col-md-5">{{item.items.description}}</div>
              <div class="col-md-2">{{formatMoney(item.value)}}</div>
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
  name: "CardFormList",
  props: ["items"],
  data() {
    return {
      currentSort: "date",
      currentSortDir: "DESC",
      filter: "",
      item: {
        description: "",
        value: "",
        date: Date,
      },
    }
  },
  computed: {
    filteredItems() {
      const elements = this.items
        .filter(element => this.normalizeItems(element))
        .sort((a, b) => this.compareString(a, b));
      return elements;
    }
  },
  methods: {
    normalizeItems(element) {
      let elementNormalize = "";
        elementNormalize = element
        .items.description.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .includes(this.filter.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
      return elementNormalize;
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
    formatMoney(value) {
			const formatter = new Intl.NumberFormat("pt-BR", {
				style: "currency",
				currency: "BRL"
			});
			return formatter.format(value);
		},
    removeItem(payload) {
      console.log("remove");
      this.$emit("removeItem", payload);
    },
    updateItem(payload) {
      console.log("updateItem");
      this.$emit("updateItem", payload);
    },
  }
}
</script>