import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";

import Home from "./components/Home.vue";
import Recipes from "./components/RecipeSave.vue";
import Capitals from "./components/Capitals.vue";

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/recipes', component: Recipes },
  { path: '/capitals', component: Capitals }
]

const router = new VueRouter({ routes, mode: 'history' });

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount("#app");
