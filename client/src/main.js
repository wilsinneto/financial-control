import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import router from "./routes"

import ItemsController from "@/controllers/Items";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    errors: [],
    items: [],
    itemsController: {},
  },
  actions: {
    async removeItem(context, payload) {
      console.log("removeItem", payload);
      const item = payload;
      const response = await context.state.itemsController.remove(item);
      context.dispatch("responseIsError", response);
      context.dispatch("generateItems", item.type);
    },
    async saveItem(context, payload) {
      console.log("Item - save");
      const item = payload;
      if (item.id) {
        console.log("update");
        const response = await context.state.itemsController.update(item);
        context.dispatch("responseIsError", response);
        context.dispatch("generateItems", item.type);
      } else {
        console.log("create");
        const response = await context.state.itemsController.create(item);
        context.dispatch("responseIsError", response);
        context.dispatch("generateItems", item.type);
      }
    },
    async generateItems(context, payload) {
      console.log("generatItems");
      const type = payload;
      context.state.itemsController = new ItemsController();
      const response = await context.state.itemsController.getAll();
      context.dispatch("responseIsError", response);
      context.state.items = response.filter(item => item.type === type);
    },
    responseIsError(context, payload) {
      const response = payload;
      if (response.error) context.state.errors.push(response.error);
    }
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
