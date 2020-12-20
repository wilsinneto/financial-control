import ItemsController from "@/controllers/Items";
import ElementsController from "@/controllers/Elements";

export default {
  namespaced: true,
  state: {
    errors: [],
    items: [],
    elements: [],
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
    async generateElements(context, payload) {
			console.log("generateItems");
			const type = payload;
      context.state.elementsController = new ElementsController();
      const response = await context.state.elementsController.getAll();
      context.dispatch("responseIsError", response);
      context.state.elements = response.filter(element => element.items.type === type);
		},
    async removeItem(context, payload) {
      console.log("removeItem");
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
      context.commit("setItems", {response, type});
    },
    responseIsError(context, payload) {
      const response = payload;
      if (response.error) context.state.errors.push(response.error);
    }
  }
};
