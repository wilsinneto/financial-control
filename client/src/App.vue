<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <Spends></Spends>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "font-awesome/css/font-awesome.min.css";
import Spends from './components/Spends.vue';

export default {
  name: 'App',
  components: { Spends }
}
</script>

<style>
#app {
  
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
