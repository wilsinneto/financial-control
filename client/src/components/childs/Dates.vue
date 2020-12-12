<template>
  <main id="date">
    <div class="container">
      <div class="form-row text-center">
        <div class="form-group col-md-3 text-left">
          <label for="date">Data início:</label>
          <input type="date" class="form-control" id="date" v-model="item.startDate">
        </div>
        <div class="form-group col-md-3 text-left">
          <label for="date">Até:</label>
          <input type="date" class="form-control" id="date" v-model="item.endDate">
        </div>
        <div class="form-group col-md-1 text-left btnAdd">
          <button type="submit" class="btn btn-primary" v-on:click.prevent="filter(item)">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "Date",
  data() {
    return {
      item: {
        startDate: Date,
        endDate: Date
      },
    }
  },
  methods: {
    filter(item) {
      this.$emit("filter", item);
    }
  }
}
</script>
