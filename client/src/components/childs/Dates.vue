<template>
  <main id="date">
    <div class="form-row text-center">
      <div class="form-group col-md-3 text-left">
        <label for="date">Data início:</label>
        <input type="date" class="form-control" id="date" v-model="expense.startDate">
      </div>
      <div class="form-group col-md-3 text-left">
        <label for="date">Até:</label>
        <input type="date" class="form-control" id="date" v-model="expense.endDate">
      </div>
      <div class="form-group col-md-2 text-left btnAdd">
        <button type="submit" class="btn btn-primary" v-on:click.prevent="filter(expense)">
          <i class="fa fa-search"></i>
        </button>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "Date",
  data() {
    return {
      expense: {
        startDate: Date,
        endDate: Date
      },
    }
  },
  methods: {
    filter(expense) {
      this.$emit("filter", expense);
    }
  }
}
</script>
