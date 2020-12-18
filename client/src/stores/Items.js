import ItemsController from "@/controllers/Items";

export default {
	namespaced: true,
  state: {
    errors: [],
    items: [],
    itemsController: {},
  },
  mutations: {
    setItems(state, payload) {
      console.log("setItems");
      const { response, type } = payload;
      state.items = response.filter(item => item.type === type);
    }
  },
  actions: {
    async removeItem(context, payload) {
      console.log("removeItem", payload);
      const item = payload;
      const response = await context.state.itemsController.remove(item);
      context.dispatch("responseIsError", response);
      context.commit("setItems", item.type);
    },
    async saveItem(context, payload) {
      console.log("Item - save");
      const item = payload;
      if (item.id) {
        console.log("update");
        const response = await context.state.itemsController.update(item);
        context.dispatch("responseIsError", response);
        context.commit("setItems", item.type);
      } else {
        console.log("create");
        const response = await context.state.itemsController.create(item);
        context.dispatch("responseIsError", response);
        context.commit("setItems", item.type);
      }
    },
    async generateItems(context, payload) {
      console.log("generatItems");
      const type = payload;
      context.state.itemsController = new ItemsController();
      const response = await context.state.itemsController.getAll();
      context.dispatch("responseIsError", response);
      context.commit("setItems", {response, type});
    },
    responseIsError(context, payload) {
      const response = payload;
      if (response.error) context.state.errors.push(response.error);
    }
  }
};
