<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <filtering-by-period></filtering-by-period>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "font-awesome/css/font-awesome.min.css";

import FilteringByPeriod from './components/FilteringByPeriod.vue';

export default {
  name: "App",
  components: { FilteringByPeriod }
}
</script>

<style>
#app {
  
    FilteringByPeriodfont-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
