import Vue from "vue";
import App from "./App.vue";
// import VueRouter from "vue-router";

// import Home from "./components/Home.vue";
// import Recipes from "./components/Recipes.vue";
// import Capitals from "./components/Capitals.vue";
// import Expenses from "./components/Expenses.vue";
// import Spends from "./components/Spends.vue";
// import FilteringByPeriod from "./components/FilteringByPeriod.vue";

// Vue.use(VueRouter);

// const routes = [
//   { path: '/', component: Home },
//   { path: '/recipes', component: Recipes },
//   { path: '/capitals', component: Capitals },
//   { path: '/expenses', component: Expenses },
//   { path: '/spends', component: Spends },
//   { path: "/period", component: FilteringByPeriod }
// ]

// const router = new VueRouter({ routes, mode: 'history' });

Vue.config.productionTip = false

new Vue({
  // router,
  render: h => h(App),
}).$mount("#app");
